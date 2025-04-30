import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://lwuyfctjegtncjmmnrbu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXlmY3RqZWd0bmNqbW1ucmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNTU4MTQsImV4cCI6MjA2MDYzMTgxNH0.n8JwKTXZ_Oi_3YB-5fPzzD4nAFvv97SzxuFVid3iJg4";

const supabase = createClient(SUPABASE_URL, supabaseKey);

export default supabase;
