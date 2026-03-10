const config = {
  Urgent:     { bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.4)',   color: '#fca5a5', icon: '⚡' },
  Work:       { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.4)',  color: '#93c5fd', icon: '💼' },
  Newsletter: { bg: 'rgba(234,179,8,0.15)',   border: 'rgba(234,179,8,0.4)',   color: '#fde047', icon: '📰' },
  Personal:   { bg: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.4)',   color: '#86efac', icon: '👤' },
  Spam:       { bg: 'rgba(107,114,128,0.15)', border: 'rgba(107,114,128,0.4)', color: '#d1d5db', icon: '🗑' },
  Finance:    { bg: 'rgba(168,85,247,0.15)',  border: 'rgba(168,85,247,0.4)',  color: '#d8b4fe', icon: '💰' },
  Social:     { bg: 'rgba(236,72,153,0.15)',  border: 'rgba(236,72,153,0.4)',  color: '#f9a8d4', icon: '🌐' },
}

export default function CategoryBadge({ category }) {
  const cfg = config[category] || { bg: 'rgba(107,114,128,0.15)', border: 'rgba(107,114,128,0.4)', color: '#d1d5db', icon: '📧' }
  return (
    <span style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      color: cfg.color,
      borderRadius: '999px',
      padding: '2px 10px',
      fontSize: '11px',
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <span style={{ fontSize: '10px' }}>{cfg.icon}</span>{category}
    </span>
  )
}
