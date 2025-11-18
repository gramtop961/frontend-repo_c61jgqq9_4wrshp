import { useState } from 'react'

export default function Auth(){
  const [mode, setMode] = useState('login')
  return (
    <div className="max-w-sm mx-auto">
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-6">
        <h1 className="text-xl font-semibold mb-4">{mode==='login'?'Log in':'Sign up'}</h1>
        <div className="space-y-3">
          {mode==='signup' && <input placeholder="Username" className="w-full h-10 rounded bg-slate-100 dark:bg-slate-900 px-3" />}
          <input placeholder="Email" className="w-full h-10 rounded bg-slate-100 dark:bg-slate-900 px-3" />
          <input type="password" placeholder="Password" className="w-full h-10 rounded bg-slate-100 dark:bg-slate-900 px-3" />
          <button className="w-full h-10 bg-blue-600 text-white rounded-md">{mode==='login'?'Log in':'Create account'}</button>
          <button className="w-full h-10 rounded-md border">Continue with code (OTP)</button>
        </div>
        <div className="mt-4 text-sm text-center">
          {mode==='login'? (
            <button className="text-blue-600" onClick={()=>setMode('signup')}>Create an account</button>
          ) : (
            <button className="text-blue-600" onClick={()=>setMode('login')}>Have an account? Log in</button>
          )}
        </div>
      </div>
    </div>
  )
}
