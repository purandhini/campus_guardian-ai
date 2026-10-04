import { AlertTriangle, ShieldAlert, Search, CheckCircle2 } from 'lucide-react'
import { dashboardStats } from '../../data/mockData'

const cards = [
  { label: 'Active Incidents', value: dashboardStats.activeIncidents, icon: ShieldAlert, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  { label: 'Critical Incidents', value: dashboardStats.criticalIncidents, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', pulse: true },
  { label: 'Under Investigation', value: dashboardStats.underInvestigation, icon: Search, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  { label: 'Resolved Today', value: dashboardStats.resolvedToday, icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`card ${c.border} p-5 ${c.pulse ? 'glow-critical' : ''}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-navy-400 font-medium uppercase tracking-wide">{c.label}</p>
              <p className={`text-3xl font-bold mt-2 ${c.color}`}>
                {String(c.value).padStart(2, '0')}
              </p>
            </div>
            <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center`}>
              <c.icon className={c.color} size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
