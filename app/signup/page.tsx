'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { DEPARTMENTS } from '../constants/department';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Εγγραφή στο Auth του Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert(authError.message);
      setLoading(false);
      return;
    }

    // 2. Αποθήκευση επιπλέον στοιχείων στον πίνακα profiles
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            full_name: fullName,
            department: department,
          },
        ]);

      if (profileError) {
        alert("Σφάλμα προφίλ: " + profileError.message);
      } else {
        alert("Η εγγραφή ολοκληρώθηκε!");
      }
    }
    setLoading(false);
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <form onSubmit={handleSignup} className="w-full max-w-md space-y-6 bg-white p-10 shadow-2xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-black text-center text-blue-800 uppercase tracking-tight">
        Εγγραφη στο Δικτυο
      </h1>
      
      <div className="space-y-4">
        <input 
          type="text" placeholder="Ονοματεπώνυμο" required
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-500 font-medium"
          onChange={(e) => setFullName(e.target.value)}
        />
        
        <select 
  className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-600 focus:outline-none text-gray-900 font-medium bg-white"
  onChange={(e) => setDepartment(e.target.value)}
  required
>
  <option value="">Επιλέξτε Τμήμα</option>
  {DEPARTMENTS.map(dept => (
    <option key={dept} value={dept}>{dept}</option>
  ))}
</select>

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
        {loading ? 'Δημιουργια...' : 'Εγγραφη'}
      </button>
    </form>
  </div>
);
}