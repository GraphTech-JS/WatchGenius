import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lahyeyntjwdxmcnsloda.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhaHlleW50andkeG1jbnNsb2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwODYyNDIsImV4cCI6MjA2NzY2MjI0Mn0.S-HtJRUJbRvcxIKTtpaCPclW_fz0WvyFeczRLeabq3Y';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
