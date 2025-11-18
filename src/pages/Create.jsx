import { useState } from 'react'
import Button from '../components/ui/Button'

export default function Create() {
  const [files, setFiles] = useState([])
  const [caption, setCaption] = useState('')
  const [progress, setProgress] = useState(0)

  function onDrop(e) {
    e.preventDefault()
    const f = [...e.dataTransfer.files]
    setFiles(f)
  }

  async function onUpload() {
    setProgress(10)
    // demo progress
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 10)), 200)
    setTimeout(() => clearInterval(id), 2000)
  }

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center"
           onDragOver={(e)=>e.preventDefault()} onDrop={onDrop}>
        <p className="text-sm">Drag & drop photos/videos here</p>
        <div className="mt-3">
          {files.length ? (
            <div className="grid grid-cols-3 gap-2">
              {files.map((f, i) => (
                <div key={i} className="text-xs truncate bg-slate-100 dark:bg-slate-900 p-2 rounded">{f.name}</div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500">or click to select</div>
          )}
        </div>
      </div>
      <textarea value={caption} onChange={(e)=>setCaption(e.target.value)} placeholder="Write a caption" className="w-full h-24 rounded-lg bg-slate-100 dark:bg-slate-900 px-3 py-2 outline-none" />
      <Button onClick={onUpload} className="w-full">Upload</Button>
      {progress>0 && (
        <div className="h-2 rounded bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}
