import { useNavigate, useSearchParams } from 'react-router-dom'

const S = {
  header: {
    position: 'sticky', top: 0, zIndex: 50,
    background: 'rgba(8,8,16,0.9)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  inner: {
    maxWidth: '860px', margin: '0 auto', padding: '0 20px',
    height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  left: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: {
    width: '30px', height: '30px', borderRadius: '8px',
    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: '13px', fontWeight: 900,
    boxShadow: '0 0 16px rgba(124,58,237,0.4)',
  },
  logoText: { fontSize: '17px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' },
  providerPill: {
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '999px', padding: '4px 12px',
  },
  providerText: { fontSize: '12px', color: '#cbd5e1', textTransform: 'capitalize' },
  dot: { width: '7px', height: '7px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d399' },
  countBadge: {
    fontSize: '11px', fontWeight: 700,
    background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)',
    color: '#a5b4fc', borderRadius: '999px', padding: '2px 10px',
  },
  right: { display: 'flex', alignItems: 'center', gap: '4px' },
  summaryBtn: {
    fontSize: '13px', color: '#94a3b8', background: 'transparent', border: 'none',
    padding: '6px 12px', borderRadius: '10px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500,
  },
  disconnectBtn: {
    fontSize: '13px', color: '#94a3b8', background: 'transparent', border: 'none',
    padding: '6px 12px', borderRadius: '10px', cursor: 'pointer', fontWeight: 500,
  },
}

export default function Navbar({ emailCount, provider }) {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const sessionId = params.get('session') || 'default'
  const prov = provider || params.get('provider') || 'gmail'

  const providerIcon = prov === 'gmail'
    ? 'https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png'
    : 'https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg'

  return (
    <header style={S.header}>
      <div style={S.inner}>
        <div style={S.left}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={S.logoIcon}>✦</div>
            <span style={S.logoText}>AI Mail</span>
          </div>
          <div style={S.providerPill}>
            <img src={providerIcon} style={{ width: '14px', height: '14px' }} alt={prov} />
            <span style={S.providerText}>{prov}</span>
            <span style={S.dot} />
          </div>
          {emailCount > 0 && <span style={S.countBadge}>{emailCount}</span>}
        </div>

        <div style={S.right}>
          <button
            onClick={() => navigate(`/summary?session=${sessionId}`)}
            style={S.summaryBtn}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            📋 <span>Summary</span>
          </button>
          <button
            onClick={() => navigate('/')}
            style={S.disconnectBtn}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#fca5a5' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8' }}
          >
            Disconnect
          </button>
        </div>
      </div>
    </header>
  )
}
