'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../app/lib/supabase'

export default function LiveChat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [alias, setAlias] = useState('')
  const [isEditingAlias, setIsEditingAlias] = useState(false)
  const [tempAlias, setTempAlias] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Έλεγχος αν υπάρχει ήδη αποθηκευμένο ψευδώνυμο στον browser
    const savedAlias = localStorage.getItem('chat_user_alias')
    if (savedAlias) {
      setAlias(savedAlias)
      setTempAlias(savedAlias)
    } else {
      const randomId = Math.floor(1000 + Math.random() * 9000)
      const defaultAlias = `Ανώνυμος_${randomId}`
      setAlias(defaultAlias)
      setTempAlias(defaultAlias)
      localStorage.setItem('chat_user_alias', defaultAlias)
    }

    // 1. Φόρτωση προηγούμενων μηνυμάτων από τη Supabase
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50)

      if (error) console.error('Error fetching messages:', error)
      else setMessages(data || [])
    }

    fetchMessages()

    // 2. Realtime subscription για νέα μηνύματα
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Αυτόματο scroll κάτω όταν έρχεται μήνυμα
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Αποθήκευση νέου custom ψευδωνύμου
  const handleSaveAlias = (e) => {
    e.preventDefault()
    if (!tempAlias.trim()) return
    setAlias(tempAlias.trim())
    localStorage.setItem('chat_user_alias', tempAlias.trim())
    setIsEditingAlias(false)
  }

  // Αποστολή μηνύματος
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const { error } = await supabase.from('messages').insert([
      {
        content: newMessage.trim(),
        sender_alias: alias,
      },
    ])

    if (error) {
      console.error('Error sending message:', error)
    } else {
      setNewMessage('')
    }
  }

  return (
    <div className="flex flex-col h-[480px] w-full border rounded-3xl bg-white shadow-sm overflow-hidden border-gray-100">
      {/* Header & Alias Changer */}
      <div className="bg-blue-900 text-white p-4 text-sm font-bold flex flex-col sm:flex-row justify-between items-center gap-2">
        <span>💬 Ανώνυμο Live Chat</span>
        
        {isEditingAlias ? (
          <form onSubmit={handleSaveAlias} className="flex items-center gap-1">
            <input
              type="text"
              value={tempAlias}
              onChange={(e) => setTempAlias(e.target.value)}
              className="text-xs px-2 py-1 rounded text-gray-900 bg-white outline-none font-medium"
              placeholder="Ψευδώνυμο..."
              autoFocus
            />
            <button type="submit" className="bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded text-xs">
              OK
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 text-xs bg-blue-800/80 px-3 py-1 rounded-full text-blue-100">
            <span>Εσύ: <b>{alias}</b></span>
            <button 
              onClick={() => setIsEditingAlias(true)} 
              className="underline hover:text-white transition text-[11px]"
            >
              (Αλλαγή)
            </button>
          </div>
        )}
      </div>

      {/* Messages Box (Μηνύματα που μένουν αποθηκευμένα) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
        {messages.map((msg) => {
          const isMe = msg.sender_alias === alias
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-gray-400 mb-1 px-1">{msg.sender_alias}</span>
              <div
                className={`p-3 rounded-2xl max-w-[85%] text-sm font-medium break-words ${
                  isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
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
  )
}