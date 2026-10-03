'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  username: string;
  content: string;
  created_at: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Φόρτωση αρχικών μηνυμάτων και ενεργοποίηση Realtime
  useEffect(() => {
    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    }
    fetchMessages();

    // Ζωντανή ακρόαση για νέα μηνύματα
    const channel = supabase
      .channel('realtime-messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !username.trim()) return;

    const { error } = await supabase.from('messages').insert([
      { username: username.trim(), content: newMessage.trim() }
    ]);

    if (!error) {
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-blue-900 text-white py-6 px-6 text-center relative shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-sm font-bold text-blue-200 hover:text-white transition">
            ← Επιστροφή στην Αρχική
          </Link>
          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            Φοιτητικό Live Chat
          </h1>
          <div className="w-24"></div> {/* Για ισορροπία στο flex */}
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-6 w-full flex-1 flex flex-col my-6">
        {!isUsernameSet ? (
          /* ΒΗΜΑ: ΕΙΣΑΓΩΓΗ ΨΕΥΔΩΝΥΜΟΥ */
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto w-full text-center my-auto">
            <h3 className="text-2xl font-black text-blue-950 mb-4 uppercase">Ορισμός Ψευδωνύμου</h3>
            <p className="text-gray-600 text-sm mb-6">
              Το chat είναι ανώνυμο. Δώσε ένα ψευδώνυμο για να σε βλέπουν οι υπόλοιποι φοιτητές.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (username.trim()) setIsUsernameSet(true);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                required
                placeholder="Το ψευδώνυμό σου..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-gray-900 text-center"
              />
              <button
                type="submit"
                className="w-full py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition uppercase tracking-wider shadow-lg"
              >
                Εισοδος στο Chat
              </button>
            </form>
          </div>
        ) : (
          /* ΧΩΡΟΣ ΣΥΝΟΜΙΛΙΑΣ */
          <div className="bg-white rounded-3xl shadow-xl flex flex-col h-[70vh] border border-gray-100 overflow-hidden">
            {/* ΜΠΑΡΑ ΠΛΗΡΟΦΟΡΗΣΗΣ */}
            <div className="bg-blue-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <span className="text-sm font-bold text-blue-900">
                Συνδεδεμένος ως: <span className="underline font-black">{username}</span>
              </span>
              <button
                onClick={() => setIsUsernameSet(false)}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Αλλαγή ψευδωνύμου
              </button>
            </div>

            {/* ΛΙΣΤΑ ΜΗΝΥΜΑΤΩΝ */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400 font-medium my-auto">
                  Δεν υπάρχουν μηνύματα ακόμα. Γράψε το πρώτο!
                </p>
              ) : (
                messages.map((msg) => {
                  const isMe = msg.username === username;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-xs font-bold text-gray-500 mb-1 px-1">
                        {msg.username}
                      </span>
                      <div
                        className={`p-4 rounded-2xl max-w-[75%] font-medium text-sm shadow-sm ${
                          isMe
                            ? 'bg-blue-900 text-white rounded-tr-none'
                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* ΦΟΡΜΑ ΑΠΟΣΤΟΛΗΣ ΜΗΝΥΜΑΤΟΣ */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3">
              <input
                type="text"
                placeholder="Γράψτε το μήνυμά σας..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-gray-900"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-blue-900 text-white font-black rounded-2xl hover:bg-blue-800 transition shadow-md uppercase tracking-wider"
              >
                Αποστολη
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}