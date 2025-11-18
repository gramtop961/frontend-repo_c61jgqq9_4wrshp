import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, Search, PlusSquare, PlaySquare, User, Bell } from '../ui/Icons'
import Button from '../ui/Button'
import { useTheme } from '../../lib/useTheme'

export default function AppShell() {
  const { theme, toggle } = useTheme()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800/70 backdrop-blur bg-white/70 dark:bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-3">
          <div className="font-extrabold tracking-tight text-xl">Stranger</div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="subtle" aria-label="Toggle theme" onClick={toggle}>{theme === 'dark' ? 'Light' : 'Dark'}</Button>
            <NavLink to="/notifications" className={({isActive})=>`p-2 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800/60 ${isActive?'text-blue-600':''}`} aria-label="Notifications"><Bell size={20}/></NavLink>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-3">
        <Outlet />
      </main>

      {/* Bottom tabs (mobile) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/50 md:hidden">
        <div className="grid grid-cols-5 h-14">
          <Tab to="/" icon={<Home size={22} />} current={location.pathname === '/'} label="Feed" />
          <Tab to="/explore" icon={<Search size={22} />} current={location.pathname.startsWith('/explore')} label="Explore" />
          <Tab to="/create" icon={<PlusSquare size={24} />} current={location.pathname.startsWith('/create')} label="Create" />
          <Tab to="/reels" icon={<PlaySquare size={22} />} current={location.pathname.startsWith('/reels')} label="Reels" />
          <Tab to="/u/me" icon={<User size={22} />} current={location.pathname.startsWith('/u')} label="Profile" />
        </div>
      </nav>
    </div>
  )
}

function Tab({ to, icon, label, current }) {
  return (
    <NavLink to={to} className="flex flex-col items-center justify-center gap-0.5 text-xs" aria-label={label}>
      <div className={`p-2 rounded-xl transition ${current ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300'} `}>
        {icon}
      </div>
      <span className={`${current ? 'text-blue-600' : 'text-slate-500'}`}>{label}</span>
    </NavLink>
  )
}
