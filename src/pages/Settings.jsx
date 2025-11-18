import { useTheme } from '../lib/useTheme'

export default function Settings(){
  const { theme, toggle } = useTheme()
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h2 className="font-semibold mb-2">Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">Theme</div>
            <div className="text-xs text-slate-500">Light or dark</div>
          </div>
          <button onClick={toggle} className="h-10 px-4 rounded-md bg-slate-100 dark:bg-slate-900">{theme==='dark'?'Switch to light':'Switch to dark'}</button>
        </div>
      </section>
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h2 className="font-semibold mb-2">Privacy</h2>
        <p className="text-sm text-slate-500">More controls coming soon.</p>
      </section>
    </div>
  )
}
