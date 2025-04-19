// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL Supabase kamu
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // API key Supabase
);
