import { Router } from 'express'

const router = Router()

// ── In-memory store (replace with Firestore) ────────────────────
let incidents = [
  {
    id: 'CG-2026-001',
    type: 'Electrical Fire / Smoke Hazard',
    location: 'Academic Block',
    severity: 'critical',
    status: 'responding',
    aiConfidence: 94,
    date: '2026-10-04',
    time: '10:38 AM',
    description: 'Smoke detected near electrical room in Academic Block',
  },
  {
    id: 'CG-2026-002',
    type: 'Medical Emergency',
    location: 'Hostel B',
    severity: 'high',
    status: 'resolved',
    aiConfidence: 91,
    date: '2026-10-04',
    time: '09:15 AM',
    description: 'Student medical emergency reported near Hostel B',
  },
]

// GET /api/incidents
router.get('/', (_req, res) => {
  res.json(incidents)
})

// GET /api/incidents/:id
router.get('/:id', (req, res) => {
  const incident = incidents.find((i) => i.id === req.params.id)
  if (!incident) return res.status(404).json({ error: 'Incident not found' })
  res.json(incident)
})

// POST /api/incidents
router.post('/', (req, res) => {
  const { type, location, severity, description, evidence } = req.body
  const id = `CG-${Date.now()}`
  const newIncident = {
    id,
    type: type || 'Unknown',
    location,
    severity: severity || 'low',
    status: 'active',
    aiConfidence: 0,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    description: description || '',
    evidence: evidence || [],
  }
  incidents.push(newIncident)
  res.status(201).json(newIncident)
})

// PATCH /api/incidents/:id — update status
router.patch('/:id', (req, res) => {
  const incident = incidents.find((i) => i.id === req.params.id)
  if (!incident) return res.status(404).json({ error: 'Incident not found' })
  const { status, aiConfidence, analysis } = req.body
  if (status) incident.status = status
  if (aiConfidence) incident.aiConfidence = aiConfidence
  if (analysis) incident.analysis = analysis
  res.json(incident)
})

export default router
