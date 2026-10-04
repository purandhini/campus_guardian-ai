import { useState, useMemo } from 'react'
import { incidentHistory } from '../data/mockData'
import type { Severity } from '../types'
import { severityBadgeClass } from '../components/common/Badges'
import { Search, Filter, ChevronRight } from 'lucide-react'

type Status = 'Responding' | 'Resolved' | 'Investigating'

const statusColors: Record<Status, string> = {
  Responding: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
  Resolved: 'bg-green-500/15 text-green-400 border border-green-500/30',
  Investigating: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
}

export default function IncidentHistoryPage() {
  const [severityFilter, setSeverityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return incidentHistory.filter((inc) => {
      if (severityFilter && inc.severity !== severityFilter) return false
      if (statusFilter && inc.status !== statusFilter) return false
      if (typeFilter && !inc.type.toLowerCase().includes(typeFilter.toLowerCase())) return false
      if (locationFilter && inc.location !== locationFilter) return false
      if (search && !inc.id.toLowerCase().includes(search.toLowerCase()) && !inc.type.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [severityFilter, statusFilter, typeFilter, locationFilter, search])

  const types = [...new Set(incidentHistory.map((i) => i.type))]
  const locations = [...new Set(incidentHistory.map((i) => i.location))]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Incident History</h1>
        <p className="text-navy-400 text-sm mt-1">All recorded campus incidents with AI analysis data</p>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-navy-400" />
          <span className="text-sm font-medium text-navy-200">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-sm"
          />
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="input-field text-sm cursor-pointer">
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-field text-sm cursor-pointer">
            <option value="">All Statuses</option>
            <option value="Responding">Responding</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="input-field text-sm cursor-pointer">
            <option value="">All Types</option>
            {types.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="input-field text-sm cursor-pointer">
            <option value="">All Locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
          <button
            onClick={() => { setSeverityFilter(''); setStatusFilter(''); setTypeFilter(''); setLocationFilter(''); setSearch('') }}
            className="btn-ghost text-sm"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-800 text-xs text-navy-500 uppercase tracking-wide">
                <th className="text-left px-4 py-3 font-medium">Incident ID</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
                <th className="text-left px-4 py-3 font-medium">Location</th>
                <th className="text-left px-4 py-3 font-medium">Severity</th>
                <th className="text-left px-4 py-3 font-medium">AI Confidence</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/60">
              {filtered.map((inc) => (
                <tr key={inc.id} className="hover:bg-navy-800/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-mono text-white">{inc.id}</td>
                  <td className="px-4 py-3 text-sm text-navy-200">{inc.type}</td>
                  <td className="px-4 py-3 text-sm text-navy-300">{inc.location}</td>
                  <td className="px-4 py-3">
                    <span className={severityBadgeClass(inc.severity as Severity)}>{inc.severity}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-navy-950 rounded-full overflow-hidden">
                        <div className="h-full bg-navy-500 rounded-full" style={{ width: `${inc.aiConfidence}%` }} />
                      </div>
                      <span className="text-xs text-navy-300">{inc.aiConfidence}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge text-xs ${statusColors[inc.status as Status]}`}>{inc.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-400">{inc.date}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-navy-400 hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-navy-500 text-sm">
            <Search className="mx-auto mb-2 text-navy-600" size={24} />
            No incidents match your filters
          </div>
        )}
      </div>

      <p className="text-xs text-navy-500 text-center">
        Showing {filtered.length} of {incidentHistory.length} incidents
      </p>
    </div>
  )
}
