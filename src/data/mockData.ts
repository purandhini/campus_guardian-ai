import type { Incident, DemoScenario } from '../types'

// ─── Active incident feed data ───────────────────────────────────
export const mockIncidents: Incident[] = [
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
    evidence: [],
    timeline: [
      { id: '1', time: '10:38 AM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '10:40 AM', event: 'Image uploaded', type: 'evidence' },
      { id: '3', time: '10:41 AM', event: 'Document analyzed', type: 'analysis' },
      { id: '4', time: '10:42 AM', event: 'AI identified critical risk', type: 'analysis' },
      { id: '5', time: '10:43 AM', event: 'Security team notified', type: 'response' },
      { id: '6', time: '10:44 AM', event: 'Response initiated', type: 'response' },
    ],
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
    evidence: [],
    timeline: [
      { id: '1', time: '09:15 AM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '09:16 AM', event: 'AI analysis complete', type: 'analysis' },
      { id: '3', time: '09:17 AM', event: 'Medical team dispatched', type: 'response' },
      { id: '4', time: '09:45 AM', event: 'Incident resolved', type: 'update' },
    ],
  },
  {
    id: 'CG-2026-003',
    type: 'Unauthorized Entry',
    location: 'North Gate',
    severity: 'medium',
    status: 'investigating',
    aiConfidence: 87,
    date: '2026-10-04',
    time: '08:42 AM',
    description: 'Unauthorized entry detected at North Gate',
    evidence: [],
    timeline: [
      { id: '1', time: '08:42 AM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '08:44 AM', event: 'AI analysis complete', type: 'analysis' },
      { id: '3', time: '08:45 AM', event: 'Security team dispatched', type: 'response' },
    ],
  },
  {
    id: 'CG-2026-004',
    type: 'Water Leakage',
    location: 'Academic Block',
    severity: 'low',
    status: 'resolved',
    aiConfidence: 96,
    date: '2026-10-03',
    time: '14:20 PM',
    description: 'Water leakage reported in Academic Block washroom',
    evidence: [],
    timeline: [
      { id: '1', time: '02:20 PM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '02:22 PM', event: 'AI analysis complete', type: 'analysis' },
      { id: '3', time: '02:30 PM', event: 'Maintenance team notified', type: 'response' },
      { id: '4', time: '04:00 PM', event: 'Incident resolved', type: 'update' },
    ],
  },
  {
    id: 'CG-2026-005',
    type: 'Security Incident',
    location: 'Parking Area',
    severity: 'medium',
    status: 'investigating',
    aiConfidence: 89,
    date: '2026-10-03',
    time: '16:30 PM',
    description: 'Suspicious vehicle parked near main building',
    evidence: [],
    timeline: [
      { id: '1', time: '04:30 PM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '04:33 PM', event: 'AI analysis complete', type: 'analysis' },
    ],
  },
  {
    id: 'CG-2026-006',
    type: 'Infrastructure Issue',
    location: 'Library',
    severity: 'low',
    status: 'resolved',
    aiConfidence: 93,
    date: '2026-10-03',
    time: '11:00 AM',
    description: 'Heating system malfunction in Library',
    evidence: [],
    timeline: [
      { id: '1', time: '11:00 AM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '11:05 AM', event: 'AI analysis complete', type: 'analysis' },
      { id: '3', time: '11:30 AM', event: 'Maintenance team notified', type: 'response' },
      { id: '4', time: '01:00 PM', event: 'Incident resolved', type: 'update' },
    ],
  },
  {
    id: 'CG-2026-007',
    type: 'Medical Emergency',
    location: 'Sports Ground',
    severity: 'high',
    status: 'responding',
    aiConfidence: 90,
    date: '2026-10-04',
    time: '11:55 AM',
    description: 'Student injured during sports activity',
    evidence: [],
    timeline: [
      { id: '1', time: '11:55 AM', event: 'Incident reported', type: 'report' },
      { id: '2', time: '11:56 AM', event: 'AI analysis complete', type: 'analysis' },
      { id: '3', time: '11:57 AM', event: 'Medical team dispatched', type: 'response' },
    ],
  },
]

// ─── Dashboard summary stats ─────────────────────────────────────
export const dashboardStats = {
  activeIncidents: 7,
  criticalIncidents: 2,
  underInvestigation: 3,
  resolvedToday: 12,
}

// ─── Incident history table data ──────────────────────────────────
export const incidentHistory = [
  { id: 'CG-001', type: 'Electrical Hazard', location: 'Academic Block', severity: 'critical' as const, aiConfidence: 94, status: 'Responding' as const, date: '2026-10-04' },
  { id: 'CG-002', type: 'Medical Emergency', location: 'Hostel B', severity: 'high' as const, aiConfidence: 91, status: 'Resolved' as const, date: '2026-10-04' },
  { id: 'CG-003', type: 'Unauthorized Entry', location: 'North Gate', severity: 'medium' as const, aiConfidence: 87, status: 'Investigating' as const, date: '2026-10-04' },
  { id: 'CG-004', type: 'Water Leakage', location: 'Hostel A', severity: 'low' as const, aiConfidence: 96, status: 'Resolved' as const, date: '2026-10-03' },
  { id: 'CG-005', type: 'Security Incident', location: 'Parking Area', severity: 'medium' as const, aiConfidence: 89, status: 'Investigating' as const, date: '2026-10-03' },
  { id: 'CG-006', type: 'Infrastructure Issue', location: 'Library', severity: 'low' as const, aiConfidence: 93, status: 'Resolved' as const, date: '2026-10-03' },
  { id: 'CG-007', type: 'Medical Emergency', location: 'Sports Ground', severity: 'high' as const, aiConfidence: 90, status: 'Responding' as const, date: '2026-10-04' },
  { id: 'CG-008', type: 'Fire', location: 'Cafeteria', severity: 'critical' as const, aiConfidence: 95, status: 'Resolved' as const, date: '2026-10-02' },
  { id: 'CG-009', type: 'Security Incident', location: 'Main Gate', severity: 'medium' as const, aiConfidence: 88, status: 'Resolved' as const, date: '2026-10-02' },
  { id: 'CG-010', type: 'Water Leakage', location: 'Laboratory', severity: 'low' as const, aiConfidence: 97, status: 'Resolved' as const, date: '2026-10-01' },
]

// ─── Analytics data ──────────────────────────────────────────────
export const incidentsByType = [
  { name: 'Security', count: 18 },
  { name: 'Medical', count: 12 },
  { name: 'Fire', count: 6 },
  { name: 'Infrastructure', count: 9 },
  { name: 'Unauthorized Access', count: 7 },
]

export const incidentsBySeverity = [
  { name: 'Critical', count: 4 },
  { name: 'High', count: 8 },
  { name: 'Medium', count: 15 },
  { name: 'Low', count: 22 },
]

export const responseTimeData = [
  { name: 'Mon', time: 3.2 },
  { name: 'Tue', time: 2.8 },
  { name: 'Wed', time: 4.1 },
  { name: 'Thu', time: 2.5 },
  { name: 'Fri', time: 3.0 },
  { name: 'Sat', time: 5.2 },
  { name: 'Sun', time: 4.8 },
]

export const aiPerformance = {
  evidenceProcessed: 142,
  averageConfidence: 91,
  incidentsAnalyzed: 49,
  averageRecommendationTime: 2.3,
}

// ─── Demo scenarios ──────────────────────────────────────────────
export const demoScenarios: DemoScenario[] = [
  {
    id: 'demo-1',
    title: 'Electrical Fire',
    description: 'Smoke detected near electrical equipment in Academic Block',
    expectedSeverity: 'critical',
    expectedType: 'Electrical Fire / Smoke Hazard',
    expectedResponse: 'Evacuate + Security + Maintenance',
    location: 'Academic Block',
    evidence: [
      {
        id: 'ev-1',
        type: 'text',
        title: 'Text Report',
        content: 'Smoke is coming from the electrical room near Block A. There is a burning smell and the corridor is filling with smoke.',
        timestamp: '10:38 AM',
      },
      {
        id: 'ev-2',
        type: 'image',
        title: 'Smoke Photo',
        content: 'Visible smoke detected near electrical equipment',
        fileName: 'smoke_electrical.jpg',
        timestamp: '10:40 AM',
      },
      {
        id: 'ev-3',
        type: 'document',
        title: 'Inspection Report',
        content: 'Electrical inspection report showing previous maintenance concerns with wiring in Block A electrical room. Report dated 2026-09-15 flagged overheating risk.',
        fileName: 'electrical_inspection_report.pdf',
        timestamp: '10:41 AM',
      },
    ],
  },
  {
    id: 'demo-2',
    title: 'Medical Emergency',
    description: 'Student reported unconscious near Hostel B',
    expectedSeverity: 'high',
    expectedType: 'Medical Emergency',
    expectedResponse: 'Contact campus medical team + security',
    location: 'Hostel B',
    evidence: [
      {
        id: 'ev-4',
        type: 'text',
        title: 'Student Report',
        content: 'A student collapsed near Hostel B entrance. He is unresponsive and breathing faintly. Need immediate medical help.',
        timestamp: '09:15 AM',
      },
      {
        id: 'ev-5',
        type: 'image',
        title: 'Location Photo',
        content: 'Photo showing student on ground near Hostel B entrance with students gathered around.',
        fileName: 'medical_emergency.jpg',
        timestamp: '09:16 AM',
      },
    ],
  },
  {
    id: 'demo-3',
    title: 'Unauthorized Entry',
    description: 'Unknown person detected entering through North Gate after hours',
    expectedSeverity: 'medium',
    expectedType: 'Unauthorized Entry',
    expectedResponse: 'Dispatch security + verify identity',
    location: 'North Gate',
    evidence: [
      {
        id: 'ev-6',
        type: 'image',
        title: 'CCTV Screenshot',
        content: 'CCTV footage showing an unidentified person entering through North Gate at 02:30 AM. Face partially visible.',
        fileName: 'cctv_northgate.png',
        timestamp: '02:30 AM',
      },
      {
        id: 'ev-7',
        type: 'text',
        title: 'Security Message',
        content: 'Security guard reports unknown person seen entering through North Gate. No visitor log entry found for this individual.',
        timestamp: '02:32 AM',
      },
    ],
  },
  {
    id: 'demo-4',
    title: 'Water Leakage',
    description: 'Water leakage reported in Laboratory block',
    expectedSeverity: 'medium',
    expectedType: 'Water Leakage',
    expectedResponse: 'Maintenance team',
    location: 'Laboratory',
    evidence: [
      {
        id: 'ev-8',
        type: 'image',
        title: 'Leakage Photo',
        content: 'Photograph showing water dripping from ceiling in Laboratory room 204. Water pooling on floor near electrical outlets.',
        fileName: 'water_leak_lab.jpg',
        timestamp: '14:20 PM',
      },
      {
        id: 'ev-9',
        type: 'document',
        title: 'Maintenance Report',
        content: 'Maintenance report indicating recurring plumbing issues in Laboratory block. Last repair conducted on 2026-08-10.',
        fileName: 'maintenance_report.pdf',
        timestamp: '14:22 PM',
      },
      {
        id: 'ev-10',
        type: 'text',
        title: 'Report Text',
        content: 'Water is leaking from the ceiling in Lab 204. The floor is wet and there are electrical outlets nearby which could be dangerous.',
        timestamp: '14:20 PM',
      },
    ],
  },
]
