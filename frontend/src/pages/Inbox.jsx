import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getEmails } from '../api/client'
import EmailCard from '../components/EmailCard'
import Navbar from '../components/Navbar'

const CATEGORIES = ['All', 'Urgent', 'Work', 'Personal', 'Newsletter', 'Finance', 'Social', 'Spam']

const STAT_COLORS = [
  { glow: 'rgba(99,102,241,0.5)',  bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.3)',  dot: '#818cf8' },
  { glow: 'rgba(239,68,68,0.5)',   bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   dot: '#f87171' },
  { glow: 'rgba(59,130,246,0.5)',  bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.3)',  dot: '#60a5fa' },
  { glow: 'rgba(16,185,129,0.5)',  bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  dot: '#34d399' },
]

export default function Inbox() {
  const [params] = useSearchParams()
  const sessionId = params.get('session') || 'default'
  const provider = params.get('provider') || 'gmail'

  const [emails, setEmails] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [error, setError] = useState(null)

  useEffect(() => {
    getEmails(sessionId, provider)
      .then(setEmails)
      .catch(() => setError('Failed to load emails. Please reconnect.'))
      .finally(() => setLoading(false))
  }, [sessionId, provider])

  const filtered = filter === 'All'
    ? emails
    : filter === 'Urgent'
    ? emails.filter((e) => e.urgent)
    : emails.filter((e) => e.category === filter)

  const urgentCount = emails.filter((e) => e.urgent).length

  const stats = [
    { label: 'Total',    value: emails.length },
    { label: 'Urgent',   value: urgentCount },
    { label: 'Work',     value: emails.filter(e => e.category === 'Work').length },
    { label: 'Personal', value: emails.filter(e => e.category === 'Personal').length },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
    }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '-150px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', left: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Navbar emailCount={emails.length} provider={provider} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '28px 20px', position: 'relative', zIndex: 1 }}>

        {/* Stats */}
        {!loading && emails.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                background: STAT_COLORS[i].bg,
                border: `1px solid ${STAT_COLORS[i].border}`,
                borderRadius: '14px',
                padding: '16px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: STAT_COLORS[i].dot,
                  boxShadow: `0 0 8px ${STAT_COLORS[i].dot}`,
                  margin: '0 auto 8px',
                }} />
                <p style={{ fontSize: '30px', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '6px 0 0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? emails.length
              : cat === 'Urgent' ? emails.filter(e => e.urgent).length
              : emails.filter(e => e.category === cat).length
            if (count === 0 && cat !== 'All') return null
            const active = filter === cat
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontSize: '12px', fontWeight: 600,
                  padding: '6px 14px', borderRadius: '999px',
                  border: active ? '1px solid rgba(99,102,241,0.8)' : '1px solid rgba(255,255,255,0.1)',
                  background: active ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.04)',
                  color: active ? '#a5b4fc' : '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.15s',
                  boxShadow: active ? '0 0 12px rgba(99,102,241,0.2)' : 'none',
                }}
              >
                {cat}
                <span style={{
                  fontSize: '10px', fontWeight: 700,
                  background: active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                  color: active ? '#fff' : '#64748b',
                  borderRadius: '999px', padding: '1px 7px',
                }}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', margin: '0 auto 20px' }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid rgba(99,102,241,0.15)',
              }} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                borderTop: '2px solid #818cf8', animation: 'spin 0.8s linear infinite',
              }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>🧠</div>
            </div>
            <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '17px', margin: '0 0 6px' }}>AI is processing your emails</p>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Categorizing · Flagging · Drafting replies</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '16px', textAlign: 'center', color: '#fca5a5', fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {/* Email list */}
        {!loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#475569' }}>
                <p style={{ fontSize: '40px', margin: '0 0 12px' }}>📭</p>
                <p style={{ fontSize: '14px', margin: 0 }}>No emails in this category</p>
              </div>
            ) : (
              filtered.map((email) => (
                <EmailCard key={email.id} email={email} sessionId={sessionId} />
              ))
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
