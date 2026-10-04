import { Bell, ChevronDown, Search } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [campus] = useState('Northgate University')
  const [showNotifs, setShowNotifs] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-navy-950/95 backdrop-blur border-b border-navy-800 px-4 md:px-6 py-3 flex items-center justify-between gap-4">
      {/* Campus selector */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <select
            value={campus}
            onChange={() => {}}
            className="appearance-none bg-navy-900 border border-navy-800 rounded-lg pl-3 pr-9 py-2 text-sm font-medium text-navy-100 focus:outline-none focus:border-navy-600 cursor-pointer"
          >
            <option>Northgate University</option>
            <option>Eastview Campus</option>
            <option>Southridge College</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500" size={16} />
          <input
            type="text"
            placeholder="Search incidents, evidence, locations..."
            className="w-full bg-navy-900 border border-navy-800 rounded-lg pl-10 pr-4 py-2 text-sm text-navy-100 placeholder-navy-500 focus:outline-none focus:border-navy-600"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-lg hover:bg-navy-800 transition-colors"
          >
            <Bell className="text-navy-300" size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 bg-navy-900 border border-navy-800 rounded-xl shadow-xl z-50 animate-fade-in">
              <div className="p-3 border-b border-navy-800">
                <h3 className="font-semibold text-sm text-white">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {[
                  { id: 1, text: 'Critical: Smoke near Academic Block', time: '2m ago' },
                  { id: 2, text: 'Medical emergency resolved at Hostel B', time: '1h ago' },
                  { id: 3, text: 'New evidence uploaded for CG-2026-003', time: '3h ago' },
                ].map((n) => (
                  <div key={n.id} className="p-3 border-b border-navy-800/50 hover:bg-navy-800/50 cursor-pointer">
                    <p className="text-sm text-navy-200">{n.text}</p>
                    <p className="text-xs text-navy-500 mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-500 to-navy-700 flex items-center justify-center text-white font-semibold text-sm">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">Admin</p>
            <p className="text-xs text-navy-500">Campus Authority</p>
          </div>
        </div>
      </div>
    </header>
  )
}
