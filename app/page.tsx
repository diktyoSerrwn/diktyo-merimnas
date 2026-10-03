'use client';

import { useState, useEffect, useRef } from 'react';
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

// Component για το Live Chat
function LiveChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [alias, setAlias] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setAlias(`Ανώνυμος_${randomId}`);

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) console.error('Error fetching messages:', error);
      else setMessages(data || []);
    };

    fetchMessages();

    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase.from('messages').insert([
      {
        content: newMessage,
        sender_alias: alias,
      },
    ]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[450px] w-full border rounded-3xl bg-white shadow-sm overflow-hidden border-gray-100">
      <div className="bg-blue-900 text-white p-4 text-sm font-bold flex justify-between items-center">
        <span>💬 Ανώνυμο Live Chat</span>
        <span className="text-xs bg-blue-800 px-3 py-1 rounded-full text-blue-100">Εσύ: {alias}</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
        {messages.map((msg) => {
          const isMe = msg.sender_alias === alias;
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-gray-400 mb-1 px-1">{msg.sender_alias}</span>
              <div
                className={`p-3 rounded-2xl max-w-[85%] text-sm font-medium ${
                  isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-3 border-t bg-white flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Γράψτε ένα μήνυμα..."
          className="flex-1 border border-gray-200 rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium"
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-5 py-2 rounded-2xl text-sm font-bold hover:bg-blue-800 transition"
        >
          Αποστολή
        </button>
      </form>
    </div>
  );
}

export default function HomePage() {
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getInitialData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from('user_networks')
          .select('network_name')
          .eq('user_id', user.id);

        if (data && !error) {
          setSelectedNetworks(data.map(item => item.network_name));
        }
      }
    }
    getInitialData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  const toggleNetwork = async (network: string) => {
    if (!user) {
      alert('Πρέπει να συνδεθείτε για να αποθηκεύσετε τα δίκτυά σας!');
      return;
    }

    const isSelected = selectedNetworks.includes(network);

    if (isSelected) {
      const { error } = await supabase
        .from('user_networks')
        .delete()
        .eq('user_id', user.id)
        .eq('network_name', network);

      if (!error) {
        setSelectedNetworks(selectedNetworks.filter(n => n !== network));
      }
    } else {
      const { error } = await supabase
        .from('user_networks')
        .insert([{ user_id: user.id, network_name: network }]);

      if (!error) {
        setSelectedNetworks([...selectedNetworks, network]);
      }
    }
  };

  const firstName = user?.user_metadata?.first_name || user?.email;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-blue-900 text-white pt-8 pb-32 px-6 text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex justify-end gap-3 mb-10 relative z-20 items-center">
          {user ? (
            <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20">
              <span className="text-sm font-bold text-blue-100">👤 {firstName}</span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-all"
              >
                Αποσύνδεση
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl backdrop-blur-md transition-all border border-white/20 text-sm shadow-sm">
                Είσοδος
              </Link>
              <Link href="/signup" className="px-5 py-2.5 bg-white text-blue-950 font-black rounded-xl hover:bg-blue-50 transition-all text-sm shadow-md">
                Εγγραφή
              </Link>
            </>
          )}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter shadow-sm">
            ΔΙΚΤΥΟ ΦΟΙΤΗΤΩΝ ΣΕΡΡΩΝ
          </h1>
          <div className="mb-6">
            <p className="text-xl md:text-2xl font-medium italic text-blue-200 opacity-95 tracking-wide font-serif">
              "Ένα πανεπιστήμιο ανοιχτό στην κοινωνία"
            </p>
            <div className="w-24 h-1 bg-white/30 mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="mt-8">
            <p className="text-blue-100 font-bold text-xl uppercase tracking-wider">
               Η ψηφιακή πύλη για το Δίκτυο Φοιτητών Σερρών
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 py-12 w-full -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categoryLinks.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/categories/${cat.id}`} 
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-transparent hover:border-blue-700 hover:shadow-blue-100 hover:scale-[1.03] transition-all flex flex-col items-center justify-center text-center min-h-[220px] group"
            >
              <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-gray-900 font-black text-sm uppercase tracking-tight group-hover:text-blue-900 transition-colors">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>

        <section className="bg-white rounded-[3.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* 1. Ενταξη σε δίκτυα */}
            <div className="p-8 md:p-12 bg-blue-50/40 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase tracking-tight">ΕΝΤΑΞΗ ΣΕ ΔΙΚΤΥΑ</h3>
              <div className="grid grid-cols-1 gap-3 max-h-[450px] overflow-y-auto pr-2">
                {networks.map((net) => (
                  <label key={net} className="flex items-center group cursor-pointer bg-white p-3.5 rounded-2xl shadow-sm border-2 border-transparent hover:border-blue-400 transition-all">
                    <input 
                      type="checkbox" 
                      checked={selectedNetworks.includes(net)} 
                      onChange={() => toggleNetwork(net)} 
                      className="w-5 h-5 rounded-lg border-gray-300 text-blue-800 focus:ring-blue-700 accent-blue-800 cursor-pointer" 
                    />
                    <span className={`ml-3 text-sm font-bold transition-colors ${selectedNetworks.includes(net) ? 'text-blue-900' : 'text-gray-600'}`}>
                      {net}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Live Chat */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase tracking-tight">ΖΩΝΤΑΝΗ ΣΥΝΟΜΙΛΙΑ</h3>
              <LiveChat />
            </div>

            {/* 3. Μήνυμα προς δίκτυο (Formspree) */}
            <div className="p-8 md:p-12 flex flex-col">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase tracking-tight">ΜΗΝΥΜΑ ΠΡΟΣ ΔΙΚΤΥΟ</h3>
              <form action="https://formspree.io/f/mgodrbbj" method="POST" className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <input 
                    name="username" 
                    required 
                    type="text" 
                    placeholder="Δημόσιο Ψευδώνυμο" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none font-bold text-gray-900 text-sm" 
                  />
                  <textarea 
                    name="message" 
                    required 
                    rows={5} 
                    placeholder="Το μήνυμά σας..." 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none resize-none font-medium text-gray-900 text-sm"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition-all uppercase tracking-widest text-sm shadow-md"
                >
                  ΑΠΟΣΤΟΛΗ
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}