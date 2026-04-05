import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        console.warn("Supabase not configured -- notification features disabled");
        // Return a no-op proxy for graceful degradation
        return () => ({
          data: null,
          error: { message: "Supabase not configured" },
        });
      }
      _supabase = createClient(url, key);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (_supabase as any)[prop as string];
  },
});
