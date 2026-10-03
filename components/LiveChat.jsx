'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

// Σύνδεση με τη Supabase χρησιμοποιώντας τις μεταβλητές περιβάλλοντος σου
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function LiveChat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [alias, setAlias] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Δημιουργία ενός τυχαίου ανώνυμου ονόματος για τον χρήστη
    const randomId = Math.floor(1000 + Math.random() * 9000)
    setAlias(`Ανώνυμος_${randomId}`)

    // 1. Φόρτωση των προηγούμενων μηνυμάτων από τη βάση
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

    // 2. Ενεργοποίηση Realtime (να έρχονται τα μηνύματα αμέσως χωρίς refresh)
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

  // Αυτόματο scroll στο τελευταίο μήνυμα
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Συνάρτηση αποστολής μηνύματος
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const { error } = await supabase.from('messages').insert([
      {
        content: newMessage,
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
    <div className="flex flex-col h-[500px] max-w-md mx-auto border rounded-lg bg-white shadow-md overflow-hidden my-6">
      {/* Header */}
      <div className="bg-slate-800 text-white p-3 text-sm font-medium flex justify-between items-center">
        <span>Ανώνυμο Live Chat</span>
        <span className="text-xs bg-slate-700 px-2 py-1 rounded">Είσαι ο: {alias}</span>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
        {messages.map((msg) => {
          const isMe = msg.sender_alias === alias
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-xs text-slate-500 mb-1">{msg.sender_alias}</span>
              <div
                className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-slate-800 rounded-bl-none'
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
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
        >
          Αποστολή
        </button>
      </form>
    </div>
  )
}