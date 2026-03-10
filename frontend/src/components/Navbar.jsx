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
    <header className="sticky top-0 z-50 border-b border-white/5" style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-violet-500/30">
              ✦
            </div>
            <span className="font-black text-white text-lg tracking-tight">AI Mail</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 border border-white/10" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <img src={providerIcon} className="w-3.5 h-3.5" alt={prov} />
            <span className="text-xs text-white capitalize">{prov}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          {emailCount > 0 && (
            <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-semibold">
              {emailCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(`/summary?session=${sessionId}`)}
            className="text-sm text-white hover:text-white px-3 py-1.5 rounded-xl hover:bg-white/5 transition flex items-center gap-1.5"
          >
            <span>📋</span>
            <span className="hidden sm:inline">Summary</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-white hover:text-red-400 px-3 py-1.5 rounded-xl hover:bg-red-500/10 transition"
          >
            Disconnect
          </button>
        </div>
      </div>
    </header>
  )
}
