import type {
  Evidence,
  AIAnalysisResult,
  ResponseRecommendation,
  EvidenceCorrelation,
  Severity,
  IncidentType,
} from '../types'

/**
 * AI Service Abstraction Layer
 * ─────────────────────────────
 * This module abstracts the AI analysis pipeline so that either a mock
 * implementation or a real Gemini API integration can be used.
 *
 * To connect Gemini:
 * 1. Set VITE_GEMINI_API_KEY in your .env file
 * 2. Implement GeminiAIService following the same interface
 * 3. Swap the default export from MockAIService to GeminiAIService
 *
 * Google Cloud integration points:
 * - Vertex AI / Gemini: multimodal reasoning (text + image + PDF)
 * - Cloud Storage: store uploaded evidence files
 * - Firestore: persist incident records and analysis results
 * - Cloud Run: deploy this backend service
 * - Cloud Logging: log AI analysis events
 */

export interface AIService {
  analyzeIncident(evidence: Evidence[], location: string): Promise<AIAnalysisResult>
  generateResponseRecommendation(analysis: AIAnalysisResult): Promise<ResponseRecommendation>
  analyzeImage(evidence: Evidence): Promise<string>
  analyzeDocument(evidence: Evidence): Promise<string>
}

// ─── Mock AI implementation ──────────────────────────────────────

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

/**
 * Determines incident type from evidence content using keyword matching.
 * In production, this would use Gemini's natural language understanding.
 */
function detectIncidentType(evidence: Evidence[]): IncidentType {
  const allText = evidence.map((e) => e.content.toLowerCase()).join(' ')

  if (/smoke|fire|burn|electrical|spark|flame|overheat/i.test(allText)) return 'Electrical Fire / Smoke Hazard'
  if (/medical|unconscious|collapse|injur|faint|bleed|emergency.*student/i.test(allText)) return 'Medical Emergency'
  if (/unauthorized|intruder|trespass|unknown.*person|cctv.*person/i.test(allText)) return 'Unauthorized Entry'
  if (/water|leak|drip|flood|pipe.*burst|ceiling.*water/i.test(allText)) return 'Water Leakage'
  if (/security|theft|suspicious|vehicle|break/i.test(allText)) return 'Security Incident'
  if (/infrastructure|heating|cooling|hvac|malfunction|power.*outage/i.test(allText)) return 'Infrastructure Issue'
  if (/fire|blaze|combust/i.test(allText)) return 'Fire'

  return 'Unknown'
}

/**
 * Assesses severity from evidence type, content and incident type.
 * In production, Gemini would evaluate all evidence holistically.
 */
function assessSeverity(
  evidence: Evidence[],
  incidentType: IncidentType
): { severity: Severity; score: number; confidence: number } {
  const allText = evidence.map((e) => e.content.toLowerCase()).join(' ')
  let score = 50
  let confidence = 85

  // Critical keywords boost severity significantly
  if (/smoke|fire|burn|unconscious|bleeding|collapse|blaze|flame/i.test(allText)) score += 35
  if (/electrical.*room|evacuat|overheat|spark/i.test(allText)) score += 10

  // High-severity indicators
  if (/injur|medical.*emergency|faint/i.test(allText)) score += 25
  if (/unauthorized|intruder|after.*hours|02:30|night/i.test(allText)) score += 15

  // Medium-severity indicators
  if (/leak|drip|water|ceiling/i.test(allText)) score += 5
  if (/suspicious|unknown/i.test(allText)) score += 10

  // Evidence count increases confidence
  const evidenceCount = evidence.length
  confidence = Math.min(98, 80 + evidenceCount * 5)

  // Image + document increases confidence
  const hasImage = evidence.some((e) => e.type === 'image')
  const hasDoc = evidence.some((e) => e.type === 'document')
  if (hasImage) confidence += 5
  if (hasDoc) confidence += 4

  score = Math.min(100, score)
  score = Math.max(10, score)

  let severity: Severity = 'low'
  if (score >= 85) severity = 'critical'
  else if (score >= 70) severity = 'high'
  else if (score >= 40) severity = 'medium'

  return { severity, score, confidence: Math.min(99, confidence) }
}

/**
 * Generates evidence correlation explanations.
 * In production, Gemini would explain why each evidence source matters.
 */
function buildCorrelations(
  evidence: Evidence[],
  incidentType: IncidentType,
  location: string
): EvidenceCorrelation[] {
  const correlations: EvidenceCorrelation[] = []

  const textEvidence = evidence.find((e) => e.type === 'text')
  const imageEvidence = evidence.find((e) => e.type === 'image')
  const docEvidence = evidence.find((e) => e.type === 'document')

  if (imageEvidence) {
    correlations.push({
      source: 'Image Evidence',
      finding: imageEvidence.content,
      riskLevel: 'high',
    })
  }

  if (textEvidence) {
    correlations.push({
      source: 'Text Evidence',
      finding: textEvidence.content,
      riskLevel: 'high',
    })
  }

  if (docEvidence) {
    correlations.push({
      source: 'Document Evidence',
      finding: docEvidence.content,
      riskLevel: 'medium',
    })
  }

  correlations.push({
    source: 'Context',
    finding: `${location} is ${/hostel|academic|laboratory|library/i.test(location) ? 'an occupied building with high foot traffic' : 'a monitored campus area'}.`,
    riskLevel: 'medium',
  })

  return correlations
}

/**
 * Generates the AI summary combining all evidence sources.
 */
function buildSummary(
  incidentType: IncidentType,
  evidence: Evidence[],
  location: string,
  severity: Severity
): string {
  const hasImage = evidence.some((e) => e.type === 'image')
  const hasText = evidence.some((e) => e.type === 'text')
  const hasDoc = evidence.some((e) => e.type === 'document')

  const parts: string[] = []

  if (incidentType === 'Electrical Fire / Smoke Hazard') {
    parts.push('Multiple evidence sources indicate possible electrical overheating or fire risk in the Academic Block.')
    if (hasImage) parts.push('The uploaded image shows visible smoke near electrical equipment.')
    if (hasText) parts.push('The incident description identifies the electrical room as the source.')
    if (hasDoc) parts.push('The inspection document indicates previous electrical maintenance concerns.')
  } else if (incidentType === 'Medical Emergency') {
    parts.push('Evidence indicates a medical emergency requiring immediate attention.')
    if (hasText) parts.push('The text report describes a person collapsing and being unresponsive.')
    if (hasImage) parts.push('The image confirms a person on the ground with bystanders present.')
  } else if (incidentType === 'Unauthorized Entry') {
    parts.push('Evidence suggests an unauthorized individual has entered campus premises.')
    if (hasImage) parts.push('CCTV footage shows an unidentified person entering through a gate.')
    if (hasText) parts.push('The security report confirms no visitor log entry for this individual.')
  } else if (incidentType === 'Water Leakage') {
    parts.push('Evidence indicates water leakage that may pose safety risks.')
    if (hasImage) parts.push('The photograph shows water dripping from the ceiling near electrical outlets.')
    if (hasText) parts.push('The report mentions wet floors and nearby electrical hazards.')
    if (hasDoc) parts.push('The maintenance report indicates recurring plumbing issues in this area.')
  } else {
    parts.push(`Analysis of evidence from ${location} indicates a ${severity} incident.`)
    parts.push('Multiple evidence sources have been correlated to assess the situation.')
  }

  return parts.join(' ')
}

function buildReasoning(incidentType: IncidentType, severity: Severity, score: number): string {
  return `The AI combined ${incidentType === 'Electrical Fire / Smoke Hazard' ? 'text reports, visual evidence, and historical maintenance documents' : 'multiple evidence sources'} to reach this assessment. The severity score of ${score}/100 was calculated based on the presence of risk indicators across evidence types, the location context, and the nature of the incident. This is an AI-generated recommendation and requires human verification.`
}

class MockAIService implements AIService {
  async analyzeIncident(evidence: Evidence[], location: string): Promise<AIAnalysisResult> {
    // Simulate processing delay
    await delay(2000)

    const incidentType = detectIncidentType(evidence)
    const { severity, score, confidence } = assessSeverity(evidence, incidentType)
    const correlations = buildCorrelations(evidence, incidentType, location)
    const summary = buildSummary(incidentType, evidence, location, severity)
    const reasoning = buildReasoning(incidentType, severity, score)

    const combinedRisk: AIAnalysisResult['combinedRisk'] =
      severity === 'critical' ? 'High Risk' : severity === 'high' ? 'High Risk' : severity === 'medium' ? 'Medium Risk' : 'Low Risk'

    return {
      incidentType,
      location: location,
      severity,
      severityScore: score,
      confidence,
      summary,
      correlations,
      combinedRisk,
      reasoning,
    }
  }

  async generateResponseRecommendation(analysis: AIAnalysisResult): Promise<ResponseRecommendation> {
    await delay(800)

    if (analysis.severity === 'critical') {
      return {
        priority: 'P0 - Immediate',
        team: 'Campus Security + Electrical Maintenance',
        estimatedResponseTime: '< 5 minutes',
        escalation: 'Campus Emergency Response Team',
        actions: [
          'Alert campus security',
          'Evacuate the affected area',
          'Isolate electrical supply if safe',
          'Contact emergency maintenance team',
          'Notify campus administration',
          'Monitor surrounding areas',
          'Escalate to emergency services if fire is confirmed',
        ],
      }
    }

    if (analysis.severity === 'high') {
      return {
        priority: 'P1 - Urgent',
        team: 'Campus Medical Team + Security',
        estimatedResponseTime: '< 10 minutes',
        escalation: 'Campus Health Services',
        actions: [
          'Dispatch campus medical team',
          'Alert campus security',
          'Clear the area for medical access',
          'Contact campus health services',
          'Notify campus administration',
          'Monitor student condition',
        ],
      }
    }

    if (analysis.severity === 'medium') {
      return {
        priority: 'P2 - Standard',
        team: 'Campus Security',
        estimatedResponseTime: '< 15 minutes',
        escalation: 'Security Operations Manager',
        actions: [
          'Dispatch security team to verify',
          'Check visitor logs and CCTV records',
          'Interview witnesses if available',
          'Document the incident',
          'Report findings to security manager',
        ],
      }
    }

    return {
      priority: 'P3 - Routine',
      team: 'Campus Maintenance Team',
      estimatedResponseTime: '< 30 minutes',
      escalation: 'Facilities Manager',
      actions: [
        'Dispatch maintenance team',
        'Inspect the reported area',
        'Repair or contain the issue',
        'Document the resolution',
      ],
    }
  }

  async analyzeImage(evidence: Evidence): Promise<string> {
    await delay(1200)
    return `Image analysis complete: ${evidence.content}. No additional threats detected beyond the reported issue.`
  }

  async analyzeDocument(evidence: Evidence): Promise<string> {
    await delay(1000)
    return `Document processed: ${evidence.content}. Relevant information extracted and correlated with other evidence.`
  }
}

// ─── Service factory ──────────────────────────────────────────────
// When GEMINI_API_KEY is available, swap to the real implementation.
// Example:
//   const apiKey = import.meta.env.VITE_GEMINI_API_KEY
//   export const aiService: AIService = apiKey ? new GeminiAIService(apiKey) : new MockAIService()

export const aiService: AIService = new MockAIService()
