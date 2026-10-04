import { useState, useCallback } from 'react'
import { AuthContext } from './auth-context'

// Re-hydrate session across page refreshes
const getStoredSession = () => {
  try {
    const raw = localStorage.getItem('session')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // If parsed session is missing firstName, try to look it up
    if (parsed && !parsed.firstName) {
      if (parsed.role === 'admin') {
        const adminRaw = localStorage.getItem('admin')
        if (adminRaw) {
          const admins = JSON.parse(adminRaw)
          const match = admins.find((a) => a.email === parsed.email)
          parsed.firstName = match?.firstName || 'Admin'
        }
      } else {
        const empRaw = localStorage.getItem('employees')
        if (empRaw) {
          const employees = JSON.parse(empRaw)
          const match = employees.find((e) => e.email === parsed.email)
          parsed.firstName = match?.firstName || parsed.email.split('@')[0]
        }
      }
      localStorage.setItem('session', JSON.stringify(parsed))
    }
    return parsed
  } catch {
    return null
  }
}

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredSession)

  const login = useCallback((email, password) => {
    // Check admin
    const adminRaw = localStorage.getItem('admin')
    if (adminRaw) {
      const admins = JSON.parse(adminRaw)
      const foundAdmin = admins.find((a) => a.email === email && a.password === password)
      if (foundAdmin) {
        const session = {
          email,
          role: 'admin',
          firstName: foundAdmin.firstName || 'Admin',
        }
        setUser(session)
        localStorage.setItem('session', JSON.stringify(session))
        return true
      }
    }

    // Check employees
    const empRaw = localStorage.getItem('employees')
    if (empRaw) {
      const employees = JSON.parse(empRaw)
      const foundEmp = employees.find((e) => e.email === email && e.password === password)
      if (foundEmp) {
        const session = {
          email,
          role: 'employee',
          firstName: foundEmp.firstName || foundEmp.email.split('@')[0],
        }
        setUser(session)
        localStorage.setItem('session', JSON.stringify(session))
        return true
      }
    }

    return false
  }, [])

  const updateUserName = useCallback((newFirstName) => {
    if (!newFirstName || !newFirstName.trim()) return

    setUser((prev) => {
      if (!prev) return prev
      const updated = { ...prev, firstName: newFirstName.trim() }
      localStorage.setItem('session', JSON.stringify(updated))

      // Also persist to localStorage employees / admin
      if (prev.role === 'admin') {
        const adminRaw = localStorage.getItem('admin')
        if (adminRaw) {
          const admins = JSON.parse(adminRaw).map((a) =>
            a.email === prev.email ? { ...a, firstName: newFirstName.trim() } : a
          )
          localStorage.setItem('admin', JSON.stringify(admins))
        }
      } else {
        const empRaw = localStorage.getItem('employees')
        if (empRaw) {
          const employees = JSON.parse(empRaw).map((e) =>
            e.email === prev.email ? { ...e, firstName: newFirstName.trim() } : e
          )
          localStorage.setItem('employees', JSON.stringify(employees))
        }
      }

      return updated
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('session')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserName }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider