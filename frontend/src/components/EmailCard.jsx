import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'

function relativeTime(dateStr) {
  const date = new Date(dateStr)
  if (isNaN(date)) return ''
  const diff = Date.now() - date
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function senderName(sender) {
  if (!sender) return 'Unknown'
  const match = sender.match(/^([^<]+)</)
  return match ? match[1].trim() : sender.replace(/<.*>/, '').trim()
}

function senderInitial(sender) {
  const name = senderName(sender)
  return name[0]?.toUpperCase() || '?'
}

const avatarColors = [
  { from: '#6366f1', to: '#8b5cf6' },
  { from: '#3b82f6', to: '#06b6d4' },
  { from: '#f43f5e', to: '#ec4899' },
  { from: '#f59e0b', to: '#f97316' },
  { from: '#10b981', to: '#14b8a6' },
]

function avatarGradient(sender) {
  const code = (sender || '').charCodeAt(0) || 0
  const c = avatarColors[code % avatarColors.length]
  return `linear-gradient(135deg, ${c.from}, ${c.to})`
}

export default function EmailCard({ email, sessionId }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate(`/email/${email.id}`, { state: { email, sessionId } })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '14px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
        background: avatarGradient(email.sender),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: '15px', fontWeight: 800,
        boxShadow: hovered ? '0 0 16px rgba(99,102,241,0.3)' : 'none',
      }}>
        {senderInitial(email.sender)}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#f1f5f9', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {senderName(email.sender)}
          </p>
          <p style={{ fontSize: '11px', color: '#64748b', flexShrink: 0, margin: 0 }}>
            {relativeTime(email.date)}
          </p>
        </div>

        <p style={{ fontSize: '13px', color: '#cbd5e1', margin: '0 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {email.subject}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <CategoryBadge category={email.category} />
          {email.urgent && (
            <span style={{
              fontSize: '11px', fontWeight: 700, color: '#fca5a5',
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '999px', padding: '2px 10px',
            }}>
              ⚡ Urgent
            </span>
          )}
          {email.body && (
            <span style={{ fontSize: '11px', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
              {email.body.replace(/\s+/g, ' ').slice(0, 70)}…
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <span style={{ color: hovered ? '#818cf8' : '#334155', fontSize: '20px', flexShrink: 0, marginTop: '2px', transition: 'color 0.18s' }}>›</span>
    </div>
  )
}
