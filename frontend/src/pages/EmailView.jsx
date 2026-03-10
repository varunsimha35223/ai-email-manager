import { useLocation, useNavigate } from 'react-router-dom'
import CategoryBadge from '../components/CategoryBadge'
import { useState } from 'react'

export default function EmailView() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const email = state?.email
  const [copied, setCopied] = useState(false)

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-gray-400">Email not found.</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-indigo-400 hover:underline text-sm">Go back</button>
        </div>
      </div>
    )
  }

  const copyReply = () => {
    navigator.clipboard.writeText(email.draft_reply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1f 50%, #0a0a14 100%)' }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5 text-sm">
            ← Back
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-white font-medium truncate text-sm">{email.subject}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Email meta */}
        <div className="rounded-2xl p-5 border border-white/10" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg shadow-violet-500/20">
              {email.sender?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <CategoryBadge category={email.category} />
                {email.urgent && (
                  <span className="text-xs font-bold text-red-300 bg-red-500/15 border border-red-500/30 px-2 py-0.5 rounded-full">
                    ⚡ Urgent
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-white mb-1">{email.subject}</h1>
              <p className="text-sm text-slate-200">{email.sender}</p>
              <p className="text-xs text-slate-400 mt-0.5">{new Date(email.date).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="rounded-2xl p-5 border border-white/10" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">Message</p>
          <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{email.body || 'No content available.'}</p>
        </div>

        {/* AI Reply */}
        <div className="rounded-2xl p-5 border border-violet-500/30" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(99,102,241,0.18) 100%)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs">✨</div>
              <p className="text-sm font-bold text-violet-300">AI Draft Reply</p>
            </div>
            <button
              onClick={copyReply}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-white border border-violet-500/40 hover:border-violet-400'
              }`}
              style={copied ? {} : { background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              {copied ? '✓ Copied!' : 'Copy Reply'}
            </button>
          </div>
          <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
            {email.draft_reply || 'No reply drafted.'}
          </p>
        </div>

      </div>
    </div>
  )
}
