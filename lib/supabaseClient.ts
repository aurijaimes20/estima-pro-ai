import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://mfpvgicffuiqunhwjdfh.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mcHZnaWNmZnVpcXVuaHdqZGZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0NDczNTMsImV4cCI6MjA1NjAyMzM1M30.N6MualWRYWZ_kcyMFqKeKvyflBVjQBTujc95bXl25Ik"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)