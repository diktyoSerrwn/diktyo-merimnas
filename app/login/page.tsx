'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Σφάλμα σύνδεσης: " + error.message);
    } else {
      // Μετά το επιτυχές login, στέλνουμε τον χρήστη στην αρχική
      router.push('/');
      router.refresh(); // Ανανέωση για να "δει" το session η αρχική
    }
    setLoading(false);
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 bg-white p-10 shadow-2xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-black text-center text-blue-800 uppercase tracking-tight">
        Συνδεση Μελους
      </h1>
      
      <div className="space-y-4">
        <input 
          type="email" placeholder="Email" required
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-500 font-medium"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Κωδικός" required
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-500 font-medium"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button 
        type="submit" disabled={loading}
        className="w-full bg-blue-700 text-white p-4 rounded-xl text-xl font-black hover:bg-blue-800 transition-all shadow-lg uppercase tracking-widest disabled:bg-gray-400"
      >
        {loading ? 'Συνδεση...' : 'Εισοδος'}
      </button>

      <p className="text-center text-gray-600 font-medium">
        Δεν έχετε λογαριασμό; <a href="/signup" className="text-blue-700 font-bold hover:underline">Εγγραφείτε</a>
      </p>
    </form>
  </div>
);
}