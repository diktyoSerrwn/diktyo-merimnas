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
        const { data } = await supabase
          .from('user_networks')
          .select('selected_networks')
          .eq('user_id', user.id)
          .single();

        if (data) setSelectedNetworks(data.selected_networks || []);
      }
      setLoading(false);
    };
    getInitialUser();
  }, []);

  const toggleNetwork = async (network: string) => {
    if (!user) return;
    const updatedNetworks = selectedNetworks.includes(network)
      ? selectedNetworks.filter(n => n !== network)
      : [...selectedNetworks, network];

    setSelectedNetworks(updatedNetworks);
    await supabase.from('user_networks').upsert({ 
      user_id: user.id, 
      selected_networks: updatedNetworks,
      updated_at: new Date()
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Refresh για να δείξει τη φόρμα login
  };

  const isNetwork11Selected = selectedNetworks.includes("Προβληματισμός & Ιδέες");

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black">ΦΟΡΤΩΣΗ...</div>;

  // ΑΝ Ο ΧΡΗΣΤΗΣ ΔΕΝ ΕΙΝΑΙ ΣΥΝΔΕΔΕΜΕΝΟΣ, ΔΕΙΞΕ ΤΗ ΣΕΛΙΔΑ ΜΕ ΜΗΝΥΜΑ ΓΙΑ LOGIN
  if (!user) {
    return (
      <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center p-6 text-white">
        <h1 className="text-4xl font-black mb-8 text-center uppercase tracking-tighter">ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ</h1>
        <div className="bg-white text-gray-900 p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center">
          <p className="text-lg font-bold mb-6 italic text-gray-500">Πρέπει να συνδεθείτε για να δείτε το περιεχόμενο της πύλης.</p>
          <div className="flex flex-col gap-4">
            <Link href="/login" className="bg-blue-600 text-white py-4 rounded-2xl font-black uppercase hover:bg-blue-700 transition">Εισοδος Μελους</Link>
            <Link href="/signup" className="border-2 border-gray-100 py-4 rounded-2xl font-black uppercase hover:bg-gray-50 transition">Δημιουργια Λογαριασμου</Link>
          </div>
        </div>
      </div>
    );
  }

  // ΑΝ ΕΙΝΑΙ ΣΥΝΔΕΔΕΜΕΝΟΣ, ΔΕΙΞΕ ΤΗΝ ΚΑΝΟΝΙΚΗ ΣΕΛΙΔΑ
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-blue-900 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter uppercase">ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ</div>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold text-sm uppercase transition">Αποσυνδεση</button>
        </div>
      </nav>

      <main className="flex-grow max-w-6xl mx-auto p-6 py-12 w-full">
        <h1 className="text-center text-4xl md:text-6xl font-black text-gray-900 mb-12 leading-tight uppercase">Η ψηφιακη πυλη</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categoryLinks.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.id}`} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:scale-[1.03] transition-all flex flex-col items-center justify-center text-center min-h-[200px]">
              <span className="text-4xl mb-4">{cat.emoji}</span>
              <span className="text-gray-900 font-black text-sm uppercase tracking-tight">{cat.title}</span>
            </Link>
          ))}
        </div>

        <section className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-20">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-10 md:p-14 bg-gray-50/30 border-r border-gray-100">
              <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">ΕΝΤΑΞΗ ΣΕ ΔΙΚΤΥΑ</h3>
              <div className="grid grid-cols-1 gap-3">
                {networks.map((net) => (
                  <label key={net} className="flex items-center group cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-transparent hover:border-blue-200 transition-all">
                    <input type="checkbox" checked={selectedNetworks.includes(net)} onChange={() => toggleNetwork(net)} className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                    <span className={`ml-4 font-bold transition-colors ${selectedNetworks.includes(net) ? 'text-blue-600' : 'text-gray-600'}`}>{net}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={`w-full md:w-1/2 p-10 md:p-14 relative transition-all duration-700 ${!isNetwork11Selected ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
              {!isNetwork11Selected && (
                <div className="absolute inset-0 z-10 flex items-center justify-center p-10 text-center backdrop-blur-[1px]">
                  <div className="bg-blue-900 text-white p-8 rounded-[2.5rem] shadow-2xl uppercase font-black tracking-tight">
                    ⚠️ ΑΠΑΙΤΕΙΤΑΙ ΕΝΤΑΞΗ ΣΤΟ 11ο ΔΙΚΤΥΟ
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">ΜΗΝΥΜΑ ΠΡΟΣ ΔΙΑΧΕΙΡΙΣΤΗ</h3>
              <form action="https://formspree.io/f/mgodrbbj" method="POST" className="space-y-6">
                <input type="hidden" name="User_Email" value={user?.email || ''} />
                <input name="username" required type="text" placeholder="Δημόσιο Ψευδώνυμο" className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none font-bold" />
                <textarea name="message" required rows={6} placeholder="Το μήνυμά σας..." className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-50 outline-none resize-none font-medium"></textarea>
                <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:shadow-2xl transition-all active:scale-95 uppercase">ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}