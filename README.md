# CampusGuardian AI

> **See. Understand. Decide. Respond.**
>
> AI-powered multimodal incident intelligence platform for campus safety.

## Overview

CampusGuardian AI is a hackathon prototype that demonstrates how AI can combine text, images, and documents to detect, assess, and respond to campus incidents.

The application follows a four-stage workflow:

1. **SEE** — Collect multimodal evidence (text, images, PDFs, reports)
2. **UNDERSTAND** — AI combines and interprets all evidence sources together
3. **DECIDE** — AI determines severity and explains its reasoning
4. **RESPOND** — AI recommends the appropriate action; human authority approves

## Quick Start

```bash
# Install frontend dependencies
cd campusguardian-ai
npm install

# Start the frontend dev server
npm run dev
# → http://localhost:5173
```

The frontend works standalone with mock data. To also run the backend API:

```bash
# In a second terminal
cd campusguardian-ai/backend
npm install
npm run dev
# → http://localhost:3001
```

Or run both together:

```bash
# From the project root
npm install
npm run dev:full
```

## Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React 18 + Vite + TypeScript |
| Styling     | Tailwind CSS (dark navy theme) |
| Charts      | Recharts                    |
| Routing     | React Router (HashRouter)   |
| Icons       | lucide-react                |
| Backend     | Node.js + Express            |
| AI Service  | Mock (Gemini-ready)          |
| Database    | In-memory mock (Firestore-ready) |

## Features

### Dashboard
- Summary cards: Active, Critical, Under Investigation, Resolved
- Live incident feed with severity indicators
- SEE → UNDERSTAND → DECIDE → RESPOND visual flow
- Demo scenario quick-load buttons

### Report Incident
- Text description input
- Image upload (drag & drop)
- PDF/document upload
- Location selector dropdown
- Optional metadata (date, time, reporter, contact)
- "Analyze Incident with AI" button

### Evidence Center
- Combined evidence package view
- Visual evidence timeline
- Metadata display
- Shows all evidence types together (text, image, document)

### AI Analysis (Core Feature)
- Animated AI processing (6 steps)
- Incident type classification
- Severity score (0–100)
- Confidence percentage
- AI summary combining all evidence
- Evidence correlation cards ("Why did AI classify this as Critical?")
- Combined risk assessment

### Response Center
- Recommended response actions (step-by-step)
- Response priority (P0–P3)
- Recommended team, ETA, escalation path
- Simulated action buttons (Dispatch Security, Start Evacuation, etc.)
- Toast notifications for actions

### Incident History
- Filterable table (severity, status, type, location, search)
- AI confidence indicators
- Status badges

### Analytics
- Incidents by Type (bar chart)
- Incidents by Severity (pie chart)
- Response Time trends (line chart)
- AI Performance metrics

### Settings
- Notification toggles
- AI configuration (Gemini API key field)
- Google Cloud integration status panel

## Demo Scenarios

The prototype includes 4 preloaded demo scenarios for instant demonstration:

| # | Scenario           | Severity  | Evidence                        |
|---|--------------------|-----------|---------------------------------|
| 1 | Electrical Fire    | Critical  | Smoke image + Text + Inspection report |
| 2 | Medical Emergency  | High      | Student report + Location photo  |
| 3 | Unauthorized Entry | Medium    | CCTV screenshot + Security message |
| 4 | Water Leakage      | Medium    | Leakage photo + Maintenance report + Text |

Click any scenario card on the Dashboard to load it, then navigate to Evidence Center → AI Analysis.

## Architecture

```
campusguardian-ai/
├── src/
│   ├── types/           # TypeScript domain models
│   ├── data/            # Mock incident data & demo scenarios
│   ├── services/
│   │   └── aiService.ts # AI abstraction layer (mock + Gemini-ready)
│   ├── store/           # State management hook
│   ├── components/
│   │   ├── layout/      # Sidebar, Header, Layout
│   │   ├── common/      # Toast, Badges
│   │   ├── dashboard/   # StatsCards, StageFlow, LiveIncidentFeed
│   │   └── demo/        # DemoScenarios
│   └── pages/           # 8 pages (Dashboard, Report, Evidence, Analysis, etc.)
├── backend/
│   └── src/
│       ├── routes/      # Express API routes
│       └── services/    # Mock AI service (Gemini-ready)
├── public/
└── package.json
```

## Connecting Google Gemini API

The AI service is abstracted in `src/services/aiService.ts`. To use real Gemini multimodal analysis:

### Frontend
1. Add your API key to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
2. Implement a `GeminiAIService` class following the `AIService` interface
3. Swap the export in `aiService.ts`:
   ```typescript
   const apiKey = import.meta.env.VITE_GEMINI_API_KEY
   export const aiService = apiKey ? new GeminiAIService(apiKey) : new MockAIService()
   ```

### Backend
1. Install: `npm install @google/generative-ai`
2. Set `GEMINI_API_KEY` environment variable
3. Replace mock functions in `backend/src/services/mockAI.js` with Gemini calls
4. Use `gemini-1.5-flash` or `gemini-1.5-pro` for multimodal input (text + images)

**⚠️ Never expose API keys in frontend code.** For production, proxy through the backend.

## Google Cloud Integration

| Service              | Purpose                          | Status        |
|----------------------|----------------------------------|---------------|
| Vertex AI / Gemini    | Multimodal reasoning              | Placeholder   |
| Cloud Storage        | Evidence file storage             | Placeholder   |
| Cloud Run            | Backend deployment                | Placeholder   |
| Firestore            | Incident database                 | Placeholder   |
| Firebase Auth         | User authentication               | Placeholder   |
| Cloud Logging        | Monitoring & logs                 | Placeholder   |

Each service has a clean interface placeholder. The mock implementations can be swapped with real GCP services without changing the UI.

## Safety Notice

> **This is a decision-support system.** AI recommendations are displayed as "AI-generated recommendation — requires human verification." The system does NOT make final decisions. Campus authorities remain responsible for approving and executing all actions.

## License

MIT — Free to use for hackathon and educational purposes.
