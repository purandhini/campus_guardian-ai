import express from 'express'
import cors from 'cors'
import incidentRoutes from './routes/incidents.js'
import analysisRoutes from './routes/analysis.js'

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ──────────────────────────────────────────────────
app.use(cors())
app.use(express.json({ limit: '10mb' })) // large for base64 images

// ── Routes ──────────────────────────────────────────────────────
// POST /api/incidents           → create a new incident
// GET  /api/incidents           → list all incidents
// GET  /api/incidents/:id       → get a single incident
// PATCH /api/incidents/:id     → update incident status
app.use('/api/incidents', incidentRoutes)

// POST /api/analysis/analyze    → analyze evidence with AI (mock or Gemini)
// GET  /api/analysis/health    → check AI service status
app.use('/api/analysis', analysisRoutes)

// ── Health check ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'CampusGuardian AI API', version: '1.0.0' })
})

// ── Start ───────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`CampusGuardian AI API running on http://localhost:${PORT}`)
})

// ─── GEMINI INTEGRATION NOTES ───────────────────────────────────
// To connect the real Gemini API from the backend:
//
// 1. Install: npm install @google/generative-ai
// 2. Set GEMINI_API_KEY environment variable
// 3. Implement aiService.analyzeIncident() using GeminiVisionModel:
//    - Pass text evidence as prompt text
//    - Pass images as inline base64 parts
//    - Pass PDFs as file URIs (upload to Gemini first)
// 4. Parse the structured response into AIAnalysisResult
//
// Example (pseudocode):
//   import { GoogleGenerativeAI } from '@google/generative-ai'
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
//   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
//   const result = await model.generateContent([
//     { text: 'Analyze this incident evidence...' },
//     { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
//   ])
//
// ─── GOOGLE CLOUD INTEGRATION ───────────────────────────────────
// - Cloud Storage: store evidence files (images, PDFs) as blobs
// - Firestore: persist incident records and analysis results
//   - Collection: incidents
//   - Document: incident ID
//   - Subcollection: evidence, timeline, analysis
// - Cloud Run: deploy this Express server as a container
// - Firebase Auth: authenticate campus administrators
// - Cloud Logging: log AI analysis events and errors
