import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'

const RequiredAuth = () => {
  const { currentUser } = useAuth()
  const location = useLocation()

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequiredAuth
