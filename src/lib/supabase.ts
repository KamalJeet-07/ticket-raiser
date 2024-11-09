import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jddrqktxmalsbradrdhr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkZHJxa3R4bWFsc2JyYWRyZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMzQ0ODYsImV4cCI6MjA0NjcxMDQ4Nn0.JP59biECXZN3J552L1cpcUV1fKKf9dfUaXjBBX6HqLI';

export const supabase = createClient(supabaseUrl, supabaseKey);