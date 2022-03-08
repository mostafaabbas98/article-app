import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

import style from '../style/Layout/Form.module.css'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { signUp, createAccount } = useAuth()

  const navigate = useNavigate()

  const formSubmitHandler = async (e) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      return alert('Please enter Same password in confirm password')
    }

    await signUp(email, password)
      .then(() => {})
      .catch((error) => alert(error.message))

    await createAccount(name)
      .then(() => {
        // console.log(user)
        navigate('/home')
      })
      .catch((error) => console.log(error.message))
  }
  return (
    <div className={style.formContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={formSubmitHandler}>
        <div className={style.formGroup}>
          <label htmlFor='name'>NickName</label>
          <input
            required
            id='name'
            autoComplete=''
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor='email'>Email Address</label>
          <input
            required
            id='email'
            autoComplete=''
            type='email'
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
        <div className={style.formGroup}>
          <label htmlFor='passwordConfirm'>Confirm Password</label>
          <input
            required
            id='passwordConfirm'
            autoComplete=''
            type='password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <div className={style.formActions}>
          <button>Sign Up</button>
        </div>
      </form>
      <p>
        Already have an account <Link to='/login'>Sign In</Link>
      </p>
    </div>
  )
}

export default SignUp
