// Local SQLite mode — server-side mock using direct DB access
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import * as db from './local-db';

const JWT_SECRET = 'la-comitiva-local-dev-secret-2024';
const COOKIE_NAME = 'lc_session';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  let currentUser: { id: string; email: string } | null = null;

  if (token) {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
      currentUser = db.getUserById(payload.sub) || null;
    } catch {
      currentUser = null;
    }
  }

  return {
    auth: {
      async getUser() {
        return { data: { user: currentUser }, error: null };
      },
      async getSession() {
        if (currentUser) {
          return { data: { session: { access_token: 'local', user: currentUser } }, error: null };
        }
        return { data: { session: null }, error: null };
      },
    },
    from(table: string) {
      return new ServerQueryBuilder(table);
    },
  };
}

class ServerQueryBuilder {
  private _table: string;
  private _filters: Record<string, unknown> = {};
  private _single = false;

  constructor(table: string) { this._table = table; }

  select(_columns?: string, _opts?: any) { return this; }
  eq(col: string, val: unknown) { this._filters[col] = val; return this; }
  order(_col: string, _opts?: any) { return this; }

  single<T = any>(): Promise<{ data: T | null; error: any }> {
    this._single = true;
    return this._execute() as any;
  }

  then(onfulfilled?: any, onrejected?: any) {
    return this._execute().then(onfulfilled, onrejected);
  }

  private async _execute() {
    if (this._table === 'profiles') {
      if (this._filters.id) {
        const profile = db.getProfileById(this._filters.id as string);
        return { data: profile || null, error: null };
      }
      const all = db.getAllProfiles();
      return { data: all.map(p => ({ ...p, area: (p as any).area_name ? { name: (p as any).area_name } : null })), error: null };
    }

    if (this._table === 'areas') {
      return { data: db.getAllAreas(), error: null };
    }

    if (this._table === 'inventory_items') {
      if (this._filters.id) {
        return { data: db.getInventoryItemById(this._filters.id as string), error: null };
      }
      const result = db.getInventoryItems({});
      return { data: result.data, error: null };
    }

    return { data: null, error: null };
  }
}
