'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';

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

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id;

  const currentCategory = categoryLinks.find((cat) => cat.id === categoryId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-blue-900 text-white pt-12 pb-24 px-6 text-center relative">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-6 px-4 py-2 bg-white/10 hover:bg-white/25 rounded-xl text-sm font-bold transition-all border border-white/20">
            ← Επιστροφή στην Αρχική
          </Link>
          <span className="text-6xl block mb-4">{currentCategory?.emoji || '📂'}</span>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            {currentCategory?.title || 'Δίκτυο Φοιτητών Σερρών'}
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 py-12 w-full -mt-12 relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 text-center space-y-6">
          <h2 className="text-2xl font-black text-blue-950 uppercase">Καλώς ήρθατε στο δίκτυο</h2>
          <p className="text-gray-600 font-medium leading-relaxed">
            Εδώ θα βρείτε όλες τις δράσεις, τις ανακοινώσεις και τις πληροφορίες που αφορούν την κατηγορία αυτή.
          </p>
          <div className="pt-6 border-t border-gray-100 flex justify-center gap-4">
            <Link href="/" className="px-6 py-3 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all text-sm uppercase">
              Αρχική Σελίδα
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}