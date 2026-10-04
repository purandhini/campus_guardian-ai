/**
 * Mock AI Service — Backend
 * ─────────────────────────
 * Simulates multimodal AI analysis for the prototype.
 *
 * To connect Gemini API:
 * 1. npm install @google/generative-ai
 * 2. Set GEMINI_API_KEY in environment
 * 3. Replace these mock functions with real Gemini calls:
 *    - analyzeIncidentMock → use Gemini's generateContent with text + image parts
 *    - generateResponseMock → use Gemini with the analysis prompt
 */

function detectIncidentType(evidence) {
  const allText = evidence.map((e) => e.content?.toLowerCase() || '').join(' ')

  if (/smoke|fire|burn|electrical|spark|flame|overheat/i.test(allText)) return 'Electrical Fire / Smoke Hazard'
  if (/medical|unconscious|collapse|injur|faint|bleed/i.test(allText)) return 'Medical Emergency'
  if (/unauthorized|intruder|trespass|unknown.*person|cctv/i.test(allText)) return 'Unauthorized Entry'
  if (/water|leak|drip|flood|pipe.*burst/i.test(allText)) return 'Water Leakage'
  if (/security|theft|suspicious|vehicle/i.test(allText)) return 'Security Incident'
  if (/infrastructure|heating|cooling|hvac|malfunction/i.test(allText)) return 'Infrastructure Issue'
  if (/fire|blaze|combust/i.test(allText)) return 'Fire'
  return 'Unknown'
}

function assessSeverity(evidence, incidentType) {
  const allText = evidence.map((e) => e.content?.toLowerCase() || '').join(' ')
  let score = 50
  let confidence = 85

  if (/smoke|fire|burn|unconscious|bleeding|collapse/i.test(allText)) score += 35
  if (/electrical.*room|evacuat|overheat/i.test(allText)) score += 10
  if (/injur|medical.*emergency/i.test(allText)) score += 25
  if (/unauthorized|intruder|after.*hours/i.test(allText)) score += 15
  if (/leak|drip|water/i.test(allText)) score += 5

  const evidenceCount = evidence.length
  confidence = Math.min(98, 80 + evidenceCount * 5)
  if (evidence.some((e) => e.type === 'image')) confidence += 5
  if (evidence.some((e) => e.type === 'document')) confidence += 4

  score = Math.min(100, Math.max(10, score))

  let severity = 'low'
  if (score >= 85) severity = 'critical'
  else if (score >= 70) severity = 'high'
  else if (score >= 40) severity = 'medium'

  return { severity, score, confidence: Math.min(99, confidence) }
}

export async function analyzeIncidentMock(evidence, location) {
  const incidentType = detectIncidentType(evidence)
  const { severity, score, confidence } = assessSeverity(evidence, incidentType)

  const correlations = evidence.map((e) => ({
    source: e.type === 'image' ? 'Image Evidence' : e.type === 'document' ? 'Document Evidence' : 'Text Evidence',
    finding: e.content,
    riskLevel: e.type === 'text' ? 'high' : e.type === 'image' ? 'high' : 'medium',
  }))

  correlations.push({
    source: 'Context',
    finding: `${location} is a campus area requiring monitoring.`,
    riskLevel: 'medium',
  })

  const combinedRisk = severity === 'critical' || severity === 'high' ? 'High Risk' : severity === 'medium' ? 'Medium Risk' : 'Low Risk'

  const summary = `Multiple evidence sources indicate a ${severity} incident at ${location}. The AI has combined ${evidence.length} evidence items to produce this assessment.`

  return {
    incidentType,
    location,
    severity,
    severityScore: score,
    confidence,
    summary,
    correlations,
    combinedRisk,
    reasoning: `Severity score ${score}/100 calculated from ${evidence.length} evidence sources. This is an AI-generated recommendation requiring human verification.`,
  }
}

export async function generateResponseMock(analysis) {
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
    actions: ['Dispatch maintenance team', 'Inspect the reported area', 'Repair or contain the issue', 'Document the resolution'],
  }
}
