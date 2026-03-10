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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 60% 0%, #3730a3 0%, #0f0f1a 50%, #0a0a14 100%)' }}>

      {/* Animated background orbs */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="max-w-lg w-full text-center relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-violet-500/15 border border-violet-400/30 text-violet-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Powered by Groq · Llama 3.3 · Free to use
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-black text-white mb-4 leading-tight tracking-tight">
          Your Inbox,<br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Managed by AI
          </span>
        </h1>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Connect Gmail or Outlook. AI categorizes your emails,<br className="hidden sm:block" />
          flags urgent ones, and drafts replies — instantly.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { label: 'Auto Categorize', color: 'bg-blue-500/15 border-blue-500/30 text-blue-300' },
            { label: 'Flag Urgent',     color: 'bg-red-500/15 border-red-500/30 text-red-300' },
            { label: 'Draft Replies',   color: 'bg-violet-500/15 border-violet-500/30 text-violet-300' },
            { label: 'Daily Summary',   color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' },
          ].map((f) => (
            <span key={f.label} className={`text-xs border px-3 py-1 rounded-full font-medium backdrop-blur-sm ${f.color}`}>
              ✦ {f.label}
            </span>
          ))}
        </div>

        {/* Connect buttons */}
        <div className="space-y-3">
          <button
            onClick={() => connect('gmail')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-4 px-6 rounded-2xl hover:bg-gray-100 active:scale-95 transition-all shadow-2xl shadow-white/10 disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png" className="w-5 h-5" alt="Gmail" />
            {loading === 'gmail' ? 'Connecting... (may take 30s)' : 'Continue with Gmail'}
          </button>

          <button
            onClick={() => connect('outlook')}
            disabled={!!loading}
            className="w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-2xl active:scale-95 transition-all shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed text-base text-white"
            style={{ background: 'linear-gradient(135deg, #0078d4 0%, #005a9e 100%)', boxShadow: '0 8px 32px rgba(0,120,212,0.3)' }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" className="w-5 h-5" alt="Outlook" />
            {loading === 'outlook' ? 'Connecting...' : 'Continue with Outlook'}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-4 backdrop-blur-sm">
            {error}
          </p>
        )}

        <p className="text-xs text-slate-600 mt-8">
          🔒 Read-only access · No emails stored on servers · Open source
        </p>
      </div>
    </div>
  )
}
