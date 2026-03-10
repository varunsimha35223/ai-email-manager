import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Navbar({ emailCount, provider }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const sessionId = params.get('session') || 'default'
  const prov = provider || params.get('provider') || 'gmail'

  const providerIcon = prov === 'gmail'
    ? 'https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png'
    : 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg'

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">✦</span>
            <span className="font-bold text-white text-lg tracking-tight">AI Mail</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-gray-800/60 border border-gray-700/60 rounded-full px-2.5 py-1">
            <img src={providerIcon} className="w-3.5 h-3.5" alt={prov} />
            <span className="text-xs text-gray-400 capitalize">{prov}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
          {emailCount > 0 && (
            <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full">
              {emailCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(`/summary?session=${sessionId}`)}
            className="text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition flex items-center gap-1.5"
          >
            <span>📋</span>
            <span className="hidden sm:inline">Summary</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition"
          >
            Disconnect
          </button>
        </div>
      </div>
    </header>
  )
}
