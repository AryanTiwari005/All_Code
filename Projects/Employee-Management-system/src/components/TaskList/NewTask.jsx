const NewTask = ({ task, updateTaskStatus }) => {
  return (
    <div className="flex-shrink-0 snap-start h-[300px] w-[270px] sm:w-[300px] p-5 bg-blue-600 rounded-2xl flex flex-col justify-between shadow-lg shadow-black/30">
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
      <div className="mt-4">
        <button
          onClick={() => updateTaskStatus(task.id, 'accepted')}
          className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Accept Task
        </button>
      </div>
    </div>
  )
}

export default NewTask
