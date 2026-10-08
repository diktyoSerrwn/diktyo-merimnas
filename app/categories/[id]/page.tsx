'use client';

import { use } from 'react';
import Link from 'next/link';

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
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            {currentCategory?.title || 'Δίκτυο Φοιτητών Σερρών'}
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 py-12 w-full -mt-12 relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 space-y-8">
          
          {/* 1. ΒΕΛΤΙΩΣΗΣ ΦΟΙΤΗΤΙΚΗΣ ΖΩΗΣ */}
          {categoryId === 'beltiosi-zois' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <p className="text-lg font-medium italic text-blue-900">
                  Το Δίκτυο Βελτίωσης της Φοιτητικής Ζωής αποτελεί βασικό πυλώνα του Φοιτητικού Δικτύου Σερρών[cite: 5].
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎯 Όραμα και Ρόλος</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Εκφράζει στην πράξη το όραμα για μια κοινωνία ανθρωπισμού, αξιοπρέπειας και ίσων ευκαιριών[cite: 5].</li>
                  <li>Διασφαλίζει ότι κανένας/καμία δεν αποκλείεται από τη μόρφωση, τη συμμετοχή και τη συλλογική ζωή[cite: 5].</li>
                  <li>Αντιμετωπίζει τα οικονομικά, κοινωνικά και υλικά εμπόδια ως συλλογική ευθύνη[cite: 5].</li>
                  <li>Λειτουργεί στη βάση της αυτοοργάνωσης, της συλλογικής ευθύνης και της αλληλεγγύης[cite: 5].</li>
                  <li>Χωρίς εμπορικό χαρακτήρα — χωρίς κομματικές ή άλλες εξαρτήσεις[cite: 5].</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🚀 Πεδίο Δράσης</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-gray-700">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δημιουργία φοιτητικών εστιών[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δωρεάν στέγαση για όλους τους φοιτητές[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δωρεάν μετακίνηση εντός της πόλης φοίτησης[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δωρεάν μετακίνηση μεταξύ πόλης φοίτησης και πόλης διαμονής[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Μειωμένο εισιτήριο στην Ελλάδα και την Ευρωπαϊκή Ένωση[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δωρεάν και αξιοπρεπή σίτιση για όλους τους φοιτητές[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Πλήρης κάλυψη εξόδων συμμετοχής σε προγράμματα Erasmus[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Πλήρη κάλυψη της υγείας για όλους τους φοιτητές[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Κοινωνικός τουρισμός για όλους τους φοιτητές[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δημιουργία χώρων συνάντησης και συλλογικής ζωής φοιτητών[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Λειτουργία αιθουσών εκδηλώσεων, ομιλιών και διαλόγου[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Πλήρης κρατική στήριξη φοιτητών σε περίπτωση οικονομικής αδυναμίας της οικογένειας[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Δωρεάν μεταπτυχιακές σπουδές για όλους τους φοιτητές[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Χορήγηση υποτροφιών σε μεταπτυχιακούς φοιτητές[cite: 5]</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✨ Χορήγηση υποτροφιών σε υποψήφιους διδάκτορες[cite: 5]</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🤝 Οργάνωση & Συνεργασίες</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Λειτουργεί με ανοιχτές ομάδες εργασίας[cite: 5].</li>
                  <li>Διαθέτει συντονιστές με εναλλασσόμενο και ανακλητό ρόλο[cite: 5].</li>
                  <li>Συνεργάζεται ισότιμα με όλα τα Δίκτυα της φοιτητικής κοινότητας[cite: 5].</li>
                  <li>Συνεργάζεται με κοινωνικούς φορείς χωρίς εξαρτήσεις[cite: 5].</li>
                </ul>
              </div>
            </div>
          )}

          {/* 2. ΕΠΑΓΓΕΛΜΑΤΙΚΩΝ ΚΑΙ ΕΡΕΥΝΗΤΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ */}
          {categoryId === 'epaggelmatika-erevnitika' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">Δομή και ρόλος του Δικτύου</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Το δίκτυο αποτελείται από Ελεύθερες Ομάδες φοιτητών που ερευνών και δημιουργούν</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎯 Στόχοι του Δικτύου</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Σχεδιασμός και υλοποίηση πρωτότυπων έργων (προϊόντα, εφαρμογές, τεχνολογικές λύσεις)</li>
                  <li>Θεωρητική εμβάθυνση και πρακτική/εφαρμοσμένη έρευνα</li>
                  <li>Επιμορφωτικά σεμινάρια ανοιχτά σε άλλα συναφή δίκτυα — διάχυση γνώσης</li>
                  <li>Ανταλλαγή και συνδιαμόρφωση επιστημονικών γνώσεων</li>
                  <li>Διαμόρφωση προτάσεων για την αξιοποίηση των ερευνητικών αποτελεσμάτων του Δικτύου προς όφελος της κοινωνίας</li>
                  <li>Γνώση δημόσιων πολιτικών, επενδύσεων και κοινωνικών αναγκών για το αντικείμενο του Δικτύου</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🔗 Συνδέσεις και Συνεργασίες</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Συστηματική συνεργασία με αντίστοιχα Δίκτυα στην Ελλάδα</li>
                  <li>Διεθνείς συνδέσεις με αντίστοιχα Πανεπιστημιακά Τμήματα του Εξωτερικού</li>
                  <li>Συνεργασία με μεμονωμένους καθηγητές σε Ελλάδα και εξωτερικό</li>
                  <li>Επαφή με ερευνητικά ινστιτούτα</li>
                  <li>Επαφή με επαγγελματίες του κλάδου</li>
                  <li>Συμμετοχή σε εκδηλώσεις (διαγωνισμούς, συνέδρια, και workshops)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎓 Συμμετοχή Φοιτητών</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Η συμμετοχή είναι εθελοντική</li>
                  <li>Κάθε φοιτητής/τρια μπορεί να εντάσσεται σε μια ή περισσότερες Ομάδες του δικτύου</li>
                  <li>Η συμμετοχή γίνεται παράλληλα με τις προπτυχιακές σπουδές</li>
                  <li>Δεν υπάρχει αποκλεισμός, ιεραρχία ή ανταγωνισμός</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🏛️ Χώροι Δράσης & Δημιουργίας</h3>
                <div className="space-y-4 text-gray-700 font-medium">
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <p className="font-black text-blue-900 mb-1">🛠️ Εργαστήρια Τομέων</p>
                    <p className="text-sm">Συνάντηση ομάδων • Πειραματισμός • Πρωτότυπα</p>
                  </div>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <p className="font-black text-blue-900 mb-1">🏛️ Αίθουσες Τμήματος</p>
                    <p className="text-sm">Σεμινάρια • Διάλογος • Παρουσιάσεις</p>
                  </div>
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <p className="font-black text-blue-900 mb-1">📚 Βιβλιοθήκη</p>
                    <p className="text-sm">Μελέτη • Τεκμηρίωση • Έρευνα</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">👥 Πλαίσιο Συνεργασίας με Καθηγητές & Επαγγελματίες</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Σε περίπτωση χρήσης εργαστηριακού χώρου - εξοπλισμού η ομάδα συναποφασίζει με τον υπεύθυνο καθηγητή του εργαστηρίου.</li>
                  <li>Σε περίπτωση συνεργασίας με καθηγητή η ομάδα συναποφασίζει με τον καθηγητή τον τρόπο και τον χρόνο συνεργασίας.</li>
                  <li>Διαφάνεια, δημόσια καταγραφή συνεργασιών και δικαίωμα απόσυρσης χωρίς κυρώσεις.</li>
                  <li>Οι επαγγελματίες συμμετέχουν ως μέντορες/συνεργάτες γνώσης — όχι ως εργοδότες ή αξιολογητές.</li>
                  <li>Πνευματικά δικαιώματα: το έργο ανήκει στην ομάδα, στον επαγγελματία ή και στο Πανεπιστήμιο.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">💡 Καινοτομία – Startups – Μεταφορά Γνώσης</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Μέσα από τις ομάδες μπορούν να γεννηθούν start-up εγχειρήματα.</li>
                  <li>Είτε εντός πανεπιστημίου (θερμοκοιτίδες) είτε μετά την αποφοίτηση.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 3. ΓΕΝΙΚΗΣ ΜΟΡΦΩΣΗΣ */}
          {categoryId === 'geniki-morfosi' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">📖 Η αξία της Γενικής Μόρφωσης</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Η Γενική Μόρφωση αποτελεί βασικό θεμέλιο για την κατανόηση του κόσμου και τη συνειδητή συμμετοχή του ανθρώπου σε αυτόν. Δεν περιορίζεται στη συσσώρευση γνώσεων, αλλά αφορά την ικανότητα σύνδεσης, ερμηνείας και κριτικής προσέγγισης της πραγματικότητας. Σε μια εποχή όπου η εξειδίκευση κυριαρχεί, η γενική παιδεία λειτουργεί ως αναγκαίο αντίβαρο.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎯 Ρόλος και Λειτουργία του Δικτύου</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Λειτουργεί οριζόντιος πυρήνας παιδείας, που απευθύνεται στο σύνολο των φοιτητών και φοιτητριών.</li>
                  <li>Δεν εκπαιδεύει ειδικούς — καλλιεργεί ενσυνείδητους, ενημερωμένους και υπεύθυνους πολίτες.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">📚 Αντικείμενο και Θεματικοί Άξονες</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-gray-700">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">⚖️ Πολιτική & Πολιτειακή Παιδεία</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">📜 Ιστορία</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">💰 Οικονομία</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🧬 Βιολογία και Υγεία</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🔬 Φυσικές Επιστήμες</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">💻 Τεχνολογία</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">📐 Μαθηματική Παιδεία</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🚀 Δράσεις και Μέσα</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Οργάνωση ομιλιών, σεμιναρίων, συζητήσεων, θεματικών εκδηλώσεων και κύκλων διαλόγου.</li>
                  <li>Πρόσκληση καθηγητών άλλων Τμημάτων και αξιοποίηση της εμπειρίας της φοιτητικής κοινότητας.</li>
                  <li>Διατήρηση ηλεκτρονικού αρχείου παρουσιάσεων και ανοιχτού ψηφιακού χώρου διαλόγου.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 4. ΕΘΕΛΟΝΤΙΣΜΟΥ ΚΑΙ ΚΟΙΝΩΝΙΚΗΣ ΠΡΟΣΦΟΡΑΣ */}
          {categoryId === 'ethelontismos-prosfora' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🤝 Ο Εθελοντισμός ως Στάση Ζωής</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Ο εθελοντισμός δεν αποτελεί απλώς μια πράξη προσφοράς, αλλά μια συνειδητή στάση ζωής που ενώνει το άτομο με την κοινωνία μέσα από την αλληλεγγύη, την υπευθυνότητα και τη συλλογική δράση.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🛡️ Ομάδες Δράσης του Δικτύου</h3>
                <ul className="space-y-4 text-gray-700 font-medium">
                  <li className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-black text-blue-900 block mb-1">1. Ομάδα Δασοπροστασίας και Πολιτικής Προστασίας</span>
                    Πρόληψη και ετοιμότητα απέναντι σε φυσικούς κινδύνους, περιπολίες, και υποστήριξη πολιτικής προστασίας.
                  </li>
                  <li className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-black text-blue-900 block mb-1">2. Ομάδα Πρώτων Βοηθειών και Υγειονομικής Υποστήριξης</span>
                    Εκπαίδευση σε ΚΑΡΠΑ, χρήση AED και υγειονομική κάλυψη φοιτητικών εκδηλώσεων σε συνεργασία με ΕΚΑΒ και Ερυθρό Σταυρό.
                  </li>
                  <li className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-black text-blue-900 block mb-1">3. Ομάδα Περιβαλλοντικής Προστασίας και Καθαρισμών</span>
                    Καθαρισμοί πάρκων, ακτών, δενδροφυτεύσεις και περιβαλλοντικές καμπάνιες.
                  </li>
                  <li className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-black text-blue-900 block mb-1">4. Ομάδα Κοινωνικής Υποστήριξης Ευάλωτων Ομάδων</span>
                    Συλλογή τροφίμων, ρουχισμού, στήριξη ηλικιωμένων, αστέγων και συμμετοχή σε κοινωνικά παντοπωλεία.
                  </li>
                  <li className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-black text-blue-900 block mb-1">5. Ομάδα Υγείας και Νοσοκομειακής Υποστήριξης</span>
                    Εθελοντική παρουσία σε νοσοκομεία, υποστήριξη ασθενών και δράσεις αιμοδοσίας.
                  </li>
                  <li className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <span className="font-black text-blue-900 block mb-1">6. Ομάδα Εκπαιδευτικής Υποστήριξης</span>
                    Δωρεάν ενισχυτική διδασκαλία, ομάδες μελέτης και υποστήριξη φοιτητών ΑμεΑ.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* 5. ΠΟΛΙΤΙΣΜΟΥ ΚΑΙ ΔΗΜΙΟΥΡΓΙΚΩΝ ΔΡΑΣΤΗΡΙΟΤΗΤΩΝ */}
          {categoryId === 'politismos-dimiourgia' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎨 Ο Πολιτισμός μας Ενώνει</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Ο πολιτισμός αποτελεί θεμελιώδες στοιχείο της ανθρώπινης ύπαρξης και συλλογικής ζωής. Λειτουργεί ως πεδίο ελεύθερης έκφρασης, δημιουργικότητας και συμμετοχής των φοιτητών.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎭 Ομάδες Δράσης Πολιτισμού</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-gray-700">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">🏆 Ομάδα Αθλητισμού</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">🎵 Ομάδα Μουσικής</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">💃 Ομάδα Χορού</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">🎭 Ομάδα Θεάτρου</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">🖼️ Ομάδα Εικαστικών Τεχνών</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">🎬 Ομάδα Κινηματογράφου</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">📚 Ομάδα Λογοτεχνίας</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 font-bold text-blue-900">🔭 Ομάδα Ερασιτεχνικής Αστρονομίας</li>
                </ul>
              </div>
            </div>
          )}

          {/* 6. ΑΓΡΟΤΙΚΗΣ ΚΑΙ ΠΡΩΤΟΓΕΝΟΥΣ ΕΘΕΛΟΝΤΙΚΗΣ ΔΡΑΣΗΣ */}
          {categoryId === 'agrotiki-drasi' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🌿 Μάθηση, Συμμετοχή και Σύνδεση με τη Γη</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Το Δίκτυο Αγροτικής και Πρωτογενούς Εθελοντικής Δράσης συγκροτείται ως μια εκπαιδευτική και βιωματική πρωτοβουλία που επαναφέρει τον άνθρωπο σε επαφή με τη γη, την παραγωγή και τα φυσικά οικοσυστήματα.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🌱 Ομάδες Αγροτικής Δράσης</h3>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🌱 **Ομάδα Κηπευτικών Καλλιεργειών:** Βιωματική εκπαίδευση σε κηπευτικά και βιώσιμες πρακτικές.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🌳 **Ομάδα Δενδροκομίας & Οπωροκαλλιεργειών:** Δενδροφυτεύσεις και φροντίδα πολυετών καλλιεργειών.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🐄 **Ομάδα Κτηνοτροφίας & Ζωικής Φροντίδας:** Υποστήριξη μικρών μονάδων και ευζωία ζώων.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🐟 **Ομάδα Ιχθυοκαλλιέργειας & Υδατοκαλλιεργειών:** Γνωριμία με υδατικά οικοσυστήματα.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🚜 **Ομάδα Γεωργικής Παραγωγής:** Επαφή με τον κύκλο της αγροτικής εργασίας και εποχικές εργασίες.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 7. ΠΡΑΚΤΙΚΩΝ ΔΕΞΙΟΤΗΤΩΝ ΚΑΙ ΤΕΧΝΩΝ ΖΩΗΣ */}
          {categoryId === 'praktikes-dexiotites' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🛠️ Μάθηση για την Καθημερινότητα και την Αυτονομία</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Ενίσχυση της αυτονομίας των ατόμων και καλλιέργεια κουλτούρας υπευθυνότητας, συνεργασίας και αυτάρκειας μέσα από πρακτικές δεξιότητες.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🔧 Ομάδες Δεξιοτήτων</h3>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🚰 **Ομάδα Υδραυλικών Εργασιών:** Απλές οικιακές εργασίες χαμηλού ρίσκου (αλλαγή βρύσης, φίλτρα νερού).</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🍳 **Ομάδα Μαγειρικής & Διατροφής:** Βασικές τεχνικές, υγιεινή και παρασκευή θρεπτικών γευμάτων.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🪑 **Ομάδα Ξυλουργικής & Κατασκευών:** Χρήση απλών εργαλείων και επισκευή επίπλων.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🏠 **Ομάδα Τεχνών Οικιακής Συντήρησης:** Βάψιμο, κλειδαριές, ράψιμο και εξοικονόμηση πόρων.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 8. ΕΝΗΜΕΡΩΣΗΣ ΚΑΙ ΔΗΜΟΣΙΩΝ ΣΧΕΣΕΩΝ */}
          {categoryId === 'enimerosi-pr' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">📢 Ενημέρωση και Θεσμική Επικοινωνία</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Υπεύθυνη και τεκμηριωμένη ενημέρωση, ελεύθερη έκφραση και διαφάνεια με την κοινωνία.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎯 Δομή Δικτύου</h3>
                <ul className="space-y-3 text-gray-700 font-medium">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">💻 **Ομάδα Ενημέρωσης:** Διαδικτυακά μέσα, ραδιόφωνο, τηλεόραση, ηλεκτρονική εφημερίδα και social media.</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🌐 **Ομάδα Δημοσίων Σχέσεων:** Εσωτερικές και διεθνείς δημόσιες σχέσεις, επαφή με φορείς και κοινωνικές οργανώσεις.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 9. ΕΛΛΗΝΩΝ ΦΟΙΤΗΤΩΝ ΕΞΩΤΕΡΙΚΟΥ */}
          {categoryId === 'ellines-exoterikou' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🌍 Σύνδεση με τον Απόδημο Ελληνισμό</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Σύνδεση και συνεργασία των Ελλήνων φοιτητών που σπουδάζουν στο εξωτερικό, καθώς και των φοιτητών του Απόδημου Ελληνισμού, υποστηρίζοντας την ελληνική γλώσσα και πολιτισμό.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">✨ Βασικές Δράσεις</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Δημιουργία κοινοτήτων φιλοξενίας και πολιτισμού μεταξύ Ελλάδας και Ομογένειας.</li>
                  <li>Φιλοξενία φοιτητών από την Ελλάδα σε ελληνικές κοινότητες του εξωτερικού και αντίστροφα.</li>
                  <li>Διάχυση του ελληνικού πολιτισμού και των ανθρωπιστικών αξιών διεθνώς.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 10. ΕΚΔΡΟΜΩΝ ΚΑΙ ΒΙΩΜΑΤΙΚΩΝ ΔΡΑΣΕΩΝ */}
          {categoryId === 'ekdromes-viomatika' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎒 Βιωματική Παιδεία και Εμπειρία</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Οι εκδρομές δεν είναι απλή διασκέδαση. Είναι βιωματική παιδεία που συνδυάζει μάθηση, ιστορία, φύση και συλλογικότητα.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🚌 Κατηγορίες Δράσεων</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-gray-700">
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🏛️ Επιμορφωτικές Εκδρομές</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🎭 Πολιτιστικές & Καλλιτεχνικές Δράσεις</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">🌲 Εκδρομές Φύσης & Περιβάλλοντος</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">☕ Ψυχαγωγικές & Κοινωνικές Εκδρομές</li>
                  <li className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">✈️ Διεθνείς Εκδρομές & Ανταλλαγές</li>
                </ul>
              </div>
            </div>
          )}

          {/* 11. ΠΡΟΒΛΗΜΑΤΙΣΜΟΥ ΚΑΙ ΑΝΤΑΛΛΑΓΗΣ ΙΔΕΩΝ */}
          {categoryId === 'provlimatismos-idees' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">💡 Ένα ψηφιακό περιβάλλον συμμετοχής</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Χώρος όπου κάθε φοιτητής μπορεί να μιλήσει με σεβασμό και ελευθερία, δημιουργώντας μια ζωντανή κοινότητα ιδεών και ποιοτικού διαλόγου.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🎯 Οφέλη για τους Φοιτητές</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Ενίσχυση της φοιτητικής φωνής και της δημοκρατικής συμμετοχής.</li>
                  <li>Καλύτερη επικοινωνία μεταξύ φοιτητών διαφορετικών τμημάτων.</li>
                  <li>Ανάδειξη προβλημάτων και συλλογή προτάσεων για λύσεις.</li>
                  <li>Καλλιέργεια υπεύθυνου δημόσιου λόγου και συνεργασίας.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 12. ΕΙΡΗΝΗΣ ΚΑΙ ΑΝΘΡΩΠΙΣΜΟΥ */}
          {categoryId === 'eirini-anthropismos' && (
            <div className="space-y-8 text-gray-800">
              <div className="border-b pb-6">
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🕊️ Τα Παντοτινά Μεγάλα Προβλήματα της Ανθρωπότητας</h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  Σε έναν κόσμο που εξελίσσεται με ταχύτητα, η καθημερινότητα για εκατομμύρια ανθρώπους εξακολουθεί να χαρακτηρίζεται από ανισότητα, ανασφάλεια, πολέμους και αποκλεισμό.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black text-blue-950 uppercase mb-4 tracking-tight">🌍 Ο Ρόλος των Παγκόσμιων Φοιτητικών Δικτύων</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 font-medium">
                  <li>Να εξελιχθούν σε ένα ευρύ δίκτυο γνώσης, αλληλεγγύης και δημοκρατικής δράσης που ξεπερνά σύνορα.</li>
                  <li>Να υπερασπίζονται την ειρήνη, να αναδεικνύουν τις ανισότητες και να ενώνουν πανεπιστήμια και λαούς.</li>
                  <li>Να μετατρέπουν τη γνώση σε ευθύνη και την ευθύνη σε πράξη προς όφελος του κοινού καλού.</li>
                </ul>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-gray-100 flex justify-center">
            <Link href="/" className="px-6 py-3 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all text-sm uppercase">
              ← Επιστροφή στην Αρχική
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}