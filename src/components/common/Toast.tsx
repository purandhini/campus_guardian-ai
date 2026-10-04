import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type?: 'success' | 'info' | 'warning'
  onClose: () => void
}

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const icons = {
    success: <CheckCircle2 className="text-green-400" size={20} />,
    info: <Info className="text-blue-400" size={20} />,
    warning: <AlertTriangle className="text-yellow-400" size={20} />,
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-navy-900 border border-navy-700 rounded-xl px-4 py-3 shadow-xl">
        {icons[type]}
        <p className="text-sm text-navy-100">{message}</p>
        <button onClick={onClose} className="ml-2 text-navy-500 hover:text-navy-300">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
