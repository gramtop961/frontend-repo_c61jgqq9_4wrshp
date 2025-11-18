import { useEffect, useRef, useState } from 'react'
import PostCard from '../components/feed/PostCard'
import SkeletonPost from '../components/feed/SkeletonPost'
import { api } from '../lib/api'

export default function Feed() {
  const [items, setItems] = useState([])
  const [cursor, setCursor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const loaderRef = useRef(null)

  async function loadMore(nextCursor) {
    setLoading(true)
    try {
      const data = await api.getFeed({ cursor: nextCursor })
      setItems((prev) => [...prev, ...data.items])
      setCursor(data.nextCursor || null)
    } catch (e) {
      // fallback demo content if backend missing
      if (items.length === 0) {
        const demo = Array.from({ length: 5 }).map((_, i) => ({
          id: i + 1,
          username: 'stranger',
          avatar: 'https://i.pravatar.cc/100?img=' + (i + 1),
          media: ['https://images.unsplash.com/photo-1520975922284-511cf8fc2aa7?q=80&w=1200&auto=format&fit=crop'],
          caption: 'A calm, minimal social UI built fast.',
          likes: 128 + i,
          time: '2h',
          comments: [],
        }))
        setItems(demo)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMore()
  }, [])

  useEffect(() => {
    const el = loaderRef.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting && cursor && !loading) {
        loadMore(cursor)
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [cursor, loading])

  async function onRefresh() {
    setRefreshing(true)
    setItems([])
    setCursor(null)
    await loadMore()
    setRefreshing(false)
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="sticky top-14 z-10 -mx-4 px-4 bg-gradient-to-b from-white/90 dark:from-slate-950/90 to-transparent py-2">
        <button onClick={onRefresh} className="text-sm text-blue-600">{refreshing ? 'Refreshing…' : 'Pull to refresh'}</button>
      </div>
      {items.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonPost key={i} />
          ))}
        </div>
      )}
      <div ref={loaderRef} className="h-10" />
    </div>
  )}
