import { useState } from 'react'
import { getAuthUrl } from '../api/client'

export default function Home() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const connect = async (provider) => {
    setLoading(provider)
    setError(null)
    try {
      const url = await getAuthUrl(provider)
      window.location.href = url
    } catch (e) {
      setError('Could not connect. The server may be waking up — please try again in 30 seconds.')
      setLoading(null)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div style={{ maxWidth: '560px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Top badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '999px', padding: '6px 16px', marginBottom: '40px',
          fontSize: '12px', color: '#a5b4fc', fontWeight: 500,
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#818cf8',
            boxShadow: '0 0 6px #818cf8',
            display: 'inline-block',
            animation: 'pulse 2s infinite',
          }} />
          Powered by Groq · Llama 3.3 · Free to use
        </div>

        {/* Main heading */}
        <h1 style={{ margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          <span style={{
            display: 'block', fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: 900, color: '#ffffff',
          }}>
            Your Inbox,
          </span>
          <span style={{
            display: 'block', fontSize: 'clamp(48px, 8vw, 72px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 40%, #f472b6 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Managed by AI
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '18px', color: '#94a3b8',
          lineHeight: 1.7, margin: '0 0 44px',
        }}>
          Connect Gmail or Outlook. AI categorizes your emails,
          flags urgent ones, and drafts replies — instantly.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '48px' }}>
          {[
            { label: 'Auto Categorize', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', color: '#93c5fd' },
            { label: 'Flag Urgent',     bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  color: '#fca5a5' },
            { label: 'Draft Replies',   bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', color: '#c4b5fd' },
            { label: 'Daily Summary',   bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#6ee7b7' },
          ].map((f) => (
            <span key={f.label} style={{
              background: f.bg, border: `1px solid ${f.border}`,
              borderRadius: '999px', padding: '6px 14px',
              fontSize: '12px', fontWeight: 600, color: f.color,
              letterSpacing: '0.02em',
            }}>
              ✦ {f.label}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Gmail */}
          <button
            onClick={() => connect('gmail')}
            disabled={!!loading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              background: '#ffffff', color: '#111827',
              border: 'none', borderRadius: '14px',
              padding: '16px 24px', fontSize: '16px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'transform 0.15s, opacity 0.15s',
              boxShadow: '0 0 40px rgba(255,255,255,0.08)',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_32dp.png" style={{ width: '20px', height: '20px' }} alt="Gmail" />
            {loading === 'gmail' ? 'Connecting... (may take 30s)' : 'Continue with Gmail'}
          </button>

          {/* Outlook */}
          <button
            onClick={() => connect('outlook')}
            disabled={!!loading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              border: '1px solid rgba(99,162,255,0.3)',
              borderRadius: '14px',
              padding: '16px 24px', fontSize: '16px', fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'transform 0.15s, opacity 0.15s',
              boxShadow: '0 0 40px rgba(37,99,235,0.25)',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" style={{ width: '20px', height: '20px' }} alt="Outlook" />
            {loading === 'outlook' ? 'Connecting...' : 'Continue with Outlook'}
          </button>
        </div>

        {error && (
          <p style={{
            marginTop: '16px', fontSize: '14px', color: '#fca5a5',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '12px', padding: '12px 16px',
          }}>
            {error}
          </p>
        )}

        {/* Footer note */}
        <p style={{ marginTop: '32px', fontSize: '12px', color: '#475569' }}>
          🔒 Read-only access · No emails stored on servers · Open source
        </p>

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}
