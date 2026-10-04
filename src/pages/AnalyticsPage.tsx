import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from 'recharts'
import { incidentsByType, incidentsBySeverity, responseTimeData, aiPerformance } from '../data/mockData'
import { BrainCircuit, Gauge, FileStack, Timer } from 'lucide-react'

const SEVERITY_COLORS = ['#ef4444', '#f97316', '#eab308', '#3b82f6']
const TYPE_COLORS = ['#5b6bf4', '#a4b8fc', '#8093f8', '#4c4df0', '#3f3dd4']

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-navy-400 text-sm mt-1">Campus incident statistics and AI performance metrics</p>
      </div>

      {/* AI Performance cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Evidence Processed', value: aiPerformance.evidenceProcessed, icon: FileStack, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Average Confidence', value: `${aiPerformance.averageConfidence}%`, icon: Gauge, color: 'text-green-400', bg: 'bg-green-500/10' },
          { label: 'Incidents Analyzed', value: aiPerformance.incidentsAnalyzed, icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Avg Recommendation Time', value: `${aiPerformance.averageRecommendationTime}s`, icon: Timer, color: 'text-orange-400', bg: 'bg-orange-500/10' },
        ].map((c) => (
          <div key={c.label} className="card p-5">
            <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-3`}>
              <c.icon className={c.color} size={20} />
            </div>
            <p className="text-2xl font-bold text-white">{c.value}</p>
            <p className="text-xs text-navy-400 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Incidents by Type */}
        <div className="card p-5">
          <h3 className="font-semibold text-white text-sm mb-4">Incidents by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incidentsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1f5c" />
              <XAxis dataKey="name" stroke="#8093f8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#8093f8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0a0b2e', border: '1px solid #3334a8', borderRadius: '8px' }}
                labelStyle={{ color: '#a4b8fc' }}
              />
              <Bar dataKey="count" fill="#5b6bf4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Incidents by Severity */}
        <div className="card p-5">
          <h3 className="font-semibold text-white text-sm mb-4">Incidents by Severity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incidentsBySeverity}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                label={({ name, count }) => `${name}: ${count}`}
                labelLine={false}
              >
                {incidentsBySeverity.map((_, i) => (
                  <Cell key={i} fill={SEVERITY_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0a0b2e', border: '1px solid #3334a8', borderRadius: '8px' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Response Time */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-semibold text-white text-sm mb-4">Average Response Time (minutes, last 7 days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1f5c" />
              <XAxis dataKey="name" stroke="#8093f8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#8093f8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0a0b2e', border: '1px solid #3334a8', borderRadius: '8px' }}
              />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#5b6bf4"
                strokeWidth={2}
                dot={{ fill: '#5b6bf4', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
