// Local SQLite mode — use mock Supabase client
import { createMockClient } from './mock-supabase';

export function createClient() {
  return createMockClient() as any;
}
