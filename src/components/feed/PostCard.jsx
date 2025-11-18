import { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark } from '../ui/Icons'

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(!!post.liked)
  const [likeCount, setLikeCount] = useState(post.likes || 0)
  const [saved, setSaved] = useState(false)

  function toggleLike() {
    setLiked((v) => !v)
    setLikeCount((c) => (liked ? Math.max(0, c - 1) : c + 1))
    // optimistic; backend call should be triggered by parent
  }

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <header className="flex items-center gap-3 p-3">
        <img src={post.avatar} alt="" className="w-8 h-8 rounded-full" />
        <div className="font-medium text-sm">{post.username}</div>
        <div className="ml-auto text-xs text-slate-500">{post.time}</div>
      </header>
      <div className="relative">
        <img src={post.media?.[0]} alt="" className="w-full aspect-square object-cover select-none" onDoubleClick={toggleLike} />
        {liked && (
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="text-red-500 animate-ping">
              <Heart size={72} fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
          <button aria-label="Like" className={`active:scale-95 transition ${liked ? 'text-red-500' : ''}`} onClick={toggleLike}>
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button aria-label="Comment" className="active:scale-95 transition">
            <MessageCircle size={24} />
          </button>
          <button aria-label="Share" className="active:scale-95 transition">
            <Send size={24} />
          </button>
          <button aria-label="Save" className="ml-auto active:scale-95 transition" onClick={() => setSaved((s) => !s)}>
            <Bookmark size={22} className={saved ? 'text-blue-600' : ''} />
          </button>
        </div>
        <div className="mt-1 text-sm font-medium">{likeCount.toLocaleString()} likes</div>
        {post.caption && <p className="text-sm mt-1"><span className="font-medium mr-1">{post.username}</span>{post.caption}</p>}
        {post.comments?.length > 0 && (
          <button className="mt-1 text-sm text-slate-500 hover:underline">View all {post.comments.length} comments</button>
        )}
      </div>
    </article>
  )
}
