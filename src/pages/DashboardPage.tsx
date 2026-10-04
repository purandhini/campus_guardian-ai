import StatsCards from '../components/dashboard/StatsCards'
import StageFlow from '../components/dashboard/StageFlow'
import LiveIncidentFeed from '../components/dashboard/LiveIncidentFeed'
import DemoScenarios from '../components/demo/DemoScenarios'

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero / title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Campus Security Dashboard</h1>
        <p className="text-navy-400 text-sm mt-1">
          Real-time multimodal incident intelligence for campus safety
        </p>
      </div>

      {/* SEE → UNDERSTAND → DECIDE → RESPOND */}
      <StageFlow />

      {/* Stats */}
      <StatsCards />

      {/* Demo Scenarios quick access */}
      <DemoScenarios />

      {/* Live feed */}
      <LiveIncidentFeed />
    </div>
  )
}
