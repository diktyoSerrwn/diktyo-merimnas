'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

const departmentsList = [
  "Μηχανικών Πληροφορικής",
  "Μηχανικών Τοπογραφίας",
  "Μηχανολόγων Μηχανικών",
  "Πολιτικών Μηχανικών",
  "Οικονομικών Επιστημών",
  "Διοίκησης Επιχειρήσεων",
  "Εσωτερικής Αρχιτεκτονικής"
];

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          department: department,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Επιτυχής εγγραφή! Μπορείτε τώρα να συνδεθείτε.');
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-black text-blue-950 mb-6 text-center uppercase">Δημιουργία Λογαριασμού</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm font-bold">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Όνομα</label>
            <input 
              type="text" 
              required 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900" 
              placeholder="π.χ. Κώστας"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Επώνυμο</label>
            <input 
              type="text" 
              required 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900" 
              placeholder="π.χ. Παπαδόπουλος"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Τμήμα Σχολής</label>
            <select 
              required 
              value={department} 
              onChange={(e) => setDepartment(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900"
            >
              <option value="" disabled>-- Επιλέξτε Τμήμα --</option>
              {departmentsList.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

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
              onChange="#{setPassword(e.target.value)}" 
              // εδώ βεβαιώσου ότι έχεις το κλασικό onChange:
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900" 
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all uppercase tracking-widest shadow-lg shadow-blue-200 mt-4"
          >
            Εγγραφη
          </button>
        </form>
      </div>
    </div>
  );
}