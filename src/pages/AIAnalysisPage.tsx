import { useIncidentStore } from '../store/useIncidentStore'
import { BrainCircuit, AlertTriangle, ShieldAlert, Clock, Users, ArrowUpCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { severityBadgeClass, severityDotClass } from '../components/common/Badges'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/common/Toast'
import type { Severity } from '../types'

const PROCESSING_STEPS = [
  'Reading text evidence...',
  'Analyzing image evidence...',
  'Extracting document information...',
  'Correlating evidence sources...',
  'Assessing severity...',
  'Generating response recommendation...',
]

export default function AIAnalysisPage() {
  const navigate = useNavigate()
  const { analysisResult, recommendation, isAnalyzing, analysisStep, evidencePackage, executeAction, toast, showToast } = useIncidentStore()

  // ── AI Processing Animation ──────────────────────────────────
  if (isAnalyzing || (!analysisResult && evidencePackage.length > 0)) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Analysis</h1>
          <p className="text-navy-400 text-sm mt-1">Multimodal evidence processing in progress</p>
        </div>

        <div className="card p-8 max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-full bg-navy-700/40 flex items-center justify-center scan-line">
              <BrainCircuit className="text-navy-400" size={36} />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">AI is analyzing your evidence</h2>
          <p className="text-sm text-navy-500 mb-6">Combining {evidencePackage.length} evidence sources for holistic assessment</p>

          {/* Steps */}
          <div className="space-y-3 text-left max-w-md mx-auto">
            {PROCESSING_STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  i < analysisStep ? 'bg-green-500/20' : i === analysisStep ? 'bg-navy-600' : 'bg-navy-800'
                }`}>
                  {i < analysisStep ? (
                    <CheckCircle2 className="text-green-400" size={14} />
                  ) : i === analysisStep ? (
                    <Loader2 className="text-white animate-spin" size={14} />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-navy-600" />
                  )}
                </div>
                <span className={`text-sm ${i <= analysisStep ? 'text-navy-200' : 'text-navy-600'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── No evidence state ────────────────────────────────────────
  if (!analysisResult && evidencePackage.length === 0) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Analysis</h1>
        </div>
        <div className="card p-12 text-center">
          <BrainCircuit className="text-navy-600 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-navy-300">No analysis available</h3>
          <p className="text-navy-500 text-sm mt-2 mb-4">
            Report an incident with evidence first, or load a demo scenario.
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => navigate('/report')} className="btn-primary">Report Incident</button>
            <button onClick={() => navigate('/')} className="btn-ghost">Go to Dashboard</button>
          </div>
        </div>
      </div>
    )
  }

  // ── Results ──────────────────────────────────────────────────
  const result = analysisResult!
  const rec = recommendation!

  return (
    <div className="space-y-6 animate-fade-in">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => showToast('', 'success')} />}

      <div>
        <h1 className="text-2xl font-bold text-white">AI Incident Analysis</h1>
        <p className="text-navy-400 text-sm mt-1">See → Understand → Decide → Respond</p>
      </div>

      {/* Warning banner */}
      <div className="card p-3 border-yellow-500/30 bg-yellow-500/5">
        <p className="text-xs text-yellow-400 text-center">
          ⚠️ AI-generated recommendation — requires human verification. Campus authorities remain responsible for all decisions.
        </p>
      </div>

      {/* ── Incident Understanding ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Type + Location */}
        <div className="card p-5 md:col-span-2">
          <h3 className="text-xs text-navy-500 uppercase tracking-wide mb-2">Incident Type</h3>
          <p className="text-xl font-bold text-white">{result.incidentType}</p>
          <div className="flex items-center gap-2 mt-3 text-sm text-navy-400">
            <MapPinIcon /> {result.location}
          </div>
        </div>

        {/* Severity */}
        <div className={`card p-5 ${result.severity === 'critical' ? 'glow-critical' : ''}`}>
          <h3 className="text-xs text-navy-500 uppercase tracking-wide mb-2">Severity</h3>
          <div className="flex items-center gap-2">
            <span className={severityDotClass(result.severity as Severity)} />
            <span className={severityBadgeClass(result.severity as Severity)}>{result.severity.toUpperCase()}</span>
          </div>
          {/* Score bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-navy-500 mb-1">
              <span>Severity Score</span>
              <span className="text-white font-semibold">{result.severityScore}/100</span>
            </div>
            <div className="h-2 bg-navy-950 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  result.severity === 'critical' ? 'bg-red-500' : result.severity === 'high' ? 'bg-orange-500' : result.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                style={{ width: `${result.severityScore}%` }}
              />
            </div>
          </div>
          {/* Confidence */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-navy-500 mb-1">
              <span>AI Confidence</span>
              <span className="text-white font-semibold">{result.confidence}%</span>
            </div>
            <div className="h-2 bg-navy-950 rounded-full overflow-hidden">
              <div className="h-full bg-navy-500 rounded-full" style={{ width: `${result.confidence}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Summary ────────────────────────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <BrainCircuit className="text-navy-400" size={18} />
          <h3 className="font-semibold text-white text-sm">AI Summary</h3>
        </div>
        <p className="text-sm text-navy-200 leading-relaxed">{result.summary}</p>
      </div>

      {/* ── Evidence Correlation ──────────────────────────────── */}
      <div className="card p-5">
        <h3 className="font-semibold text-white text-sm mb-4">Why did AI classify this as {result.severity.toUpperCase()}?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.correlations.map((c, i) => (
            <div key={i} className="bg-navy-950 rounded-lg p-4 border border-navy-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white">{c.source}</span>
                <span className={`badge text-xs ${
                  c.riskLevel === 'high' ? 'bg-red-500/15 text-red-400' : c.riskLevel === 'medium' ? 'bg-yellow-500/15 text-yellow-400' : 'bg-blue-500/15 text-blue-400'
                }`}>
                  {c.riskLevel}
                </span>
              </div>
              <p className="text-xs text-navy-400 leading-relaxed">{c.finding}</p>
            </div>
          ))}
        </div>
        {/* Combined */}
        <div className="mt-4 flex items-center gap-3 bg-navy-800/40 rounded-lg p-4 border border-navy-700/50">
          <ArrowUpCircle className={result.combinedRisk === 'High Risk' ? 'text-red-400' : 'text-yellow-400'} size={24} />
          <div>
            <p className="text-sm font-semibold text-white">Combined Evidence → {result.combinedRisk}</p>
            <p className="text-xs text-navy-400 mt-0.5">{result.reasoning}</p>
          </div>
        </div>
      </div>

      {/* ── Recommended Response ──────────────────────────────── */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="text-orange-400" size={20} />
          <h3 className="font-semibold text-white">Recommended Response</h3>
        </div>

        {/* Priority banner */}
        <div className={`rounded-lg p-4 mb-4 ${
          rec.priority === 'P0 - Immediate' ? 'bg-red-500/10 border border-red-500/30' : 'bg-orange-500/10 border border-orange-500/30'
        }`}>
          <p className="text-sm font-bold text-white">🚨 {rec.priority} — Immediate Action Required</p>
        </div>

        {/* Response card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="bg-navy-950 rounded-lg p-3 border border-navy-800">
            <Users className="text-navy-400 mb-1" size={16} />
            <p className="text-xs text-navy-500">Recommended Team</p>
            <p className="text-sm text-white font-medium mt-0.5">{rec.team}</p>
          </div>
          <div className="bg-navy-950 rounded-lg p-3 border border-navy-800">
            <Clock className="text-navy-400 mb-1" size={16} />
            <p className="text-xs text-navy-500">Estimated Response Time</p>
            <p className="text-sm text-white font-medium mt-0.5">{rec.estimatedResponseTime}</p>
          </div>
          <div className="bg-navy-950 rounded-lg p-3 border border-navy-800">
            <ArrowUpCircle className="text-navy-400 mb-1" size={16} />
            <p className="text-xs text-navy-500">Escalation</p>
            <p className="text-sm text-white font-medium mt-0.5">{rec.escalation}</p>
          </div>
        </div>

        {/* Actions list */}
        <ol className="space-y-2 mb-4">
          {rec.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-navy-200">
              <span className="w-6 h-6 rounded-full bg-navy-700 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {i + 1}
              </span>
              {action}
            </li>
          ))}
        </ol>

        {/* Action buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-navy-800">
          {['Dispatch Security', 'Start Evacuation', 'Notify Administration', 'Escalate Incident'].map((action) => (
            <button
              key={action}
              onClick={() => executeAction(action)}
              className={`btn text-xs ${
                action.includes('Evacuation') || action.includes('Escalate') ? 'btn-danger' : 'btn-primary'
              }`}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* ── Incident Timeline ─────────────────────────────────── */}
      <div className="card p-5">
        <h3 className="font-semibold text-white text-sm mb-4">Incident Timeline</h3>
        <div className="relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-navy-700" />
          {[
            { time: '10:38 AM', event: 'Incident reported', color: 'bg-blue-500' },
            { time: '10:40 AM', event: 'Image uploaded', color: 'bg-blue-500' },
            { time: '10:41 AM', event: 'Document analyzed', color: 'bg-purple-500' },
            { time: '10:42 AM', event: 'AI identified critical risk', color: 'bg-red-500' },
            { time: '10:43 AM', event: 'Security team notified', color: 'bg-green-500' },
            { time: '10:44 AM', event: 'Response initiated', color: 'bg-green-500' },
          ].map((t, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <div className={`absolute -left-4.5 top-1 w-3 h-3 rounded-full border-2 border-navy-950 ${t.color}`} />
              <div className="ml-2">
                <span className="text-xs text-navy-500 font-mono">{t.time}</span>
                <p className="text-sm text-white mt-0.5">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Small inline icon to avoid extra import noise
function MapPinIcon() {
  return <span className="text-navy-500">📍</span>
}
