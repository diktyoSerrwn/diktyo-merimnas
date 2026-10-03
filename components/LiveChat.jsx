'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase';

export default function LiveChat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [alias, setAlias] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const randomId = Math.floor(1000 + Math.random() * 9000)
    setAlias(`Ανώνυμος_${randomId}`)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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
    <div className="flex flex-col h-[450px] w-full border rounded-3xl bg-white shadow-sm overflow-hidden border-gray-100">
      <div className="bg-blue-900 text-white p-4 text-sm font-bold flex justify-between items-center">
        <span>💬 Ανώνυμο Live Chat</span>
        <span className="text-xs bg-blue-800 px-3 py-1 rounded-full text-blue-100">Εσύ: {alias}</span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
        {messages.map((msg) => {
          const isMe = msg.sender_alias === alias
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
          )
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
  )
}