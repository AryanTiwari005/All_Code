import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Auth/Login'
import EmployeeDashBoard from './components/DashBoard/EmployeeDashBoard'
import AdminDashBoard from './components/DashBoard/AdminDashBoard'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import AuthContextProvider from './context/AuthContext'
import TaskContextProvider from './context/TaskContext'
import { useAuthContext } from './context/auth-context'
import { setLocalStorage } from './utils/localStorage'
import { Toaster } from 'react-hot-toast'

// Seed localStorage with employee + admin data on first load
setLocalStorage()

const RootRedirect = () => {
  const { user } = useAuthContext()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TaskContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <ProtectedRoute allowedRole="employee">
                  <EmployeeDashBoard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<RootRedirect />} />
          </Routes>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#18181b',
                color: '#f4f4f5',
                border: '1px solid #27272a',
                fontSize: '14px',
                borderRadius: '10px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#18181b',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#18181b',
                },
              },
            }}
          />
        </TaskContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App