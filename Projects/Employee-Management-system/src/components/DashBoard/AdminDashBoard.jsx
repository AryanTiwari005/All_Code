import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../../context/task-context'
import { useAuthContext } from '../../context/auth-context'
import toast from 'react-hot-toast'

// ── constants ────────────────────────────────────────────────────────────────

const initialForm = {
  title: '',
  description: '',
  date: '',
  assignee: '',
  category: '',
}

const STATUS_STYLES = {
  new:       'bg-blue-500/15  text-blue-300  border border-blue-500/30',
  accepted:  'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  completed: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  failed:    'bg-red-500/15   text-red-300   border border-red-500/30',
}

const STATUS_LABEL = {
  new: 'New',
  accepted: 'Accepted',
  completed: 'Completed',
  failed: 'Failed',
}

// ── helpers ──────────────────────────────────────────────────────────────────

const inputClasses =
  'w-full bg-zinc-800/80 border border-zinc-700/60 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500'

const labelClasses = 'block text-xs font-medium text-zinc-400 mb-1.5'

// ── component ────────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const { tasks, addTask, deleteTask } = useTaskContext()
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const [form, setForm]                     = useState(initialForm)
  const [filterAssignee, setFilterAssignee] = useState('all')
  const [filterStatus, setFilterStatus]     = useState('all')
  const [confirmDelete, setConfirmDelete]   = useState(null) // task id pending delete

  // ── derived ────────────────────────────────────────────────────────────────

  /** Unique assignee emails from all tasks. */
  const assignees = useMemo(
    () => ['all', ...Array.from(new Set(tasks.map((t) => t.assignee))).sort()],
    [tasks]
  )

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchAssignee = filterAssignee === 'all' || t.assignee === filterAssignee
      const matchStatus   = filterStatus   === 'all' || t.status   === filterStatus
      return matchAssignee && matchStatus
    })
  }, [tasks, filterAssignee, filterStatus])

  // ── handlers ──────────────────────────────────────────────────────────────

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Client-side validation
    if (!form.title.trim()) {
      toast.error('Task title is required.')
      return
    }

    if (!form.date.trim()) {
      toast.error('Task date is required.')
      return
    }

    if (!form.assignee.trim()) {
      toast.error('Assignee email is required.')
      return
    }

    // Verify the assignee email belongs to a known employee
    const knownEmployees = JSON.parse(localStorage.getItem('employees') || '[]')
    const employeeExists = knownEmployees.some((e) => e.email === form.assignee.trim())
    if (!employeeExists) {
      toast.error(`No employee found with email "${form.assignee.trim()}".`)
      return
    }

    addTask({ ...form })
    setForm(initialForm)
    toast.success('Task created successfully!')
  }

  const handleDeleteClick = (id) => setConfirmDelete(id)
  const handleDeleteCancel = () => setConfirmDelete(null)
  const handleDeleteConfirm = () => {
    if (confirmDelete) {
      deleteTask(confirmDelete)
      setConfirmDelete(null)
      toast.success('Task deleted successfully.')
    }
  }

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-black/90 backdrop-blur-sm">
        <div>
          <h1 className="text-base font-semibold tracking-tight">Admin Panel</h1>
          <p className="text-xs text-zinc-500">Employee Management System</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          Log out
        </button>
      </header>

      <main className="flex flex-col items-center px-3 sm:px-4 py-6 sm:py-8 md:py-10 gap-6 sm:gap-8">

        {/* ── Create Task Card ── */}
        <section className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-zinc-900 border border-zinc-800 p-4 sm:p-6 rounded-xl shadow-lg shadow-black/40"
          >
            <h2 className="flex items-center gap-2 text-sm font-semibold mb-6 text-zinc-100">
              <span className="text-base leading-none text-zinc-400">⊕</span>
              Create Task
            </h2>

            <div className="space-y-4">
              {/* Task Title */}
              <div>
                <label htmlFor="title" className={labelClasses}>Task Title *</label>
                <input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange('title')}
                  placeholder="Make a UI design"
                  className={inputClasses}
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className={labelClasses}>Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={handleChange('description')}
                  placeholder="Detailed description of task..."
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {/* Date + Assign To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className={labelClasses}>Date *</label>
                  <input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange('date')}
                    className={`${inputClasses} [color-scheme:dark]`}
                  />
                </div>
                <div>
                  <label htmlFor="assignee" className={labelClasses}>Assign To (email) *</label>
                  <input
                    id="assignee"
                    type="email"
                    value={form.assignee}
                    onChange={handleChange('assignee')}
                    placeholder="employee@example.com"
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className={labelClasses}>Category</label>
                <input
                  id="category"
                  type="text"
                  value={form.category}
                  onChange={handleChange('category')}
                  placeholder="Design, Development, etc..."
                  className={inputClasses}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-zinc-700 text-white font-medium rounded-lg py-2.5 text-sm transition-colors hover:bg-zinc-600 active:bg-zinc-500 cursor-pointer"
            >
              Create Task
            </button>
          </form>
        </section>

        {/* ── Task Overview ── */}
        <section className="w-full max-w-3xl">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">All Tasks</h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                {filterAssignee !== 'all' || filterStatus !== 'all' ? ' (filtered)' : ''}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 w-full sm:w-auto">
              {/* Filter by assignee */}
              <select
                id="filter-assignee"
                value={filterAssignee}
                onChange={(e) => setFilterAssignee(e.target.value)}
                className="w-full sm:w-auto bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-zinc-500 transition-colors cursor-pointer"
              >
                <option value="all">All employees</option>
                {assignees.filter((a) => a !== 'all').map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>

              {/* Filter by status */}
              <select
                id="filter-status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-zinc-500 transition-colors cursor-pointer"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <p className="text-zinc-500 text-sm">No tasks found.</p>
              {(filterAssignee !== 'all' || filterStatus !== 'all') && (
                <button
                  onClick={() => { setFilterAssignee('all'); setFilterStatus('all') }}
                  className="mt-3 text-xs text-zinc-400 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-4 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Left: info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-zinc-100 truncate">{task.title}</span>
                        <span className={`shrink-0 inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[task.status] ?? STATUS_STYLES.accepted}`}>
                          {STATUS_LABEL[task.status] ?? task.status}
                        </span>
                        {task.category && (
                          <span className="shrink-0 inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-700/60 text-zinc-400">
                            {task.category}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-zinc-500">
                        <span className="truncate">{task.assignee}</span>
                        {task.date && (
                          <>
                            <span className="text-zinc-700">·</span>
                            <span>{task.date}</span>
                          </>
                        )}
                      </div>

                      {task.description && (
                        <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{task.description}</p>
                      )}
                    </div>

                    {/* Right: delete button */}
                    <button
                      onClick={() => handleDeleteClick(task.id)}
                      aria-label={`Delete task "${task.title}"`}
                      className="shrink-0 mt-0.5 p-1.5 rounded-md text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* ── Delete confirmation modal ── */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-2xl shadow-black/60">
            <h3 id="delete-dialog-title" className="text-sm font-semibold text-zinc-100 mb-2">
              Delete task?
            </h3>
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              This action cannot be undone. The task will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 text-sm border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white rounded-lg py-2 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 text-sm bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg py-2 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard