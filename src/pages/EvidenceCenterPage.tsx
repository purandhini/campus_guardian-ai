import { useIncidentStore } from '../store/useIncidentStore'
import { FileText, Image as ImageIcon, Clock, MapPin, Package } from 'lucide-react'

export default function EvidenceCenterPage() {
  const { evidencePackage } = useIncidentStore()

  const packageId = 'CG-2026-001'

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Multimodal Evidence Center</h1>
        <p className="text-navy-400 text-sm mt-1">
          All evidence sources combined and correlated for holistic analysis
        </p>
      </div>

      {evidencePackage.length === 0 ? (
        <div className="card p-12 text-center">
          <Package className="text-navy-600 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-navy-300">No evidence collected yet</h3>
          <p className="text-navy-500 text-sm mt-2">
            Go to Report Incident to upload evidence, or load a demo scenario from the Dashboard.
          </p>
        </div>
      ) : (
        <>
          {/* Evidence Package header */}
          <div className="card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-navy-600 flex items-center justify-center">
                <Package className="text-white" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-white">Evidence Package #{packageId}</h2>
                <p className="text-xs text-navy-500">
                  {evidencePackage.length} evidence items · Combined for multimodal analysis
                </p>
              </div>
            </div>
          </div>

          {/* Evidence items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidencePackage.map((ev) => (
              <div key={ev.id} className="card p-4 card-hover">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  {ev.type === 'image' ? (
                    <ImageIcon className="text-blue-400" size={18} />
                  ) : ev.type === 'document' ? (
                    <FileText className="text-purple-400" size={18} />
                  ) : (
                    <FileText className="text-green-400" size={18} />
                  )}
                  <span className="text-sm font-medium text-white">{ev.title}</span>
                  <span className="badge bg-navy-700/40 text-navy-300 ml-auto text-xs">{ev.type}</span>
                </div>

                {/* Image preview */}
                {ev.fileDataUrl && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <img src={ev.fileDataUrl} alt={ev.title} className="w-full h-40 object-cover" />
                  </div>
                )}

                {/* Content */}
                <p className="text-sm text-navy-300 leading-relaxed line-clamp-3">{ev.content}</p>

                {/* Meta */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-navy-800/60 text-xs text-navy-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {ev.timestamp}
                  </span>
                  {ev.fileName && (
                    <span className="flex items-center gap-1 truncate">
                      <FileText size={12} /> {ev.fileName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Evidence Timeline */}
          <div className="card p-5">
            <h3 className="font-semibold text-white text-sm mb-4">Evidence Timeline</h3>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-navy-700" />
              {evidencePackage.map((ev, i) => (
                <div key={ev.id} className="relative mb-6 last:mb-0">
                  {/* Dot */}
                  <div className={`absolute -left-4.5 top-1 w-3 h-3 rounded-full border-2 border-navy-950 ${
                    ev.type === 'image' ? 'bg-blue-500' : ev.type === 'document' ? 'bg-purple-500' : 'bg-green-500'
                  }`} />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-white">{ev.title}</p>
                    <p className="text-xs text-navy-500">{ev.timestamp} · {ev.type}</p>
                    <p className="text-xs text-navy-400 mt-1 line-clamp-2">{ev.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="card p-5">
            <h3 className="font-semibold text-white text-sm mb-4">Package Metadata</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-xs text-navy-500">Package ID</p>
                <p className="text-white font-mono mt-0.5">#{packageId}</p>
              </div>
              <div>
                <p className="text-xs text-navy-500">Evidence Count</p>
                <p className="text-white mt-0.5">{evidencePackage.length} items</p>
              </div>
              <div>
                <p className="text-xs text-navy-500">Evidence Types</p>
                <p className="text-white mt-0.5">
                  {[...new Set(evidencePackage.map((e) => e.type))].join(', ')}
                </p>
              </div>
              <div>
                <p className="text-xs text-navy-500">Status</p>
                <span className="badge bg-blue-500/15 text-blue-400 mt-0.5">Ready for AI</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
