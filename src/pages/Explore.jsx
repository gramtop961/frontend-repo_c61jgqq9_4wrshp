import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Explore() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await api.getExplore()
        setItems(data.items)
      } catch {
        const demo = Array.from({ length: 18 }).map((_, i) => ({
          id: i,
          src: `https://images.unsplash.com/photo-${1580000000000 + i}?q=80&w=600&auto=format&fit=crop`,
        }))
        setItems(demo)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="sticky top-14 -mx-4 px-4 py-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="w-full h-10 rounded-lg bg-slate-100 dark:bg-slate-900 px-3 outline-none"
        />
      </div>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-2 space-y-2">
        {(loading ? Array.from({ length: 12 }) : items)
          .filter((it) => !q || it.alt?.includes(q) || it.tag?.includes(q))
          .map((it, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900">
              <img src={it.src || `https://picsum.photos/seed/${i}/600/800`} alt="" className="w-full hover:scale-105 transition" />
            </div>
          ))}
      </div>
    </div>
  )
}
