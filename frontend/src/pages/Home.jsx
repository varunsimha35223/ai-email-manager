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
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">

      <div className="max-w-lg w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-900 border border-indigo-700 text-indigo-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Powered by Groq · Llama 3.3 · Free to use
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black text-white mb-4 leading-tight tracking-tight">
          Your Inbox,<br />
          <span className="text-indigo-400">
            Managed by AI
          </span>
        </h1>
        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          Connect Gmail or Outlook. AI categorizes your emails,<br className="hidden sm:block" />
          flags urgent ones, and drafts replies — instantly.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { label: 'Auto Categorize', cls: 'bg-blue-900 border-blue-700 text-blue-300' },
            { label: 'Flag Urgent',     cls: 'bg-red-900 border-red-700 text-red-300' },
            { label: 'Draft Replies',   cls: 'bg-violet-900 border-violet-700 text-violet-300' },
            { label: 'Daily Summary',   cls: 'bg-emerald-900 border-emerald-700 text-emerald-300' },
          ].map((f) => (
            <span key={f.label} className={`text-xs border px-3 py-1 rounded-full font-medium ${f.cls}`}>
              ✦ {f.label}
            </span>
          ))}
        </div>

        {/* Connect buttons */}
        <div className="space-y-3">
          <button
            onClick={() => connect('gmail')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-4 px-6 rounded-2xl hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png" className="w-5 h-5" alt="Gmail" />
            {loading === 'gmail' ? 'Connecting... (may take 30s)' : 'Continue with Gmail'}
          </button>

          <button
            onClick={() => connect('outlook')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" className="w-5 h-5" alt="Outlook" />
            {loading === 'outlook' ? 'Connecting...' : 'Continue with Outlook'}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-300 bg-red-900/50 border border-red-700 rounded-xl px-4 py-3 mt-4">
            {error}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-8">
          🔒 Read-only access · No emails stored on servers · Open source
        </p>
      </div>
    </div>
  )
}
