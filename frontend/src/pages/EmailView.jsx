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
    <div className="min-h-screen bg-gray-950">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-800">
            ← Back
          </button>
          <span className="text-gray-600">|</span>
          <span className="text-white font-medium truncate">{email.subject}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Email meta */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {email.sender?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <CategoryBadge category={email.category} />
                {email.urgent && (
                  <span className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                    ⚡ Urgent
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-white mb-1">{email.subject}</h1>
              <p className="text-sm text-gray-400">{email.sender}</p>
              <p className="text-xs text-gray-600 mt-0.5">{new Date(email.date).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Message</p>
          <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{email.body || 'No content available.'}</p>
        </div>

        {/* AI Reply */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <p className="text-sm font-semibold text-indigo-300">AI Draft Reply</p>
            </div>
            <button
              onClick={copyReply}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Reply'}
            </button>
          </div>
          <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {email.draft_reply || 'No reply drafted.'}
          </p>
        </div>

      </div>
    </div>
  )
}
