import { useTaskContext } from '../../context/task-context'
import { useAuthContext } from '../../context/auth-context'

const TaskListNumbers = () => {
  const { tasks } = useTaskContext()
  const { user } = useAuthContext()

  const userTasks = tasks.filter((t) => t.assignee === user?.email)
  const newCount = userTasks.filter((t) => t.status === 'new').length
  const completedCount = userTasks.filter((t) => t.status === 'completed').length
  const acceptedCount = userTasks.filter((t) => t.status === 'accepted').length
  const failedCount = userTasks.filter((t) => t.status === 'failed').length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6 sm:mt-10">
      <div className="rounded-xl py-4 sm:py-5 px-4 sm:px-6 md:px-9 bg-blue-500 text-white shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold">{newCount}</h2>
        <h3 className="text-xs sm:text-base md:text-lg font-medium mt-1">New Task</h3>
      </div>
      <div className="rounded-xl py-4 sm:py-5 px-4 sm:px-6 md:px-9 bg-emerald-500 text-white shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold">{completedCount}</h2>
        <h3 className="text-xs sm:text-base md:text-lg font-medium mt-1">Completed Task</h3>
      </div>
      <div className="rounded-xl py-4 sm:py-5 px-4 sm:px-6 md:px-9 bg-amber-500 text-white shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold">{acceptedCount}</h2>
        <h3 className="text-xs sm:text-base md:text-lg font-medium mt-1">Accepted Task</h3>
      </div>
      <div className="rounded-xl py-4 sm:py-5 px-4 sm:px-6 md:px-9 bg-rose-500 text-white shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold">{failedCount}</h2>
        <h3 className="text-xs sm:text-base md:text-lg font-medium mt-1">Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumbers