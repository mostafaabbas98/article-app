import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

import style from '../style/Layout/Form.module.css'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')

  const { resetPassword } = useAuth()

  const navigate = useNavigate()

  const formSubmitHandler = async (e) => {
    e.preventDefault()

    await resetPassword(email).then(() => {
      navigate('/login')
    })
  }

  return (
    <div className={style.formContainer}>
      <h2>Forget Password</h2>
      <form onSubmit={formSubmitHandler}>
        <div className={style.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            autoComplete=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.formActions}>
          <button type='submit'>Send Email</button>
          <button type='button'>
            <Link to='/login'>Cansle</Link>
          </button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  )
}

export default ForgetPassword
