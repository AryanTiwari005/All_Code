const FailedTask = ({ task }) => {
  return (
    <div className="flex-shrink-0 snap-start h-[300px] w-[270px] sm:w-[300px] p-5 bg-rose-600 rounded-2xl flex flex-col justify-between shadow-lg shadow-black/30">
      <div>
        <div className="flex justify-between items-center">
          <span className="bg-red-800 text-white text-xs font-semibold px-3 py-1 rounded-md">
            {task.category || 'Task'}
          </span>
          <span className="text-xs text-zinc-200">{task.date}</span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-white line-clamp-1">{task.title}</h2>
        <p className="text-xs text-zinc-200 mt-2 line-clamp-4 leading-relaxed">
          {task.description}
        </p>
      </div>
      <div className="mt-4">
        <div className="w-full text-center bg-rose-800/80 text-white font-medium py-2 px-4 rounded-lg text-sm border border-rose-400/30">
          ✕ Failed
        </div>
      </div>
    </div>
  )
}

export default FailedTask
