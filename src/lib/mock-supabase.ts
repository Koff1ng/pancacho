/**
 * Mock Supabase client for local SQLite testing.
 * Provides the same API surface as the real Supabase client so pages don't need to change.
 * Uses singleton pattern + auth caching for performance.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type Filters = Record<string, any>;

class MockQueryBuilder {
  private _table: string;
  private _operation: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private _select: string = '*';
  private _filters: Filters = {};
  private _data: any = null;
  private _sortField?: string;
  private _sortDir?: string;
  private _offset?: number;
  private _limit?: number;
  private _single = false;
  private _count = false;
  private _refTable?: string;

  constructor(table: string) {
    this._table = table;
  }

  select(columns?: string, opts?: { count?: string }) {
    if (this._operation !== 'insert' && this._operation !== 'update') {
      this._operation = 'select';
    }
    if (columns) this._select = columns;
    if (opts?.count) this._count = true;
    return this;
  }

  insert(data: any) { this._operation = 'insert'; this._data = data; return this; }
  update(data: any) { this._operation = 'update'; this._data = data; return this; }
  delete() { this._operation = 'delete'; return this; }

  eq(column: string, value: any) {
    const col = column.includes('.') ? column : column;
    this._filters[col] = value;
    return this;
  }

  ilike(column: string, value: string) {
    this._filters.search = value.replace(/%/g, '');
    return this;
  }

  lte(column: string, _value: number) {
    if (column === 'quantity') this._filters.lowStock = true;
    return this;
  }

  gte(_column: string, value: string) { this._filters.dateFrom = value; return this; }
  lt(_column: string, value: string) { this._filters.dateTo = value; return this; }

  order(column: string, opts?: { ascending?: boolean; referencedTable?: string }) {
    this._sortField = column;
    this._sortDir = opts?.ascending === false ? 'desc' : 'asc';
    return this;
  }

  range(from: number, to: number) { this._offset = from; this._limit = to - from + 1; return this; }
  limit(n: number) { this._limit = n; return this; }

  single<T = any>(): Promise<{ data: T | null; error: any }> {
    this._single = true;
    return this._execute();
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this._execute().then(onfulfilled, onrejected);
  }

  private async _execute(): Promise<any> {
    try {
      const res = await fetch('/api/local-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: this._table,
          operation: this._operation,
          select: this._select,
          filters: this._filters,
          data: this._data,
          sortField: this._sortField,
          sortDir: this._sortDir,
          offset: this._offset,
          limit: this._limit,
          single: this._single,
          count: this._count,
        }),
      });
      const result = await res.json();
      return { data: result.data, count: result.count ?? null, error: result.error || null };
    } catch (err: any) {
      return { data: null, count: null, error: { message: err.message } };
    }
  }
}

class MockAuth {
  // Cache the user so getUser() doesn't make a network call every render
  private _cachedUser: any = undefined; // undefined = not fetched yet
  private _fetchPromise: Promise<any> | null = null;

  async signInWithPassword({ email, password }: { email: string; password: string }) {
    try {
      const res = await fetch('/api/local-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { data: { user: null, session: null }, error: { message: data.error } };
      this._cachedUser = data.user; // cache on login
      return { data: { user: data.user, session: { access_token: 'local-token', user: data.user } }, error: null };
    } catch (err: any) {
      return { data: { user: null, session: null }, error: { message: err.message } };
    }
  }

  async signOut() {
    this._cachedUser = null; // clear cache
    this._fetchPromise = null;
    await fetch('/api/local-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    return { error: null };
  }

  async getUser() {
    // Return cached user immediately if available
    if (this._cachedUser !== undefined) {
      return { data: { user: this._cachedUser }, error: null };
    }
    // Deduplicate in-flight requests
    if (!this._fetchPromise) {
      this._fetchPromise = fetch('/api/local-auth')
        .then(r => r.json())
        .then(data => {
          this._cachedUser = data.user || null;
          this._fetchPromise = null;
          return this._cachedUser;
        })
        .catch(() => {
          this._cachedUser = null;
          this._fetchPromise = null;
          return null;
        });
    }
    const user = await this._fetchPromise;
    return { data: { user }, error: null };
  }

  async getSession() {
    const { data: { user } } = await this.getUser();
    if (user) return { data: { session: { access_token: 'local-token', user } }, error: null };
    return { data: { session: null }, error: null };
  }

  async resetPasswordForEmail(_email: string, _opts?: any) {
    return { data: {}, error: null };
  }

  async updateUser({ password }: { password: string }) {
    try {
      const res = await fetch('/api/local-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updatePassword', password }),
      });
      const data = await res.json();
      if (!res.ok) return { data: { user: null }, error: { message: data.error } };
      return { data: { user: {} }, error: null };
    } catch (err: any) {
      return { data: { user: null }, error: { message: err.message } };
    }
  }
}

class MockRealtimeChannel {
  on(_event: string, _filter: any, _callback: any) { return this; }
  subscribe() { return this; }
}

export class MockSupabaseClient {
  auth = new MockAuth();
  from(table: string): MockQueryBuilder { return new MockQueryBuilder(table); }
  channel(_name: string): MockRealtimeChannel { return new MockRealtimeChannel(); }
  removeChannel(_channel: any) { /* no-op */ }
}

// Singleton — never create more than one instance
let _instance: MockSupabaseClient | null = null;

export function createMockClient() {
  if (!_instance) _instance = new MockSupabaseClient();
  return _instance;
}
