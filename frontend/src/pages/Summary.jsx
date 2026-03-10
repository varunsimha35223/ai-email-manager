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
    <div className="min-h-screen bg-gray-900">

      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-white transition px-2 py-1 rounded-lg hover:bg-gray-700 text-sm">
            ← Back
          </button>
          <span className="text-gray-600">|</span>
          <span className="text-white font-medium text-sm">Daily Summary</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl">
            📋
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Digest</h1>
            <p className="text-gray-400 text-sm mt-0.5">AI-generated summary of your inbox</p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-900" />
              <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
            </div>
            <p className="text-white font-semibold">Generating your digest...</p>
            <p className="text-gray-400 text-sm mt-1">Reading and summarizing all emails</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl p-5 bg-red-900/50 border border-red-700">
            <p className="text-red-300 text-center text-sm">{error}</p>
          </div>
        )}

        {/* Summary content */}
        {!loading && !error && (
          <div className="rounded-2xl p-6 bg-indigo-950 border border-indigo-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs">✨</div>
              <p className="text-sm font-bold text-indigo-300">AI Summary</p>
            </div>
            <p className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">{summary}</p>
          </div>
        )}

      </div>
    </div>
  )
}
