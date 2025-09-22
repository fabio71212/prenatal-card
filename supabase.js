import { createClient } from '@supabase/supabase-js';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

const SUPABASE_URL = "https://wdakywirpeadjxaqvtwm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYWt5d2lycGVhZGp4YXF2dHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjg0NDYsImV4cCI6MjA3MzcwNDQ0Nn0.-YdPwfVn8Ke-RoLeQGDsqAxqFKpJ_mfCwduXA1PTfiI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

