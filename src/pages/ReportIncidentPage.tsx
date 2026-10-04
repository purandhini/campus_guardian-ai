import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Image as ImageIcon, Upload, MapPin, Calendar, Clock, User, Phone, Sparkles, X } from 'lucide-react'
import type { Evidence } from '../types'
import { useIncidentStore } from '../store/useIncidentStore'

const LOCATIONS = [
  'Academic Block', 'Hostel A', 'Hostel B', 'Library',
  'Laboratory', 'Cafeteria', 'Main Gate', 'Parking Area', 'Sports Ground',
]

let evIdCounter = 0

export default function ReportIncidentPage() {
  const navigate = useNavigate()
  const { addEvidence, evidencePackage, analyzeIncident, showToast, loadDemoScenario } = useIncidentStore()

  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reporter, setReporter] = useState('')
  const [contact, setContact] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const evidence: Evidence = {
        id: `ev-img-${evIdCounter++}`,
        type: 'image',
        title: 'Uploaded Image',
        content: `Uploaded image: ${file.name}`,
        fileName: file.name,
        fileDataUrl: reader.result as string,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      }
      addEvidence(evidence)
      showToast('Image uploaded successfully.', 'success')
    }
    reader.readAsDataURL(file)
  }, [addEvidence, showToast])

  const handleDocUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const evidence: Evidence = {
      id: `ev-doc-${evIdCounter++}`,
      type: 'document',
      title: 'Uploaded Document',
      content: `Document: ${file.name}. Type: ${file.type || 'unknown'}. Size: ${(file.size / 1024).toFixed(1)} KB.`,
      fileName: file.name,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }
    addEvidence(evidence)
    showToast('Document uploaded successfully.', 'success')
  }, [addEvidence, showToast])

  const handleAnalyze = async () => {
    if (!description.trim() && evidencePackage.length === 0) {
      showToast('Please add evidence before analyzing.', 'warning')
      return
    }
    if (!location) {
      showToast('Please select a location.', 'warning')
      return
    }

    setIsAnalyzing(true)
    showToast('AI analysis started...', 'info')
    await analyzeIncident(location, description)
    setIsAnalyzing(false)
    navigate('/analysis')
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">Report an Incident</h1>
        <p className="text-navy-400 text-sm mt-1">
          Upload evidence from multiple sources for AI-powered analysis
        </p>
      </div>

      {/* Text input */}
      <div className="card p-5">
        <label className="flex items-center gap-2 text-sm font-medium text-navy-200 mb-2">
          <FileText size={16} /> Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Describe what happened..."
          className="input-field resize-none"
        />
      </div>

      {/* Upload zone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image upload */}
        <div className="card p-5">
          <label className="flex items-center gap-2 text-sm font-medium text-navy-200 mb-3">
            <ImageIcon size={16} /> Upload Photo / Screenshot
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-navy-700 rounded-lg p-8 cursor-pointer hover:border-navy-500 transition-colors">
            <Upload className="text-navy-500 mb-2" size={28} />
            <span className="text-sm text-navy-400">Click to upload image</span>
            <span className="text-xs text-navy-600 mt-1">PNG, JPG up to 5MB</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        {/* Document upload */}
        <div className="card p-5">
          <label className="flex items-center gap-2 text-sm font-medium text-navy-200 mb-3">
            <FileText size={16} /> Upload PDF / Document
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-navy-700 rounded-lg p-8 cursor-pointer hover:border-navy-500 transition-colors">
            <Upload className="text-navy-500 mb-2" size={28} />
            <span className="text-sm text-navy-400">Click to upload document</span>
            <span className="text-xs text-navy-600 mt-1">PDF, DOC up to 10MB</span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleDocUpload} />
          </label>
        </div>
      </div>

      {/* Uploaded evidence list */}
      {evidencePackage.length > 0 && (
        <div className="card p-5">
          <h3 className="text-sm font-medium text-navy-200 mb-3">Uploaded Evidence ({evidencePackage.length})</h3>
          <div className="space-y-2">
            {evidencePackage.map((ev) => (
              <div key={ev.id} className="flex items-center gap-3 bg-navy-950 rounded-lg p-3 border border-navy-800">
                {ev.type === 'image' ? <ImageIcon className="text-blue-400" size={18} /> : <FileText className="text-purple-400" size={18} />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{ev.fileName || ev.title}</p>
                  <p className="text-xs text-navy-500">{ev.timestamp}</p>
                </div>
                {ev.fileDataUrl && (
                  <img src={ev.fileDataUrl} alt="preview" className="w-10 h-10 object-cover rounded" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Location & details */}
      <div className="card p-5">
        <h3 className="text-sm font-medium text-navy-200 mb-4">Incident Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-xs text-navy-400 mb-1.5">
              <MapPin size={14} /> Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field cursor-pointer"
            >
              <option value="">Select location...</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-navy-400 mb-1.5">
              <Calendar size={14} /> Date
            </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-navy-400 mb-1.5">
              <Clock size={14} /> Time
            </label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-navy-400 mb-1.5">
              <User size={14} /> Reporter Name
            </label>
            <input type="text" placeholder="Optional" value={reporter} onChange={(e) => setReporter(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-navy-400 mb-1.5">
              <Phone size={14} /> Contact Number
            </label>
            <input type="text" placeholder="Optional" value={contact} onChange={(e) => setContact(e.target.value)} className="input-field" />
          </div>
        </div>
      </div>

      {/* Analyze button */}
      <div className="flex justify-center pb-6">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="btn-primary px-8 py-3.5 text-base"
        >
          <Sparkles size={20} />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Incident with AI'}
        </button>
      </div>
    </div>
  )
}
