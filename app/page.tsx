'use client';

import { useState } from 'react';
import Link from 'next/link';

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

  const toggleNetwork = (network: string) => {
    const updatedNetworks = selectedNetworks.includes(network) 
      ? selectedNetworks.filter(n => n !== network) 
      : [...selectedNetworks, network];
    setSelectedNetworks(updatedNetworks);
  };

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
          
          <div className="mt-8">
            <p className="text-teal-50 font-bold text-xl uppercase tracking-wider">
               Η ψηφιακή πύλη για το Δίκτυο Φοιτητών Σερρών
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 py-12 w-full -mt-20 relative z-20">
        
        {/* ΤΑ 12 ΚΟΥΜΠΙΑ ΔΙΚΤΥΩΝ */}
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
            
            {/* ΑΡΙΣΤΕΡΑ: CHECKBOXES */}
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
            <div className="w-full md:w-1/2 p-10 md:p-14 relative">
              <h3 className="text-2xl font-black text-teal-900 mb-8 uppercase tracking-tight">ΜΗΝΥΜΑ ΠΡΟΣ ΔΙΚΤΥΟ</h3>
              <form action="https://formspree.io/f/mgodrbbj" method="POST" className="space-y-6">
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
    </div>
  );
}