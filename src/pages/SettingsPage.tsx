import { Settings as SettingsIcon, Bell, Shield, Cloud, Brain, Database, Mail } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [autoAnalyze, setAutoAnalyze] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [emailReports, setEmailReports] = useState(false)

  const toggles = [
    { label: 'Push Notifications', desc: 'Receive real-time incident alerts', value: notifications, setter: setNotifications },
    { label: 'Auto-Analyze Evidence', desc: 'Automatically trigger AI analysis when evidence is uploaded', value: autoAnalyze, setter: setAutoAnalyze },
    { label: 'Critical Incident Alerts', desc: 'Immediate popup for critical incidents', value: criticalAlerts, setter: setCriticalAlerts },
    { label: 'Email Summary Reports', desc: 'Daily incident summary sent to your email', value: emailReports, setter: setEmailReports },
  ]

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-navy-400 text-sm mt-1">Configure CampusGuardian AI preferences</p>
      </div>

      {/* Notifications */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-navy-400" size={18} />
          <h3 className="font-semibold text-white text-sm">Notifications</h3>
        </div>
        <div className="space-y-4">
          {toggles.map((t) => (
            <div key={t.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">{t.label}</p>
                <p className="text-xs text-navy-500 mt-0.5">{t.desc}</p>
              </div>
              <button
                onClick={() => t.setter(!t.value)}
                className={`relative w-11 h-6 rounded-full transition-colors ${t.value ? 'bg-navy-600' : 'bg-navy-800'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    t.value ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Configuration */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="text-navy-400" size={18} />
          <h3 className="font-semibold text-white text-sm">AI Configuration</h3>
        </div>
        <div className="space-y-4 text-sm">
          <div>
            <label className="text-navy-400 text-xs">AI Provider</label>
            <div className="mt-1 flex items-center gap-2 bg-navy-950 rounded-lg p-3 border border-navy-800">
              <span className="badge bg-yellow-500/15 text-yellow-400">Mock Mode</span>
              <span className="text-navy-400 text-xs">
                Gemini API key not configured. Using simulated AI responses.
              </span>
            </div>
          </div>
          <div>
            <label className="text-navy-400 text-xs">Gemini API Key</label>
            <input
              type="password"
              placeholder="Enter Gemini API key to enable real AI..."
              className="input-field mt-1"
            />
            <p className="text-xs text-navy-600 mt-1">
              Add VITE_GEMINI_API_KEY to your .env file to connect Google Gemini multimodal API.
            </p>
          </div>
        </div>
      </div>

      {/* Google Cloud Integration */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="text-navy-400" size={18} />
          <h3 className="font-semibold text-white text-sm">Google Cloud Integration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'Vertex AI / Gemini', desc: 'Multimodal reasoning', status: 'Not Connected', icon: Brain },
            { name: 'Cloud Storage', desc: 'Evidence file storage', status: 'Not Connected', icon: Database },
            { name: 'Cloud Run', desc: 'Backend deployment', status: 'Not Connected', icon: Cloud },
            { name: 'Firestore', desc: 'Incident database', status: 'Not Connected', icon: Database },
            { name: 'Firebase Auth', desc: 'User authentication', status: 'Not Connected', icon: Shield },
            { name: 'Cloud Logging', desc: 'Monitoring and logs', status: 'Not Connected', icon: Mail },
          ].map((s) => (
            <div key={s.name} className="bg-navy-950 rounded-lg p-3 border border-navy-800">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className="text-navy-500" size={14} />
                <span className="text-sm text-white font-medium">{s.name}</span>
              </div>
              <p className="text-xs text-navy-500">{s.desc}</p>
              <span className="text-xs text-navy-600 mt-1 inline-block">{s.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-3">
          <SettingsIcon className="text-navy-400" size={18} />
          <h3 className="font-semibold text-white text-sm">About</h3>
        </div>
        <div className="text-sm text-navy-400 space-y-2">
          <p><strong className="text-white">CampusGuardian AI</strong> v1.0 Prototype</p>
          <p>See. Understand. Decide. Respond.</p>
          <p className="text-xs text-navy-600 pt-2 border-t border-navy-800">
            This is a hackathon prototype. AI recommendations are simulated and require human verification.
            Campus authorities remain responsible for all decisions and actions.
          </p>
        </div>
      </div>
    </div>
  )
}
