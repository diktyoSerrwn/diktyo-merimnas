'use client';

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Η ενημερωμένη λίστα με τα ονόματα
const categories = [
  { id: 'beltiosi-zois', title: 'Δίκτυο βελτίωσης φοιτητικής ζωής', icon: '🌱' },
  { id: 'epaggelmatika-erevnitika', title: 'ΔΙΚΤΥΟ ΕΠΑΓΓΕΛΜΑΤΙΚΩΝ ΚΑΙ ΕΡΕΥΝΗΤΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ', icon: '🔬' },
  { id: 'geniki-morfosi', title: 'ΔΙΚΤΥΟ ΓΕΝΙΚΗΣ ΜΟΡΦΩΣΗΣ', icon: '📖' },
  { id: 'ethelontismos-prosfora', title: 'ΔΙΚΤΥΟ ΕΘΕΛΟΝΤΙΣΜΟΥ ΚΑΙ ΚΟΙΝΩΝΙΚΗΣ ΠΡΟΣΦΟΡΑΣ', icon: '🤝' },
  { id: 'politismos-dimiourgia', title: 'Δίκτυο Πολιτισμού και Δημιουργικών Δραστηριοτήτων', icon: '🎨' },
  { id: 'agrotiki-drasi', title: 'ΔΙΚΤΥΟ ΑΓΡΟΤΙΚΗΣ ΚΑΙ ΠΡΩΤΟΓΕΝΟΥΣ ΕΘΕΛΟΝΤΙΚΗΣ ΔΡΑΣΗΣ', icon: '🚜' },
  { id: 'praktikes-dexiotites', title: 'ΔΙΚΤΥΟ ΠΡΑΚΤΙΚΩΝ ΔΕΞΙΟΤΗΤΩΝ ΚΑΙ ΤΕΧΝΩΝ ΖΩΗΣ', icon: '🛠️' },
  // Τα νέα 5 δίκτυα
  { id: 'enimerosi-pr', title: 'ΔΙΚΤΥΟ ΕΝΗΜΕΡΩΣΗΣ ΚΑΙ ΔΗΜΟΣΙΩΝ ΣΧΕΣΕΩΝ', icon: '📢' },
  { id: 'ellines-exoterikou', title: 'Δίκτυο Ελλήνων Φοιτητών Εξωτερικού & Αποδήμων', icon: '🌍' },
  { id: 'ekdromes-viomatika', title: 'ΔΙΚΤΥΟ ΕΚΔΡΟΜΩΝ ΚΑΙ ΒΙΩΜΑΤΙΚΩΝ ΔΡΑΣΕΩΝ', icon: '🎒' },
  { id: 'provlimatismos-idees', title: 'ΔΙΚΤΥΟ ΠΡΟΒΛΗΜΑΤΙΣΜΟΥ ΚΑΙ ΑΝΤΑΛΛΑΓΗΣ ΙΔΕΩΝ', icon: '💡' },
  { id: 'eirini-anthropismos', title: 'ΔΙΚΤΥΟ ΕΙΡΗΝΗΣ ΚΑΙ ΑΝΘΡΩΠΙΣΜΟΥ', icon: '🕊️' },
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white italic text-blue-600 font-bold">
        Φόρτωση...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Centered */}
      <nav className="bg-blue-800 text-white shadow-lg p-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter text-center uppercase">
            ΔΙΚΤΥΟ ΦΟΙΤΗΤΙΚΗΣ ΜΕΡΙΜΝΑΣ
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-6 py-1.5 rounded-full text-sm font-bold transition shadow-md"
              >
                Αποσύνδεση
              </button>
            ) : (
              <Link href="/login" className="bg-white text-blue-800 px-6 py-1.5 rounded-full text-sm font-bold hover:bg-blue-50 transition shadow-md">
                Είσοδος Μέλους
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto p-6 py-12 w-full flex items-center justify-center">
        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/categories/${cat.id}`}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4 hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 group min-h-[220px]"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-bold text-gray-700 group-hover:text-blue-700 text-center uppercase text-xs leading-relaxed tracking-wide px-2">
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          /* Guest Hero - Centered (Αφαιρέθηκε η περιγραφή) */
          <div className="text-center py-20 space-y-12">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Η ψηφιακή πύλη για το <br />
              <span className="text-blue-700 uppercase">ΔΙΚΤΥΟ ΦΟΙΤΗΤΙΚΗΣ ΜΕΡΙΜΝΑΣ</span>
            </h1>
            
            <div className="flex justify-center pt-4">
              <Link href="/signup" className="bg-blue-700 text-white px-12 py-5 rounded-full font-black text-xl hover:shadow-2xl hover:bg-blue-800 transition transform hover:scale-105 uppercase tracking-wider">
                Δημιουργία Λογαριασμού
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 border-t border-gray-200 text-center text-gray-400 text-xs font-bold tracking-widest uppercase">
        &copy; 2026 ΔΙΚΤΥΟ ΦΟΙΤΗΤΙΚΗΣ ΜΕΡΙΜΝΑΣ
      </footer>
    </div>
  );
}