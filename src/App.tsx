import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardPage from './pages/DashboardPage'
import ReportIncidentPage from './pages/ReportIncidentPage'
import EvidenceCenterPage from './pages/EvidenceCenterPage'
import AIAnalysisPage from './pages/AIAnalysisPage'
import IncidentHistoryPage from './pages/IncidentHistoryPage'
import ResponseCenterPage from './pages/ResponseCenterPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/report" element={<ReportIncidentPage />} />
        <Route path="/evidence" element={<EvidenceCenterPage />} />
        <Route path="/analysis" element={<AIAnalysisPage />} />
        <Route path="/history" element={<IncidentHistoryPage />} />
        <Route path="/response" element={<ResponseCenterPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
