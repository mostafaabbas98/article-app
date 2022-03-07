import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'

import style from '../../style/Layout/Header.module.css'

const Header = () => {
  const { logOut, currentUser } = useAuth()

  const logOutHandler = () => {
    logOut()
  }

  return (
    <header className={style.header}>
      <div className={style.logo}>
        <h1>Logo</h1>
      </div>
      <nav className={style.nav}>
        <NavLink
          className={({ isActive }) => (isActive ? style.active : '')}
          to='/home'
        >
          Home
        </NavLink>
        {!currentUser && (
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to='/login'
          >
            Sign In
          </NavLink>
        )}
        {!currentUser && (
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to='/signup'
          >
            Sign Up
          </NavLink>
        )}
        {currentUser && (
          <NavLink
            className={({ isActive }) => (isActive ? style.active : '')}
            to='/add-article'
          >
            Add Article
          </NavLink>
        )}
        {currentUser && (
          <button className={style.logoutBtn} onClick={logOutHandler}>
            Log Out
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header
