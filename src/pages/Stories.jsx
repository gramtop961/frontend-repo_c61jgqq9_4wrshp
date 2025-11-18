import { useEffect, useState } from 'react'

function StoryAvatar({ src, active }) {
  return (
    <div className={`p-[2px] rounded-full ${active ? 'bg-gradient-to-tr from-fuchsia-500 to-amber-400' : 'bg-slate-300 dark:bg-slate-700'}`}>
      <img src={src} alt="" className="w-14 h-14 rounded-full p-[2px] bg-white dark:bg-slate-950" />
    </div>
  )
}

export default function Stories() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const stories = Array.from({ length: 12 }).map((_, i) => ({ id: i, src: `https://i.pravatar.cc/120?img=${i+1}` }))

  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setIndex((i) => (i + 1) % stories.length), 3500)
    return () => clearInterval(id)
  }, [open])

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {stories.map((s, i) => (
          <button key={s.id} onClick={()=>{setOpen(true); setIndex(i)}} className="shrink-0">
            <StoryAvatar src={s.src} active />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center" onClick={()=>setOpen(false)} aria-modal="true" role="dialog">
          <div className="w-full max-w-sm aspect-[9/16] bg-black rounded-xl overflow-hidden relative">
            <img src={`https://picsum.photos/seed/${index}/720/1280`} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-2 inset-x-2 flex gap-1">
              {Array.from({length: 6}).map((_,i)=>(
                <div key={i} className={`h-1 rounded bg-white/40 flex-1 overflow-hidden`}>
                  <div className={`h-full bg-white ${i<=index%6?'w-full':'w-0'}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
