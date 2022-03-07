import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'

const RequiredNotAuth = () => {
  const { currentUser } = useAuth()
  const location = useLocation()

  return currentUser ? (
    <Navigate to='/' state={{ from: location }} replace />
  ) : (
    <Outlet />
  )
}

export default RequiredNotAuth
