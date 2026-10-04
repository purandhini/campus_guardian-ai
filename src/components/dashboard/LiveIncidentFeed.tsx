import { mockIncidents } from '../../data/mockData'
import { severityBadgeClass, statusBadgeClass } from '../common/Badges'
import type { Severity } from '../../types'
import { ChevronRight } from 'lucide-react'

export default function LiveIncidentFeed() {
  const rows = mockIncidents.slice(0, 5)

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h3 className="font-semibold text-white text-sm">Live Incident Feed</h3>
        </div>
        <span className="text-xs text-navy-500">{rows.length} active</span>
      </div>

      <div className="divide-y divide-navy-800/60">
        {rows.map((inc) => (
          <div
            key={inc.id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-navy-800/30 cursor-pointer transition-colors"
          >
            {/* Severity dot */}
            <span className={`severity-dot ${inc.severity}`} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-white truncate">{inc.description}</span>
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-xs text-navy-500">{inc.id}</span>
                <span className="text-xs text-navy-500">·</span>
                <span className="text-xs text-navy-400">{inc.location}</span>
                <span className="text-xs text-navy-500">·</span>
                <span className="text-xs text-navy-500">{inc.time}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
              <span className={severityBadgeClass(inc.severity as Severity)}>
                {inc.severity}
              </span>
              <span className={`badge ${statusBadgeClass(inc.status)}`}>
                {inc.status}
              </span>
            </div>

            <ChevronRight className="text-navy-600" size={16} />
          </div>
        ))}
      </div>
    </div>
  )
}
