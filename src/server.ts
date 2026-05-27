import { createServer } from "http";
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

async function handleRequest(request: Request): Promise<Response> {
  try {
    const handler = await getServerEntry();
    const response = await handler.fetch(request, process.env, {});
    return await normalizeCatastrophicSsrResponse(response);
  } catch (error) {
    console.error(error);
    return brandedErrorResponse();
  }
}

// Cloudflare Workers export
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    return handleRequest(request);
  },
};

// Node.js server export (for Vercel and other Node.js platforms)
if (typeof process !== "undefined" && process.env.NODE_ENV) {
  const port = parseInt(process.env.PORT || "3000", 10);
  
  createServer(async (req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      body: ["GET", "HEAD"].includes(req.method || "GET") ? undefined : req,
    });

    try {
      const response = await handleRequest(request);
      res.statusCode = response.status;
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      const buffer = await response.arrayBuffer();
      res.end(Buffer.from(buffer));
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end(renderErrorPage());
    }
  }).listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
