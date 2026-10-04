import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/auth-context'

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />
  }

  return children
}

export default ProtectedRoute
