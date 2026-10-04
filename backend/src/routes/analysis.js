import { Router } from 'express'
import { analyzeIncidentMock, generateResponseMock } from '../services/mockAI.js'

const router = Router()

/**
 * POST /api/analysis/analyze
 * Body: { evidence: Evidence[], location: string, description: string }
 * Returns: { analysis: AIAnalysisResult, recommendation: ResponseRecommendation }
 *
 * When GEMINI_API_KEY is set, replace mockAI with a real Gemini service.
 */
router.post('/analyze', async (req, res) => {
  try {
    const { evidence, location, description } = req.body
    const allEvidence = evidence || []

    if (description) {
      allEvidence.unshift({
        id: `ev-desc-${Date.now()}`,
        type: 'text',
        title: 'Incident Description',
        content: description,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      })
    }

    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 2000))

    const analysis = await analyzeIncidentMock(allEvidence, location || 'Unknown')
    const recommendation = await generateResponseMock(analysis)

    res.json({ analysis, recommendation })
  } catch (err) {
    console.error('Analysis error:', err)
    res.status(500).json({ error: 'AI analysis failed' })
  }
})

// GET /api/analysis/health
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    provider: process.env.GEMINI_API_KEY ? 'Gemini' : 'Mock',
  })
})

export default router
