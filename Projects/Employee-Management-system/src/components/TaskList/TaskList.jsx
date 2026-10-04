import { useRef, useEffect, useState } from 'react'
import { useTaskContext } from '../../context/task-context'
import { useAuthContext } from '../../context/auth-context'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import toast from 'react-hot-toast'

const TaskList = () => {
  const { tasks, updateTaskStatus } = useTaskContext()
  const { user } = useAuthContext()
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftPos, setScrollLeftPos] = useState(0)

  const userTasks = tasks.filter((t) => t.assignee === user?.email)

  // Enable vertical trackpad/mouse-wheel to scroll horizontally
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleWheel = (e) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY * 1.2
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [userTasks.length])

  const handleUpdateStatus = (id, status) => {
    updateTaskStatus(id, status)
    if (status === 'accepted') {
      toast.success('Task accepted!')
    } else if (status === 'completed') {
      toast.success('Task marked as completed!')
    } else if (status === 'failed') {
      toast.error('Task marked as failed.')
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseDown = (e) => {
    // Avoid initiating drag if clicking interactive elements like buttons
    if (e.target.tagName === 'BUTTON') return
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeftPos(scrollRef.current.scrollLeft)
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeftPos - walk
  }

  if (userTasks.length === 0) {
    return (
      <div className="mt-10 py-12 text-center text-zinc-400 bg-zinc-900/50 rounded-xl border border-zinc-800">
        <p className="text-base">No tasks assigned yet.</p>
      </div>
    )
  }

  return (
    <div className="relative mt-6 sm:mt-10">
      {/* Scroll Navigation Controls */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-200">Your Tasks</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md"
            title="Scroll Left"
            type="button"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-md"
            title="Scroll Right"
            type="button"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Task List Container */}
      <div
        id="TaskList"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        className={`h-[340px] overflow-x-auto w-full flex items-center justify-start gap-4 sm:gap-5 flex-nowrap py-2 select-none snap-x snap-mandatory scroll-smooth cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
      >
        {userTasks.map((task) => {
          if (task.status === 'new') {
            return <NewTask key={task.id} task={task} updateTaskStatus={handleUpdateStatus} />
          }
          if (task.status === 'accepted') {
            return <AcceptTask key={task.id} task={task} updateTaskStatus={handleUpdateStatus} />
          }
          if (task.status === 'completed') {
            return <CompleteTask key={task.id} task={task} />
          }
          if (task.status === 'failed') {
            return <FailedTask key={task.id} task={task} />
          }
          return null
        })}
      </div>
    </div>
  )
}

export default TaskList