import type { Severity, IncidentStatus } from '../../types'
import clsx from 'clsx'

export function severityBadgeClass(severity: Severity): string {
  switch (severity) {
    case 'critical': return 'badge-critical'
    case 'high': return 'badge-high'
    case 'medium': return 'badge-medium'
    case 'low': return 'badge-low'
    default: return 'badge-low'
  }
}

export function statusBadgeClass(status: IncidentStatus): string {
  switch (status) {
    case 'active': return 'bg-red-500/15 text-red-400 border border-red-500/30'
    case 'responding': return 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
    case 'investigating': return 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30'
    case 'resolved': return 'bg-green-500/15 text-green-400 border border-green-500/30'
    case 'escalated': return 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
    default: return 'bg-navy-500/15 text-navy-300 border border-navy-500/30'
  }
}

export function severityDotClass(severity: Severity): string {
  return clsx('severity-dot', severity)
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
