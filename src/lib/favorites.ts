import { useSyncExternalStore } from "react";

const KEY = "tramsach.favorites";
const listeners = new Set<() => void>();
let currentIds: string[] = [];
let initialized = false;

function normalize(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function areEqual(a: string[], b: string[]) {
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

function read(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = normalize(JSON.parse(localStorage.getItem(KEY) ?? "[]"));

    if (!initialized || !areEqual(parsed, currentIds)) {
      currentIds = parsed;
      initialized = true;
    }
  } catch {
    if (!initialized) {
      currentIds = [];
      initialized = true;
    }
  }

  return currentIds;
}

function write(ids: string[]) {
  if (initialized && areEqual(ids, currentIds)) return;

  currentIds = ids;
  localStorage.setItem(KEY, JSON.stringify(ids));
  listeners.forEach((l) => l());
}

export function useFavorites() {
  const ids = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => [],
  );

  return {
    ids,
    has: (id: string) => ids.includes(id),
    toggle: (id: string) => {
      const cur = read();
      write(cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
    },
  };
}
