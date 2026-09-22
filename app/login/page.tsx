'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-black text-blue-950 mb-6 text-center uppercase">Σύνδεση</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm font-bold">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900" 
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Κωδικός</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all uppercase tracking-widest shadow-lg shadow-blue-200 mt-4"
          >
            Εισοδος
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600 font-medium">
          Δεν έχεις λογαριασμό;{' '}
          <Link href="/signup" className="text-blue-900 font-bold hover:underline">
            Εγγραφή
          </Link>
        </p>
      </div>
    </div>
  );
}