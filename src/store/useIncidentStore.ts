import { useState, useCallback } from 'react'
import type { Incident, Evidence, AIAnalysisResult, ResponseRecommendation, IncidentStatus } from '../types'
import { aiService } from '../services/aiService'

/**
 * Custom hook managing the application's incident state.
 * In production this would sync with Firestore.
 */

let nextId = 100
const genId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${nextId++}`

export function useIncidentStore() {
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null)
  const [evidencePackage, setEvidencePackage] = useState<Evidence[]>([])
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null)
  const [recommendation, setRecommendation] = useState<ResponseRecommendation | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null)
  const [actionLog, setActionLog] = useState<string[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const addEvidence = useCallback((evidence: Evidence) => {
    setEvidencePackage((prev) => [...prev, evidence])
  }, [])

  const removeEvidence = useCallback((id: string) => {
    setEvidencePackage((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const clearEvidence = useCallback(() => {
    setEvidencePackage([])
    setAnalysisResult(null)
    setRecommendation(null)
    setCurrentIncident(null)
  }, [])

  const loadDemoScenario = useCallback((scenario: { id: string; title: string; evidence: Evidence[]; location: string }) => {
    setEvidencePackage(scenario.evidence)
    showToast(`Loaded scenario: ${scenario.title}`, 'info')
  }, [showToast])

  const analyzeIncident = useCallback(
    async (location: string, description: string) => {
      setIsAnalyzing(true)
      setAnalysisResult(null)
      setRecommendation(null)

      // Simulate the AI processing steps
      const steps = [
        'Reading text evidence...',
        'Analyzing image evidence...',
        'Extracting document information...',
        'Correlating evidence sources...',
        'Assessing severity...',
        'Generating response recommendation...',
      ]

      for (let i = 0; i < steps.length; i++) {
        setAnalysisStep(i)
        await new Promise((r) => setTimeout(r, 500))
      }

      const allEvidence = [...evidencePackage]
      if (description.trim()) {
        allEvidence.unshift({
          id: genId('ev'),
          type: 'text',
          title: 'Incident Description',
          content: description,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        })
      }

      const result = await aiService.analyzeIncident(allEvidence, location)
      const rec = await aiService.generateResponseRecommendation(result)

      setAnalysisResult(result)
      setRecommendation(rec)
      setIsAnalyzing(false)
      setAnalysisStep(0)

      return { result, rec }
    },
    [evidencePackage]
  )

  const executeAction = useCallback(
    (action: string) => {
      setActionLog((prev) => [...prev, action])
      showToast(`${action} completed successfully.`, 'success')
    },
    [showToast]
  )

  const updateIncidentStatus = useCallback(
    (incidentId: string, status: IncidentStatus) => {
      setIncidents((prev) =>
        prev.map((inc) => (inc.id === incidentId ? { ...inc, status } : inc))
      )
      showToast(`Incident ${incidentId} status updated to ${status}.`, 'info')
    },
    [showToast]
  )

  return {
    currentIncident,
    setCurrentIncident,
    evidencePackage,
    setEvidencePackage,
    analysisResult,
    setAnalysisResult,
    recommendation,
    setRecommendation,
    isAnalyzing,
    analysisStep,
    incidents,
    setIncidents,
    toast,
    showToast,
    actionLog,
    addEvidence,
    removeEvidence,
    clearEvidence,
    loadDemoScenario,
    analyzeIncident,
    executeAction,
    updateIncidentStatus,
  }
}
