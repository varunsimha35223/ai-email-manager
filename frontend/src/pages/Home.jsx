import { useState } from 'react'
import { getAuthUrl } from '../api/client'

export default function Home() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const connect = async (provider) => {
    setLoading(provider)
    setError(null)
    try {
      const url = await getAuthUrl(provider)
      window.location.href = url
    } catch (e) {
      setError('Could not connect. The server may be waking up — please try again in 30 seconds.')
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow effects */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Powered by Groq · Llama 3.3 · Free to use
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
          Your Inbox,<br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Managed by AI
          </span>
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          Connect Gmail or Outlook. AI categorizes your emails, flags urgent ones, and drafts replies — instantly.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['Auto Categorize', 'Flag Urgent', 'Draft Replies', 'Daily Summary'].map((f) => (
            <span key={f} className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full">
              ✦ {f}
            </span>
          ))}
        </div>

        {/* Connect buttons */}
        <div className="space-y-3">
          <button
            onClick={() => connect('gmail')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-100 active:scale-95 transition-all shadow-lg shadow-white/5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png" className="w-5 h-5" alt="Gmail" />
            {loading === 'gmail' ? 'Connecting... (may take 30s)' : 'Continue with Gmail'}
          </button>

          <button
            onClick={() => connect('outlook')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" className="w-5 h-5" alt="Outlook" />
            {loading === 'outlook' ? 'Connecting...' : 'Continue with Outlook'}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-4">
            {error}
          </p>
        )}

        <p className="text-xs text-gray-600 mt-8">
          🔒 Read-only access · No emails stored on servers · Open source
        </p>
      </div>
    </div>
  )
}
