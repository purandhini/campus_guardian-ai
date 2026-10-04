import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  FilePlus,
  FolderOpen,
  BrainCircuit,
  History,
  ShieldAlert,
  BarChart3,
  Settings,
  ShieldCheck,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/report', label: 'Report Incident', icon: FilePlus },
  { to: '/evidence', label: 'Evidence Center', icon: FolderOpen },
  { to: '/analysis', label: 'AI Analysis', icon: BrainCircuit },
  { to: '/history', label: 'Incident History', icon: History },
  { to: '/response', label: 'Response Center', icon: ShieldAlert },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden btn-ghost p-2"
      >
        {mobileOpen ? <X size={20} /> : <LayoutDashboard size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-navy-950 border-r border-navy-800 flex flex-col z-40 transition-transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-navy-800">
          <div className="w-10 h-10 rounded-lg bg-navy-600 flex items-center justify-center">
            <ShieldCheck className="text-white" size={22} />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm leading-tight">CampusGuardian</h1>
            <p className="text-navy-500 text-xs">AI Platform</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-navy-800">
          <div className="text-xs text-navy-500">
            <p className="font-semibold text-navy-400">See. Understand. Decide. Respond.</p>
            <p className="mt-1">v1.0 Prototype</p>
          </div>
        </div>
      </aside>
    </>
  )
}
