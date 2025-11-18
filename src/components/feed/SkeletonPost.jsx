export default function SkeletonPost() {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="h-12 flex items-center gap-3 px-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="ml-auto h-3 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
      <div className="aspect-square bg-slate-200 dark:bg-slate-800" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-40 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  )
}
