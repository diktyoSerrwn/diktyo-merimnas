'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from './lib/supabase';

const networks = [
  "Βελτίωση Φοιτητικής Ζωής", "Επαγγελματικές Δράσεις", "Γενική Μόρφωση",
  "Εθελοντισμός & Προσφορά", "Πολιτισμός & Τέχνη", "Αγροτική Δράση",
  "Πρακτικές Δεξιότητες", "Ενημέρωση & PR", "Έλληνες Εξωτερικού",
  "Εκδρομές & Βιωματικά", "Προβληματισμός & Ιδέες", "Ειρήνη & Ανθρωπισμός"
];

const categoryLinks = [
  { id: 'beltiosi-zois', title: 'ΔΙΚΤΥΟ ΒΕΛΤΙΩΣΗΣ ΤΗΣ ΦΟΙΤΗΤΙΚΗΣ ΖΩΗΣ', emoji: '🏠' },
  { id: 'epaggelmatika-erevnitika', title: 'ΔΙΚΤΥΟ ΕΠΑΓΓΕΛΜΑΤΙΚΩΝ ΚΑΙ ΕΡΕΥΝΗΤΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ', emoji: '🔬' },
  { id: 'geniki-morfosi', title: 'ΔΙΚΤΥΟ ΓΕΝΙΚΗΣ ΜΟΡΦΩΣΗΣ', emoji: '📚' },
  { id: 'ethelontismos-prosfora', title: 'ΔΙΚΤΥΟ ΕΘΕΛΟΝΤΙΣΜΟΥ ΚΑΙ ΚΟΙΝΩΝΙΚΗΣ ΠΡΟΣΦΟΡΑΣ', emoji: '🤝' },
  { id: 'politismos-dimiourgia', title: 'ΔΙΚΤΥΟ ΠΟΛΙΤΙΣΜΟΥ ΚΑΙ ΔΗΜΙΟΥΡΓΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ', emoji: '🎨' },
  { id: 'agrotiki-drasi', title: 'ΔΙΚΤΥΟ ΑΓΡΟΤΙΚΗΣ ΚΑΙ ΠΡΩΤΟΓΕΝΟΥΣ ΕΘΕΛΟΝΤΙΚΗΣ ΔΡΑΣΗΣ', emoji: '🌿' },
  { id: 'praktikes-dexiotites', title: 'ΔΙΚΤΥΟ ΠΡΑΚΤΙΚΩΝ ΔΕΞΙΟΤΗΤΩΝ ΚΑΙ ΤΕΧΝΩΝ ΖΩΗΣ', emoji: '🛠️' },
  { id: 'enimerosi-pr', title: 'ΔΙΚΤΥΟ ΕΝΗΜΕΡΩΣΗΣ ΚΑΙ ΔΗΜΟΣΙΩΝ ΣΧΕΣΕΩΝ', emoji: '📢' },
  { id: 'ellines-exoterikou', title: 'ΔΙΚΤΥΟ ΕΛΛΗΝΩΝ ΦΟΙΤΗΤΩΝ ΕΞΩΤΕΡΙΚΟΥ ΚΑΙ ΑΠΟΔΗΜΩΝ', emoji: '🌍' },
  { id: 'ekdromes-viomatika', title: 'ΔΙΚΤΥΟ ΕΚΔΡΟΜΩΝ ΚΑΙ ΒΙΩΜΑΤΙΚΩΝ ΔΡΑΣΕΩΝ', emoji: '🎒' },
  { id: 'provlimatismos-idees', title: 'ΔΙΚΤΥΟ ΠΡΟΒΛΗΜΑΤΙΣΜΟΥ ΚΑΙ ΑΝΤΑΛΛΑΓΗΣ ΙΔΕΩΝ', emoji: '💡' },
  { id: 'eirini-anthropismos', title: 'ΔΙΚΤΥΟ ΕΙΡΗΝΗΣ ΚΑΙ ΑΝΘΡΩΠΙΣΜΟΥ', emoji: '🕊️' },
];

export default function HomePage() {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('user_networks').select('selected_networks').eq('user_id', user.id).single();
        if (data) setSelectedNetworks(data.selected_networks || []);
      }
      setLoading(false);
    };
    getInitialUser();
  }, []);

  const toggleNetwork = async (network: string) => {
    if (!user) return;
    const updatedNetworks = selectedNetworks.includes(network) ? selectedNetworks.filter(n => n !== network) : [...selectedNetworks, network];
    setSelectedNetworks(updatedNetworks);
    await supabase.from('user_networks').upsert({ user_id: user.id, selected_networks: updatedNetworks, updated_at: new Date() });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black uppercase text-teal-600">Φορτωση...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* HEADER / HERO SECTION - ΤΙΡΚΟΥΑΖ */}
      <header className="bg-teal-400 text-white pt-16 pb-32 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter shadow-sm">
            ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ
          </h1>

          <div className="mb-6">
            <p className="text-xl md:text-2xl font-medium italic text-teal-50 opacity-95 tracking-wide font-serif">
              "Ένα πανεπιστήμιο ανοιχτό στην κοινωνία"
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto mt-2 rounded-full"></div>
          </div>
          
          {user ? (
            <div className="mt-8 flex flex-col items-center">
              <p className="text-teal-50 font-bold mb-4 text-xl">
                 Φίλε του Δικτύου, καλώς ήρθες
              </p>
              <button onClick={handleLogout} className="bg-white text-teal-500 px-8 py-3 rounded-full font-black uppercase text-sm hover:bg-teal-50 transition shadow-lg">Αποσυνδεση</button>
            </div>
          ) : (
            <div className="mt-12">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none">Η ψηφιακή πύλη για το <br/> ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ</h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <Link href="/login" className="bg-teal-600 text-white px-10 py-4 rounded-full font-black uppercase text-lg hover:bg-teal-700 transition shadow-2xl border-2 border-transparent">Εισοδος Μελλους</Link>
                <Link href="/signup" className="bg-white text-teal-600 px-10 py-4 rounded-full font-black uppercase text-lg hover:bg-gray-100 transition shadow-2xl">Δημιουργια Λογαριασμου</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {user && (
  <main className="max-w-6xl mx-auto p-6 py-12 w-full -mt-20 relative z-20">
    
    {/* ΤΑ 12 ΚΟΥΜΠΙΑ ΔΙΚΤΥΩΝ - ΤΩΡΑ ΜΕ ΤΙΡΚΟΥΑΖ ΣΤΟΙΧΕΙΑ */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {categoryLinks.map((cat) => (
        <Link 
          key={cat.id} 
          href={`/categories/${cat.id}`} 
          className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-teal-400 hover:shadow-teal-100 hover:scale-[1.03] transition-all flex flex-col items-center justify-center text-center min-h-[220px] group"
        >
          <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.emoji}</span>
          <span className="text-gray-900 font-black text-sm uppercase tracking-tight group-hover:text-teal-600 transition-colors">
            {cat.title}
          </span>
        </Link>
      ))}
    </div>

    {/* SECTION: ΕΝΤΑΞΗ & ΕΠΙΚΟΙΝΩΝΙΑ */}
    <section className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-20">
      <div className="flex flex-col md:flex-row">
        
        {/* ΑΡΙΣΤΕΡΑ: CHECKBOXES - ΔΙΟΡΘΩΜΕΝΑ ΧΡΩΜΑΤΑ */}
        <div className="w-full md:w-1/2 p-10 md:p-14 bg-teal-50/30 border-r border-gray-100">
          <h3 className="text-2xl font-black text-teal-900 mb-8 uppercase tracking-tight">ΕΝΤΑΞΗ ΣΕ ΔΙΚΤΥΑ</h3>
          <div className="grid grid-cols-1 gap-3">
            {networks.map((net) => (
              <label key={net} className="flex items-center group cursor-pointer bg-white p-4 rounded-2xl shadow-sm border-2 border-transparent hover:border-teal-300 transition-all">
                <input 
                  type="checkbox" 
                  checked={selectedNetworks.includes(net)} 
                  onChange={() => toggleNetwork(net)} 
                  className="w-6 h-6 rounded-lg border-gray-300 text-teal-500 focus:ring-teal-500 accent-teal-500 cursor-pointer" 
                />
                <span className={`ml-4 font-bold transition-colors ${selectedNetworks.includes(net) ? 'text-teal-600' : 'text-gray-600'}`}>
                  {net}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* ΔΕΞΙΑ: ΦΟΡΜΑ */}
        <div className={`w-full md:w-1/2 p-10 md:p-14 relative transition-all duration-700 ${!selectedNetworks.includes("Προβληματισμός & Ιδέες") ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
          {!selectedNetworks.includes("Προβληματισμός & Ιδέες") && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-10 text-center backdrop-blur-[1px]">
              <div className="bg-teal-600 text-white p-8 rounded-[2.5rem] shadow-2xl uppercase font-black">
                ⚠️ ΑΠΑΙΤΕΙΤΑΙ ΕΝΤΑΞΗ ΣΤΟ 11ο ΔΙΚΤΥΟ
              </div>
            </div>
          )}
          <h3 className="text-2xl font-black text-teal-900 mb-8 uppercase tracking-tight">ΜΗΝΥΜΑ ΠΡΟΣ ΔΙΑΧΕΙΡΙΣΤΗ</h3>
          <form action="https://formspree.io/f/mgodrbbj" method="POST" className="space-y-6">
            <input type="hidden" name="User_Email" value={user?.email || ''} />
            <input 
              name="username" 
              required 
              type="text" 
              placeholder="Δημόσιο Ψευδώνυμο" 
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none font-bold" 
            />
            <textarea 
              name="message" 
              required 
              rows={6} 
              placeholder="Το μήνυμά σας..." 
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-teal-100 outline-none resize-none font-medium"
            ></textarea>
            <button 
              type="submit" 
              className="w-full py-5 bg-teal-500 text-white font-black rounded-2xl hover:bg-teal-600 hover:shadow-2xl transition-all active:scale-95 uppercase tracking-widest text-lg shadow-teal-200 shadow-lg"
            >
              ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
)}
    </div>
  );
}