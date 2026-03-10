const config = {
  Urgent:     { cls: 'bg-red-500/20 text-red-400 border-red-500/30',     icon: '⚡' },
  Work:       { cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30',   icon: '💼' },
  Newsletter: { cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '📰' },
  Personal:   { cls: 'bg-green-500/20 text-green-400 border-green-500/30', icon: '👤' },
  Spam:       { cls: 'bg-gray-500/20 text-gray-400 border-gray-500/30',   icon: '🗑' },
  Finance:    { cls: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: '💰' },
  Social:     { cls: 'bg-pink-500/20 text-pink-400 border-pink-500/30',   icon: '🌐' },
}

export default function CategoryBadge({ category }) {
  const { cls, icon } = config[category] || { cls: 'bg-gray-500/20 text-gray-400 border-gray-500/30', icon: '📧' }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium inline-flex items-center gap-1 ${cls}`}>
      <span className="text-[10px]">{icon}</span>{category}
    </span>
  )
}
