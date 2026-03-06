import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Navbar({ emailCount }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const sessionId = params.get('session') || 'default'

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">✉️</span>
          <span className="font-bold text-white text-lg">AI Mail</span>
          {emailCount > 0 && (
            <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
              {emailCount} emails
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/summary?session=${sessionId}`)}
            className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
          >
            📋 Summary
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
          >
            Disconnect
          </button>
        </div>
      </div>
    </header>
  )
}
