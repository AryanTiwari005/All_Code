import { createContext, useContext } from 'react'

export const TaskContext = createContext(null)

export const useTaskContext = () => {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTaskContext must be used inside TaskContext.Provider')
  return ctx
}
