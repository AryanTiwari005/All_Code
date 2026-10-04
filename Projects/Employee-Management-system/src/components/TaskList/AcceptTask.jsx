const AcceptTask = ({ task, updateTaskStatus }) => {
  return (
    <div className="flex-shrink-0 snap-start h-[300px] w-[270px] sm:w-[300px] p-5 bg-amber-600 rounded-2xl flex flex-col justify-between shadow-lg shadow-black/30">
      <div>
        <div className="flex justify-between items-center">
          <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md">
            {task.category || 'Task'}
          </span>
          <span className="text-xs text-zinc-200">{task.date}</span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-white line-clamp-1">{task.title}</h2>
        <p className="text-xs text-zinc-200 mt-2 line-clamp-4 leading-relaxed">
          {task.description}
        </p>
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={() => updateTaskStatus(task.id, 'completed')}
          className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium py-2 px-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Complete
        </button>
        <button
          onClick={() => updateTaskStatus(task.id, 'failed')}
          className="flex-1 bg-rose-700 hover:bg-rose-600 active:bg-rose-800 text-white font-medium py-2 px-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Mark Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask
