// TypeScript declarations for the CookieStore API
// https://developer.mozilla.org/en-US/docs/Web/API/CookieStore

interface CookieStoreDeleteOptions {
  name: string;
  domain?: string;
  path?: string;
}

interface CookieStoreGetOptions {
  name?: string;
  url?: string;
}

interface CookieStoreSetOptions {
  name: string;
  value: string;
  expires?: number | Date;
  domain?: string;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
  partitioned?: boolean;
}

interface CookieStore extends EventTarget {
  delete(name: string): Promise<void>;
  delete(options: CookieStoreDeleteOptions): Promise<void>;
  
  get(name: string): Promise<CookieStoreValue | null>;
  get(options?: CookieStoreGetOptions): Promise<CookieStoreValue | null>;
  
  getAll(name?: string): Promise<CookieStoreValue[]>;
  getAll(options?: CookieStoreGetOptions): Promise<CookieStoreValue[]>;
  
  set(name: string, value: string): Promise<void>;
  set(options: CookieStoreSetOptions): Promise<void>;
}

interface CookieStoreValue {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  partitioned?: boolean;
}

declare global {
  interface Window {
    cookieStore: CookieStore;
  }
  
  const cookieStore: CookieStore;
} 