const colors = {
  Urgent:     'bg-red-500/20 text-red-400 border-red-500/30',
  Work:       'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Newsletter: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Personal:   'bg-green-500/20 text-green-400 border-green-500/30',
  Spam:       'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Finance:    'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Social:     'bg-pink-500/20 text-pink-400 border-pink-500/30',
}

export default function CategoryBadge({ category }) {
  const cls = colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>
      {category}
    </span>
  )
}
