import { useState, useCallback } from 'react'
import { TaskContext } from './task-context'

// ── helpers ─────────────────────────────────────────────────────────────────

/** Generate a unique task id. */
const generateId = () => `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

/**
 * Initialize tasks from localStorage.
 * If 'tasks' key already exists, return parsed array directly.
 * On first load only (when 'tasks' doesn't exist), convert existing employees[].tasks
 * booleans into a flat array and save under 'tasks'.
 */
const getInitialTasks = () => {
  const rawTasks = localStorage.getItem('tasks')
  if (rawTasks) {
    try {
      return JSON.parse(rawTasks)
    } catch {
      // fallback if corrupted
    }
  }

  const rawEmployees = localStorage.getItem('employees')
  if (!rawEmployees) return []

  const employees = JSON.parse(rawEmployees)
  const initialFlatTasks = []

  employees.forEach((emp) => {
    ;(emp.tasks || []).forEach((t, idx) => {
      let status = 'new'
      if (t.failed) {
        status = 'failed'
      } else if (t.completed) {
        status = 'completed'
      } else if (t.active && !t.newTask) {
        status = 'accepted'
      } else if (t.newTask) {
        status = 'new'
      }

      initialFlatTasks.push({
        id: `${emp.id}_${idx}`,
        title: t.taskTitle,
        description: t.taskDescription,
        date: t.taskDate,
        category: t.category,
        assignee: emp.email,
        status,
      })
    })
  })

  localStorage.setItem('tasks', JSON.stringify(initialFlatTasks))
  return initialFlatTasks
}

// ── provider ─────────────────────────────────────────────────────────────────

const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(getInitialTasks)

  /** Add a new task and assign it to an employee by email. */
  const addTask = useCallback((taskData) => {
    const newTask = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description,
      date: taskData.date,
      category: taskData.category,
      assignee: taskData.assignee,
      status: 'new',
    }

    setTasks((prev) => {
      const next = [...prev, newTask]
      localStorage.setItem('tasks', JSON.stringify(next))
      return next
    })
  }, [])

  /** Update the status of a task by id. */
  const updateTaskStatus = useCallback((id, status) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, status } : t))
      localStorage.setItem('tasks', JSON.stringify(next))
      return next
    })
  }, [])

  /** Delete a task by id. */
  const deleteTask = useCallback((id) => {
    setTasks((prev) => {
      const next = prev.filter((t) => t.id !== id)
      localStorage.setItem('tasks', JSON.stringify(next))
      return next
    })
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider