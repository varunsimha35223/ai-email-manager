import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getEmails } from '../api/client'
import EmailCard from '../components/EmailCard'
import Navbar from '../components/Navbar'

const CATEGORIES = ['All', 'Urgent', 'Work', 'Personal', 'Newsletter', 'Finance', 'Social', 'Spam']

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

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1f 50%, #0a0a14 100%)' }}>
      <Navbar emailCount={emails.length} provider={provider} />

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Stats bar */}
        {!loading && emails.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total',    value: emails.length,                                      from: 'from-indigo-600',  to: 'to-violet-600',  shadow: 'shadow-indigo-500/20' },
              { label: 'Urgent',   value: urgentCount,                                        from: 'from-red-500',     to: 'to-rose-600',    shadow: 'shadow-red-500/20' },
              { label: 'Work',     value: emails.filter(e => e.category === 'Work').length,   from: 'from-blue-500',    to: 'to-cyan-600',    shadow: 'shadow-blue-500/20' },
              { label: 'Personal', value: emails.filter(e => e.category === 'Personal').length, from: 'from-emerald-500', to: 'to-teal-600', shadow: 'shadow-emerald-500/20' },
            ].map((s) => (
              <div key={s.label} className={`relative overflow-hidden rounded-2xl p-4 text-center shadow-lg ${s.shadow} border border-white/10`}
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${s.from} ${s.to} opacity-10`} />
                <p className="text-3xl font-black text-white relative z-10">{s.value}</p>
                <p className="text-xs text-slate-300 mt-0.5 relative z-10 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-5">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? emails.length
              : cat === 'Urgent' ? emails.filter(e => e.urgent).length
              : emails.filter(e => e.category === cat).length
            if (count === 0 && cat !== 'All') return null
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all flex items-center gap-1.5 ${
                  filter === cat
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'border-white/15 text-slate-400 hover:border-violet-500/50 hover:text-white'
                }`}
              >
                {cat}
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    filter === cat ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
              <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
            </div>
            <p className="text-white font-semibold text-lg">AI is processing your emails</p>
            <p className="text-slate-400 text-sm mt-1">Categorizing · Flagging · Drafting replies</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 text-center">
            {error}
          </div>
        )}

        {/* Email list */}
        {!loading && !error && (
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-4xl mb-3">📭</p>
                <p>No emails in this category</p>
              </div>
            ) : (
              filtered.map((email) => (
                <EmailCard key={email.id} email={email} sessionId={sessionId} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
