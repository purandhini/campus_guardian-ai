import { useNavigate } from 'react-router-dom'
import { demoScenarios } from '../../data/mockData'
import type { DemoScenario } from '../../types'
import { useIncidentStore } from '../../store/useIncidentStore'
import { Play, Zap, Flame, HeartPulse, UserX, Droplets } from 'lucide-react'

const scenarioIcons: Record<string, typeof Flame> = {
  'demo-1': Flame,
  'demo-2': HeartPulse,
  'demo-3': UserX,
  'demo-4': Droplets,
}

export default function DemoScenarios() {
  const navigate = useNavigate()
  const { loadDemoScenario, analyzeIncident } = useIncidentStore()

  const handleLoadAndAnalyze = async (scenarioId: string) => {
    const scenario = demoScenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    // Load evidence
    loadDemoScenario(scenario)

    // Navigate to evidence center
    navigate('/evidence')
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-yellow-400" size={18} />
        <h3 className="font-semibold text-white text-sm">Try a Demo Scenario</h3>
        <span className="text-xs text-navy-500">— Preloaded evidence packages for instant demonstration</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {demoScenarios.map((scenario: DemoScenario) => {
          const Icon = scenarioIcons[scenario.id] || Play
          return (
            <div
              key={scenario.id}
              className={`card p-4 card-hover cursor-pointer ${
                scenario.expectedSeverity === 'critical' ? 'border-red-500/20' : ''
              }`}
              onClick={() => handleLoadAndAnalyze(scenario.id)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  scenario.expectedSeverity === 'critical' ? 'bg-red-500/10' :
                  scenario.expectedSeverity === 'high' ? 'bg-orange-500/10' :
                  scenario.expectedSeverity === 'medium' ? 'bg-yellow-500/10' : 'bg-blue-500/10'
                }`}>
                  <Icon className={
                    scenario.expectedSeverity === 'critical' ? 'text-red-400' :
                    scenario.expectedSeverity === 'high' ? 'text-orange-400' :
                    scenario.expectedSeverity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                  } size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white">{scenario.title}</h4>
                  <p className="text-xs text-navy-500 mt-0.5 line-clamp-2">{scenario.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge text-xs ${
                      scenario.expectedSeverity === 'critical' ? 'badge-critical' :
                      scenario.expectedSeverity === 'high' ? 'badge-high' :
                      scenario.expectedSeverity === 'medium' ? 'badge-medium' : 'badge-low'
                    }`}>
                      {scenario.expectedSeverity}
                    </span>
                    <span className="text-xs text-navy-500">{scenario.evidence.length} evidence</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
