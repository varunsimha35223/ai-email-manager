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

const avatarGradients = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
]

function avatarColor(sender) {
  const code = (sender || '').charCodeAt(0) || 0
  return avatarGradients[code % avatarGradients.length]
}

export default function EmailCard({ email, sessionId }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/email/${email.id}`, { state: { email, sessionId } })}
      className="group cursor-pointer rounded-2xl p-4 transition-all duration-200 bg-gray-800 border border-gray-700 hover:border-indigo-500 hover:bg-gray-750"
    >
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${avatarColor(email.sender)} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
          {senderInitial(email.sender)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className="text-sm font-semibold text-white truncate">{senderName(email.sender)}</p>
            <p className="text-xs text-gray-400 whitespace-nowrap shrink-0">{relativeTime(email.date)}</p>
          </div>

          <p className="text-sm text-gray-200 truncate mb-2">{email.subject}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={email.category} />
            {email.urgent && (
              <span className="text-xs font-bold text-red-300 bg-red-900/60 border border-red-700 px-2 py-0.5 rounded-full">
                ⚡ Urgent
              </span>
            )}
            {email.body && (
              <span className="text-xs text-gray-500 truncate hidden sm:block max-w-[200px]">
                {email.body.replace(/\s+/g, ' ').slice(0, 70)}…
              </span>
            )}
          </div>
        </div>

        <span className="text-gray-500 group-hover:text-indigo-400 transition-colors text-xl shrink-0 mt-1">›</span>
      </div>
    </div>
  )
}
