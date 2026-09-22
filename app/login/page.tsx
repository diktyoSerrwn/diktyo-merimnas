'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black text-blue-900 mb-6 uppercase tracking-tight text-center">ΕΙΣΟΔΟΣ ΜΕΛΛΟΥΣ</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2">Email</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold"
              placeholder="name@university.gr"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-gray-500 mb-2">Κωδικός</label>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition shadow-lg uppercase tracking-wider"
          >
            {loading ? 'ΣΥΝΔΕΣΗ...' : 'ΣΥΝΔΕΣΗ'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Δεν έχεις λογαριασμό; <Link href="/signup" className="text-blue-900 font-black hover:underline">Εγγραφή</Link>
          </p>
          <p className="mt-4">
            <Link href="/" className="text-xs text-gray-400 font-bold hover:text-gray-600 uppercase">← Επιστροφή στην αρχική</Link>
          </p>
        </div>
      </div>
    </div>
  );
}