import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

import style from '../style/Layout/Form.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //this solve the problem for component unmount and still
  //update the state after fetch data
  const componentMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentMounted.current = false
    }
  }, [])

  const { logIn, signInWithGoogle } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      await logIn(email, password)
      componentMounted.current && setEmail('')
      componentMounted.current && setPassword('')
      navigate(from, { replace: true })
    } catch (error) {
      alert(error.message)
    }
  }

  const signInWithGoogleHandler = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={style.formContainer}>
      <h2>Log In</h2>
      <form onSubmit={formSubmitHandler}>
        <div className={style.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            required
            id='email'
            type='email'
            autoComplete=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor='password'>Password</label>
          <input
            required
            id='password'
            autoComplete=''
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.formActions}>
          <button type='submit'>Log In</button>
          <button type='button' onClick={signInWithGoogleHandler}>
            Log In With Google
          </button>
          <button type='button'>
            <Link to='/forget-password'>Forgot Password</Link>
          </button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  )
}

export default Login
