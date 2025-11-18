import { useEffect, useRef, useState } from 'react'

const demo = [
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
]

export default function Reels() {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.currentTime = 0
    el.play().catch(() => {})
  }, [index])

  return (
    <div className="fixed inset-14 bottom-16 md:bottom-0 bg-black">
      <video ref={ref} src={demo[index % demo.length]} muted loop className="w-full h-full object-cover" onClick={() => (ref.current.paused ? ref.current.play() : ref.current.pause())} />
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="text-white text-sm bg-black/40 px-2 py-1 rounded">Tap to pause · Swipe coming soon</div>
      </div>
      <div className="absolute inset-y-0 right-2 grid place-content-center gap-4 text-white">
        <button className="pointer-events-auto bg-white/10 rounded-full px-3 py-2" onClick={() => setIndex((i) => i + 1)}>Next</button>
      </div>
    </div>
  )
}
