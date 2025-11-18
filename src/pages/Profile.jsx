import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Profile(){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    ;(async()=>{
      try{
        const res = await api.getProfile('me')
        setData(res)
      }catch{
        setData({
          username: 'me',
          name: 'Stranger',
          avatar: 'https://i.pravatar.cc/150?img=5',
          bio: 'Building a minimal social app UI.',
          stats: { posts: 12, followers: 1200, following: 180 },
          posts: Array.from({length:12}).map((_,i)=>({ id:i, src:`https://picsum.photos/seed/p${i}/600/600`}))
        })
      }finally{ setLoading(false) }
    })()
  },[])

  return (
    <div className="max-w-4xl mx-auto">
      {loading && <div className="h-32 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-xl mb-4"/>}
      {data && (
        <div>
          <div className="flex items-center gap-6">
            <img src={data.avatar} alt="" className="w-24 h-24 rounded-full" />
            <div>
              <div className="text-xl font-semibold">{data.username}</div>
              <div className="text-sm text-slate-500">{data.name}</div>
              <p className="text-sm mt-2">{data.bio}</p>
              <div className="flex gap-4 text-sm mt-2">
                <span><b>{data.stats.posts}</b> posts</span>
                <span><b>{data.stats.followers}</b> followers</span>
                <span><b>{data.stats.following}</b> following</span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1 sm:gap-2">
            {data.posts.map((p)=> (
              <img key={p.id} src={p.src} alt="" className="aspect-square object-cover" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
