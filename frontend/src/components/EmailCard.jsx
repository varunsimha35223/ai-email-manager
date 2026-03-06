import { useNavigate } from 'react-router-dom'
import CategoryBadge from './CategoryBadge'

export default function EmailCard({ email, sessionId }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/email/${email.id}`, { state: { email, sessionId } })}
      className="group cursor-pointer bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-indigo-500/50 hover:bg-gray-800/80 transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {email.sender?.[0]?.toUpperCase() || '?'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm text-gray-400 truncate">{email.sender}</p>
            <p className="text-xs text-gray-600 whitespace-nowrap">
              {new Date(email.date).toLocaleDateString()}
            </p>
          </div>

          <p className="font-semibold text-white truncate mb-1.5">{email.subject}</p>

          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge category={email.category} />
            {email.urgent && (
              <span className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full animate-pulse">
                ⚡ Urgent
              </span>
            )}
            <span className="text-xs text-gray-600 truncate hidden sm:block">
              {email.body?.slice(0, 60)}...
            </span>
          </div>
        </div>

        <span className="text-gray-700 group-hover:text-gray-400 transition text-lg shrink-0">›</span>
      </div>
    </div>
  )
}
