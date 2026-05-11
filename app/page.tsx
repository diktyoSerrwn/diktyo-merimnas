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
  { id: 'beltiosi-zois', title: 'ΔΙΚΤΥΟ ΒΕΛΤΙΩΣΗΣ ΤΗΣ ΦΟΙΤΗΤΙΚΗΣ ΖΩΗΣ' },
  { id: 'epaggelmatika-erevnitika', title: 'ΔΙΚΤΥΟ ΕΠΑΓΓΕΛΜΑΤΙΚΩΝ ΚΑΙ ΕΡΕΥΝΗΤΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ' },
  { id: 'geniki-morfosi', title: 'ΔΙΚΤΥΟ ΓΕΝΙΚΗΣ ΜΟΡΦΩΣΗΣ' },
  { id: 'ethelontismos-prosfora', title: 'ΔΙΚΤΥΟ ΕΘΕΛΟΝΤΙΣΜΟΥ ΚΑΙ ΚΟΙΝΩΝΙΚΗΣ ΠΡΟΣΦΟΡΑΣ' },
  { id: 'politismos-dimiourgia', title: 'ΔΙΚΤΥΟ ΠΟΛΙΤΙΣΜΟΥ ΚΑΙ ΔΗΜΙΟΥΡΓΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ' },
  { id: 'agrotiki-drasi', title: 'ΔΙΚΤΥΟ ΑΓΡΟΤΙΚΗΣ ΚΑΙ ΠΡΩΤΟΓΕΝΟΥΣ ΕΘΕΛΟΝΤΙΚΗΣ ΔΡΑΣΗΣ' },
  { id: 'praktikes-dexiotites', title: 'ΔΙΚΤΥΟ ΠΡΑΚΤΙΚΩΝ ΔΕΞΙΟΤΗΤΩΝ ΚΑΙ ΤΕΧΝΩΝ ΖΩΗΣ' },
  { id: 'enimerosi-pr', title: 'ΔΙΚΤΥΟ ΕΝΗΜΕΡΩΣΗΣ ΚΑΙ ΔΗΜΟΣΙΩΝ ΣΧΕΣΕΩΝ' },
  { id: 'ellines-exoterikou', title: 'ΔΙΚΤΥΟ ΕΛΛΗΝΩΝ ΦΟΙΤΗΤΩΝ ΕΞΩΤΕΡΙΚΟΥ ΚΑΙ ΑΠΟΔΗΜΩΝ' },
  { id: 'ekdromes-viomatika', title: 'ΔΙΚΤΥΟ ΕΚΔΡΟΜΩΝ ΚΑΙ ΒΙΩΜΑΤΙΚΩΝ ΔΡΑΣΕΩΝ' },
  { id: 'provlimatismos-idees', title: 'ΔΙΚΤΥΟ ΠΡΟΒΛΗΜΑΤΙΣΜΟΥ ΚΑΙ ΑΝΤΑΛΛΑΓΗΣ ΙΔΕΩΝ' },
  { id: 'eirini-anthropismos', title: 'ΔΙΚΤΥΟ ΕΙΡΗΝΗΣ ΚΑΙ ΑΝΘΡΩΠΙΣΜΟΥ' },
];

export default function HomePage() {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  // 1. Φόρτωση χρήστη και των επιλογών του από το Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from('user_networks')
          .select('selected_networks')
          .eq('user_id', user.id)
          .single();

        if (data) {
          setSelectedNetworks(data.selected_networks || []);
        }
      }
    };
    fetchUserData();
  }, []);

  // 2. Λειτουργία για το Check/Uncheck και αυτόματο σώσιμο στη βάση
  const toggleNetwork = async (network: string) => {
    if (!user) {
      alert("Πρέπει να είστε συνδεδεμένοι για να επιλέξετε δίκτυα.");
      return;
    }

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

  const isNetwork11Selected = selectedNetworks.includes("Προβληματισμός & Ιδέες");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* NAVIGATION */}
      <nav className="bg-blue-900 text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter uppercase">ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ</div>
          <div className="flex gap-4">
            <Link href="/auth/signup" className="bg-white text-blue-900 px-4 py-2 rounded-xl font-bold text-sm uppercase">Δημιουργια Λογαριασμου</Link>
            <Link href="/auth/login" className="bg-blue-800 text-white px-4 py-2 rounded-xl font-bold text-sm uppercase">Εισοδος Μελλους</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-6xl mx-auto p-6 py-12 w-full">
        {/* ΤΑ 12 ΚΟΥΜΠΙΑ ΔΙΚΤΥΩΝ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {categoryLinks.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/categories/${cat.id}`}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center text-center min-h-[160px]"
            >
              <span className="text-gray-900 font-black text-sm leading-tight uppercase">{cat.title}</span>
            </Link>
          ))}
        </div>

        {/* SECTION: ΕΝΤΑΞΗ & ΕΠΙΚΟΙΝΩΝΙΑ */}
        <section className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            
            {/* ΑΡΙΣΤΕΡΑ: CHECKBOXES */}
            <div className="w-full md:w-1/2 p-10 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
              <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">ΕΝΤΑΞΗ ΣΕ ΔΙΚΤΥΑ</h3>
              <div className="grid grid-cols-1 gap-4">
                {networks.map((net) => (
                  <label key={net} className="flex items-center group cursor-pointer bg-white p-3 rounded-2xl border border-transparent hover:border-blue-100 transition-all shadow-sm">
                    <input 
                      type="checkbox" 
                      checked={selectedNetworks.includes(net)}
                      onChange={() => toggleNetwork(net)}
                      className="w-6 h-6 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 transition" 
                    />
                    <span className={`ml-4 font-bold transition-colors ${selectedNetworks.includes(net) ? 'text-blue-600' : 'text-gray-600'}`}>
                      {net}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* ΔΕΞΙΑ: ΦΟΡΜΑ */}
            <div className={`w-full md:w-1/2 p-10 relative transition-all duration-700 ${!isNetwork11Selected ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
              
              {!isNetwork11Selected && (
                <div className="absolute inset-0 z-10 flex items-center justify-center p-10 text-center">
                  <div className="bg-blue-900 text-white p-8 rounded-[2rem] shadow-2xl transform -rotate-2">
                    <p className="font-black text-lg uppercase tracking-wider">
                      ⚠️ ΠΡΟΣΟΧΗ <br/> <span className="text-blue-200">Απαιτείται ένταξη στο 11ο Δίκτυο <br/> για την επικοινωνία</span>
                    </p>
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">ΜΗΝΥΜΑ ΠΡΟΣ ΔΙΑΧΕΙΡΙΣΤΗ</h3>
              
              <form action="https://formspree.io/f/mgodrbbj" method="POST" className="space-y-6">
                <input type="hidden" name="User_ID" value={user?.id || ''} />
                <input type="hidden" name="User_Email" value={user?.email || ''} />

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-2 tracking-widest">ΔΗΜΟΣΙΟ ΨΕΥΔΩΝΥΜΟ</label>
                  <input 
                    name="public_username"
                    required
                    type="text" 
                    placeholder="Πώς θα θέλατε να φαίνεστε;"
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-2 tracking-widest">ΤΟ ΜΗΝΥΜΑ ΣΑΣ</label>
                  <textarea 
                    name="message"
                    required
                    rows={6}
                    placeholder="Γράψτε εδώ τις ιδέες ή τους προβληματισμούς σας..."
                    className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none resize-none font-medium"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 hover:shadow-2xl transition-all active:scale-95 uppercase tracking-widest text-lg"
                >
                  ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}