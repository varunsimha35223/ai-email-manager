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
    <div className="min-h-screen bg-gray-950">
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white transition p-1 rounded-lg hover:bg-gray-800">
            ← Back
          </button>
          <span className="text-gray-600">|</span>
          <span className="text-white font-medium">Daily Summary</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl">
            📋
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Digest</h1>
            <p className="text-gray-500 text-sm">AI-generated summary of your inbox</p>
          </div>
        </div>

        {loading && (
          <div className="text-center py-24">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
            </div>
            <p className="text-white font-semibold">Generating your digest...</p>
            <p className="text-gray-500 text-sm mt-1">Reading and summarizing all emails</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}
