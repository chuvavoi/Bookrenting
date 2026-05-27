export type StorageDriver = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

const inMemoryStore = new Map<string, string>();

function hasLocalStorage(value: unknown): value is Storage {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Storage).getItem === 'function' &&
    typeof (value as Storage).setItem === 'function' &&
    typeof (value as Storage).removeItem === 'function'
  );
}

const browserStorage = typeof window !== 'undefined' && hasLocalStorage(window.localStorage)
  ? window.localStorage
  : undefined;

const globalStorage = typeof globalThis !== 'undefined' && hasLocalStorage((globalThis as any).localStorage)
  ? (globalThis as any).localStorage
  : undefined;

export const database: StorageDriver = browserStorage ?? globalStorage ?? {
  getItem(key: string) {
    return inMemoryStore.get(key) ?? null;
  },
  setItem(key: string, value: string) {
    inMemoryStore.set(key, value);
  },
  removeItem(key: string) {
    inMemoryStore.delete(key);
  },
};
