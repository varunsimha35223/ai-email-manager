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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-gray-300">Email not found.</p>
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
    <div className="min-h-screen bg-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white transition px-2 py-1 rounded-lg hover:bg-gray-700 text-sm">
            ← Back
          </button>
          <span className="text-gray-600">|</span>
          <span className="text-white font-medium truncate text-sm">{email.subject}</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* Email meta */}
        <div className="rounded-2xl p-5 bg-gray-800 border border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {email.sender?.[0]?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <CategoryBadge category={email.category} />
                {email.urgent && (
                  <span className="text-xs font-bold text-red-300 bg-red-900/60 border border-red-700 px-2 py-0.5 rounded-full">
                    ⚡ Urgent
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-white mb-1">{email.subject}</h1>
              <p className="text-sm text-gray-300">{email.sender}</p>
              <p className="text-xs text-gray-400 mt-0.5">{new Date(email.date).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="rounded-2xl p-5 bg-gray-800 border border-gray-700">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Message</p>
          <p className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{email.body || 'No content available.'}</p>
        </div>

        {/* AI Reply */}
        <div className="rounded-2xl p-5 bg-indigo-950 border border-indigo-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs">✨</div>
              <p className="text-sm font-bold text-indigo-300">AI Draft Reply</p>
            </div>
            <button
              onClick={copyReply}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                copied
                  ? 'bg-emerald-800 text-emerald-300 border border-emerald-600'
                  : 'bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-500'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy Reply'}
            </button>
          </div>
          <p className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
            {email.draft_reply || 'No reply drafted.'}
          </p>
        </div>

      </div>
    </div>
  )
}
