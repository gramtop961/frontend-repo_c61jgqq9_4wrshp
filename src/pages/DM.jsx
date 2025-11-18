import { useEffect, useRef, useState } from 'react'

const demoConvos = [
  { id: '1', name: 'Alex', avatar: 'https://i.pravatar.cc/100?img=12', last: 'Looks great!', unread: 2 },
  { id: '2', name: 'Jamie', avatar: 'https://i.pravatar.cc/100?img=14', last: 'Meet at 5?', unread: 0 },
]

export default function DM(){
  const [active, setActive] = useState(demoConvos[0])
  const [messages, setMessages] = useState([
    { id: 1, me: false, text: 'Hey!', ts: Date.now()-60000 },
    { id: 2, me: true, text: 'Hi — shipped the new UI.', ts: Date.now()-30000 },
  ])
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  function send(){
    if(!text.trim()) return
    setMessages((m)=>[...m, { id: Date.now(), me: true, text, ts: Date.now() }])
    setText('')
  }

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-4 h-[calc(100dvh-6.5rem)]">
      <aside className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {demoConvos.map((c)=> (
          <button key={c.id} onClick={()=>setActive(c)} className={`w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-900 ${active.id===c.id?'bg-slate-50 dark:bg-slate-900':''}`}>
            <img src={c.avatar} alt="" className="w-9 h-9 rounded-full" />
            <div>
              <div className="text-sm font-medium">{c.name}</div>
              <div className="text-xs text-slate-500">{c.last}</div>
            </div>
            {c.unread>0 && <span className="ml-auto text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">{c.unread}</span>}
          </button>
        ))}
      </aside>
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        <header className="h-12 flex items-center gap-3 px-3 border-b border-slate-200 dark:border-slate-800">
          <img src={active.avatar} alt="" className="w-8 h-8 rounded-full" />
          <div className="text-sm font-medium">{active.name}</div>
        </header>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((m)=>(
            <div key={m.id} className={`max-w-[70%] ${m.me?'ml-auto bg-blue-600 text-white':'bg-slate-100 dark:bg-slate-900'} px-3 py-2 rounded-2xl`}>{m.text}</div>
          ))}
          <div ref={bottomRef} />
        </div>
        <footer className="p-2 flex items-center gap-2 border-t border-slate-200 dark:border-slate-800">
          <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Message" className="flex-1 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 px-3 outline-none" onKeyDown={(e)=> e.key==='Enter' && send()} />
          <button onClick={send} className="h-10 px-4 rounded-lg bg-blue-600 text-white">Send</button>
        </footer>
      </section>
    </div>
  )
}
