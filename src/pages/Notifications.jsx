export default function Notifications(){
  const groups = {
    Today: [
      { id: 1, text: 'Alex liked your photo', avatar: 'https://i.pravatar.cc/100?img=12' },
      { id: 2, text: 'Jamie started following you', avatar: 'https://i.pravatar.cc/100?img=14' },
    ],
    'This Week': [
      { id: 3, text: 'Taylor commented: “So clean!”', avatar: 'https://i.pravatar.cc/100?img=16' },
    ],
  }
  return (
    <div className="max-w-xl mx-auto">
      {Object.entries(groups).map(([title, items]) => (
        <section key={title} className="mb-6">
          <h2 className="text-sm font-semibold text-slate-500 mb-2">{title}</h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-200 dark:divide-slate-800">
            {items.map((n)=> (
              <div key={n.id} className="p-3 flex items-center gap-3">
                <img src={n.avatar} alt="" className="w-9 h-9 rounded-full" />
                <div className="text-sm">{n.text}</div>
                <button className="ml-auto text-xs text-blue-600">View</button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
