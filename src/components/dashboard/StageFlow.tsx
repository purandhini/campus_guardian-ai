import { Eye, BrainCircuit, Scale, Zap } from 'lucide-react'

const stages = [
  { icon: Eye, title: 'SEE', desc: 'Collect multimodal evidence — text, images, documents, and reports.', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { icon: BrainCircuit, title: 'UNDERSTAND', desc: 'AI combines and interprets evidence from all sources together.', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  { icon: Scale, title: 'DECIDE', desc: 'AI determines severity and explains its reasoning transparently.', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  { icon: Zap, title: 'RESPOND', desc: 'AI recommends the right action. Human authority approves execution.', color: 'text-green-400', bgColor: 'bg-green-500/10' },
]

export default function StageFlow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stages.map((s, i) => (
        <div key={s.title} className="relative">
          <div className="card p-4 h-full">
            <div className={`w-10 h-10 rounded-lg ${s.bgColor} flex items-center justify-center mb-3`}>
              <s.icon className={s.color} size={20} />
            </div>
            <h3 className={`font-bold text-sm tracking-wide ${s.color}`}>{s.title}</h3>
            <p className="text-xs text-navy-400 mt-1.5 leading-relaxed">{s.desc}</p>
          </div>
          {/* Connector arrow */}
          {i < 3 && (
            <div className="hidden md:flex absolute top-1/2 -right-2.5 -translate-y-1/2 z-10 text-navy-700">
              →
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
