import { supabase } from '../lib/supabaseClient';

const handleLogin = async (email, password) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) console.error(error);
    else console.log('User logged in:', user);
};
