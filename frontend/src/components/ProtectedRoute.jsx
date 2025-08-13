import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (role && user?.role !== role) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = 
      user?.role === 'ADMIN' ? '/admin' :
      user?.role === 'FACULTY' ? '/faculty' :
      user?.role === 'STUDENT' ? '/student' : '/login'
    
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
