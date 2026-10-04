import { ShieldAlert, Users, Clock, ArrowUpCircle, CheckCircle2, Radio } from 'lucide-react'
import { mockIncidents } from '../data/mockData'
import { severityBadgeClass, statusBadgeClass } from '../components/common/Badges'
import type { Severity } from '../types'

const activeResponses = [
  {
    id: 'CG-2026-001',
    title: 'Electrical Fire / Smoke Hazard',
    location: 'Academic Block',
    severity: 'critical' as Severity,
    team: 'Campus Security + Electrical Maintenance',
    eta: '< 5 min',
    status: 'responding',
    actionsTaken: ['Security team notified', 'Evacuation started', 'Electrical supply isolated'],
  },
  {
    id: 'CG-2026-007',
    title: 'Medical Emergency',
    location: 'Sports Ground',
    severity: 'high' as Severity,
    team: 'Campus Medical Team + Security',
    eta: '< 10 min',
    status: 'responding',
    actionsTaken: ['Medical team dispatched', 'Security on scene'],
  },
]

export default function ResponseCenterPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Response Center</h1>
        <p className="text-navy-400 text-sm mt-1">Active response operations and team coordination</p>
      </div>

      {/* Active responses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeResponses.map((r) => (
          <div key={r.id} className={`card p-5 ${r.severity === 'critical' ? 'glow-critical' : ''}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="text-green-400 animate-pulse" size={16} />
                  <span className="text-xs text-green-400 font-semibold uppercase tracking-wide">Live Response</span>
                </div>
                <h3 className="font-bold text-white">{r.title}</h3>
                <p className="text-xs text-navy-500 mt-0.5">{r.id} · {r.location}</p>
              </div>
              <span className={severityBadgeClass(r.severity)}>{r.severity}</span>
            </div>

            {/* Team info */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-navy-950 rounded-lg p-3 border border-navy-800">
                <Users className="text-navy-400 mb-1" size={14} />
                <p className="text-xs text-navy-500">Team</p>
                <p className="text-xs text-white font-medium mt-0.5">{r.team}</p>
              </div>
              <div className="bg-navy-950 rounded-lg p-3 border border-navy-800">
                <Clock className="text-navy-400 mb-1" size={14} />
                <p className="text-xs text-navy-500">ETA</p>
                <p className="text-xs text-white font-medium mt-0.5">{r.eta}</p>
              </div>
              <div className="bg-navy-950 rounded-lg p-3 border border-navy-800">
                <ArrowUpCircle className="text-navy-400 mb-1" size={14} />
                <p className="text-xs text-navy-500">Status</p>
                <span className={`badge text-xs mt-0.5 ${statusBadgeClass(r.status as any)}`}>{r.status}</span>
              </div>
            </div>

            {/* Actions taken */}
            <div>
              <p className="text-xs text-navy-500 mb-2">Actions Taken</p>
              <div className="space-y-2">
                {r.actionsTaken.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-navy-200">
                    <CheckCircle2 className="text-green-400" size={16} />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent resolved */}
      <div className="card p-5">
        <h3 className="font-semibold text-white text-sm mb-4">Recent Resolved Incidents</h3>
        <div className="space-y-3">
          {mockIncidents.filter((i) => i.status === 'resolved').map((inc) => (
            <div key={inc.id} className="flex items-center gap-3 p-3 bg-navy-950 rounded-lg border border-navy-800">
              <CheckCircle2 className="text-green-400" size={18} />
              <div className="flex-1">
                <p className="text-sm text-white">{inc.description}</p>
                <p className="text-xs text-navy-500">{inc.id} · {inc.location} · {inc.time}</p>
              </div>
              <span className={severityBadgeClass(inc.severity as Severity)}>{inc.severity}</span>
              <span className={`badge text-xs ${statusBadgeClass(inc.status)}`}>resolved</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
