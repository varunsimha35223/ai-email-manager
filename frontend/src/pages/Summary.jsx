import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getSummary } from '../api/client'

export default function Summary() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = params.get('session') || 'default'

  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getSummary(sessionId)
      .then(setSummary)
      .catch(() => setError('Failed to generate summary.'))
      .finally(() => setLoading(false))
  }, [sessionId])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1f 50%, #0a0a14 100%)' }}>

      {/* Ambient orbs */}
      <div className="fixed top-[-200px] right-[-100px] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white transition px-2 py-1 rounded-lg hover:bg-white/5 text-sm">
            ← Back
          </button>
          <span className="text-slate-500">|</span>
          <span className="text-white font-medium text-sm">Daily Summary</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-violet-500/25">
            📋
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Digest</h1>
            <p className="text-white text-sm mt-0.5">AI-generated summary of your inbox</p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
            </div>
            <p className="text-white font-semibold">Generating your digest...</p>
            <p className="text-white text-sm mt-1">Reading and summarizing all emails</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl p-5 border border-red-500/30" style={{ background: 'rgba(239,68,68,0.08)' }}>
            <p className="text-red-400 text-center text-sm">{error}</p>
          </div>
        )}

        {/* Summary content */}
        {!loading && !error && (
          <div
            className="rounded-2xl p-6 border border-violet-500/20"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(99,102,241,0.18) 100%)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs">✨</div>
              <p className="text-sm font-bold text-violet-300">AI Summary</p>
            </div>
            <p className="text-white whitespace-pre-wrap text-sm leading-relaxed">{summary}</p>
          </div>
        )}

      </div>
    </div>
  )
}
