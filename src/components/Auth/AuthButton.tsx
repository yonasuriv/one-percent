import React from 'react';
import { LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AuthButton = () => {
  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 mr-2" />
        Sign in with Google
      </button>
      <button
        onClick={handleGithubLogin}
        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        <img src="https://github.com/favicon.ico" alt="GitHub" className="w-4 h-4 mr-2" />
        Sign in with GitHub
      </button>
    </div>
  );
};