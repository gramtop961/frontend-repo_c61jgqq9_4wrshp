import clsx from 'clsx'

export default function Button({ as: Comp = 'button', className, variant = 'solid', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium focus:outline-none focus-visible:ring-2 ring-offset-2 transition active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }
  const variants = {
    solid: 'bg-blue-600 text-white hover:bg-blue-500 ring-blue-500',
    ghost: 'bg-transparent hover:bg-blue-500/10 text-blue-600 ring-blue-400',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white ring-blue-500',
    subtle: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 ring-slate-400',
  }
  return <Comp className={clsx(base, sizes[size], variants[variant], className)} {...props} />
}
