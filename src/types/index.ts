// Core domain types for CampusGuardian AI

export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type IncidentStatus = 'active' | 'responding' | 'investigating' | 'resolved' | 'escalated'
export type EvidenceType = 'text' | 'image' | 'document' | 'voice'
export type IncidentType =
  | 'Electrical Fire / Smoke Hazard'
  | 'Medical Emergency'
  | 'Unauthorized Entry'
  | 'Water Leakage'
  | 'Security Incident'
  | 'Infrastructure Issue'
  | 'Fire'
  | 'Unknown'

export interface Evidence {
  id: string
  type: EvidenceType
  title: string
  content: string
  fileName?: string
  fileDataUrl?: string
  timestamp: string
}

export interface EvidenceCorrelation {
  source: string
  finding: string
  riskLevel: 'high' | 'medium' | 'low'
}

export interface AIAnalysisResult {
  incidentType: IncidentType
  location: string
  severity: Severity
  severityScore: number
  confidence: number
  summary: string
  correlations: EvidenceCorrelation[]
  combinedRisk: 'High Risk' | 'Medium Risk' | 'Low Risk'
  reasoning: string
}

export interface ResponseRecommendation {
  priority: 'P0 - Immediate' | 'P1 - Urgent' | 'P2 - Standard' | 'P3 - Routine'
  team: string
  estimatedResponseTime: string
  escalation: string
  actions: string[]
}

export interface TimelineEvent {
  id: string
  time: string
  event: string
  type: 'report' | 'evidence' | 'analysis' | 'response' | 'update'
}

export interface Incident {
  id: string
  type: IncidentType
  location: string
  severity: Severity
  status: IncidentStatus
  aiConfidence: number
  date: string
  time: string
  description: string
  evidence: Evidence[]
  analysis?: AIAnalysisResult
  recommendation?: ResponseRecommendation
  timeline: TimelineEvent[]
}

export interface DemoScenario {
  id: string
  title: string
  description: string
  evidence: Evidence[]
  expectedSeverity: Severity
  expectedResponse: string
  location: string
  expectedType: IncidentType
}
