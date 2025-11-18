import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Reels from './pages/Reels'
import Create from './pages/Create'
import Stories from './pages/Stories'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import DM from './pages/DM'
import Auth from './pages/Auth'
import Settings from './pages/Settings'
import Spline from '@splinetool/react-spline'

function HomeHero(){
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="h-64 sm:h-72 md:h-80">
        <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 to-transparent/40" />
      <div className="absolute bottom-4 left-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Stranger</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">A minimal social app — fast, clean, and playful.</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<>
          <HomeHero />
          <div className="mt-4"><Stories /></div>
          <div className="mt-4"><Feed /></div>
        </>} />
        <Route path="explore" element={<Explore />} />
        <Route path="reels" element={<Reels />} />
        <Route path="create" element={<Create />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="u/:username" element={<Profile />} />
        <Route path="dm" element={<DM />} />
        <Route path="auth" element={<Auth />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
