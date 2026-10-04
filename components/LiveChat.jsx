'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../app/lib/supabase'

export default function LiveChat() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [alias, setAlias] = useState('')
  const [userToken, setUserToken] = useState('')
  const [isEditingAlias, setIsEditingAlias] = useState(false)
  const [tempAlias, setTempAlias] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    let token = localStorage.getItem('chat_device_token')
    if (!token) {
      token = 'user_' + Math.random().toString(36).substring(2) + Date.now().toString(36)
      localStorage.setItem('chat_device_token', token)
    }
    setUserToken(token)

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
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => prev.filter((msg) => msg.id !== payload.old.id))
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

  const handleSaveAlias = async (e) => {
    e.preventDefault()
    const trimmed = tempAlias.trim()
    if (!trimmed) return

    if (trimmed === alias) {
      setIsEditingAlias(false)
      return
    }

    const { data, error } = await supabase
      .from('messages')
      .select('user_token')
      .eq('username', trimmed)
      .neq('user_token', userToken)
      .limit(1)

    if (data && data.length > 0) {
      setErrorMsg('Αυτό το όνομα χρησιμοποιείται ήδη!')
      return
    }

    setErrorMsg('')
    setAlias(trimmed)
    localStorage.setItem('chat_user_alias', trimmed)
    setIsEditingAlias(false)
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const { error } = await supabase.from('messages').insert([
      {
        content: newMessage.trim(),
        username: alias,
        user_token: userToken,
      },
    ])

    if (error) {
      console.error('Error sending message:', error)
    } else {
      setNewMessage('')
    }
  }

  const deleteMessage = async (id, msgToken) => {
    if (msgToken !== userToken) {
      alert('Μπορείτε να διαγράψετε μόνο τα δικά σας μηνύματα!')
      return
    }

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting message:', error)
    } else {
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
    }
  }

  return (
    <div className="flex flex-col h-[480px] w-full border rounded-3xl bg-white shadow-sm overflow-hidden border-gray-100">
      {/* Header */}
      <div className="bg-blue-900 text-white p-3 text-xs font-bold flex flex-col justify-between items-center gap-1">
        <span className="text-sm">💬 Ανώνυμο Live Chat</span>
        
        {isEditingAlias ? (
          <div className="flex flex-col items-center gap-1 w-full">
            <form onSubmit={handleSaveAlias} className="flex items-center gap-1 w-full justify-center">
              <input
                type="text"
                value={tempAlias}
                onChange={(e) => setTempAlias(e.target.value)}
                className="text-xs px-2 py-1 rounded text-gray-900 bg-white outline-none font-medium w-28"
                placeholder="Ψευδώνυμο..."
                autoFocus
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-600 px-2 py-1 rounded text-xs">
                OK
              </button>
            </form>
            {errorMsg && <span className="text-[10px] text-red-300">{errorMsg}</span>}
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] bg-blue-800/80 px-2.5 py-1 rounded-full text-blue-100">
            <span className="truncate max-w-[110px]">Εσύ: <b>{alias}</b></span>
            <button 
              onClick={() => { setIsEditingAlias(true); setErrorMsg(''); }} 
              className="underline hover:text-white transition text-[10px] whitespace-nowrap"
            >
              (Αλλαγή)
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-gray-50/50">
        {messages.map((msg) => {
          const isMe = msg.user_token === userToken
          return (
            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] text-gray-400">{msg.username}</span>
                {isMe && (
                  <button 
                    onClick={() => deleteMessage(msg.id, msg.user_token)}
                    className="text-[10px] text-red-500 hover:text-red-700 font-bold"
                    title="Διαγραφή μηνύματος"
                  >
                    [×]
                  </button>
                )}
              </div>
              <div
                className={`p-2.5 rounded-2xl max-w-[90%] text-sm font-medium break-words ${
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

      {/* Input Form - Διορθωμένο πλάτος ώστε να φαίνεται πάντα το κουμπί */}
      <form onSubmit={sendMessage} className="p-2.5 border-t bg-white flex gap-1.5 items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Μήνυμα..."
          className="min-w-0 flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-blue-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-blue-800 transition"
        >
          Αποστολή
        </button>
      </form>
    </div>
  )
}