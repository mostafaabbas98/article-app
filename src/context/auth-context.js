import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../utils/firebase-config'
import { googleProvider } from '../utils/firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const createAccount = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    })
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => {
    return signOut(auth)
  }

  const value = {
    currentUser,
    signUp,
    signInWithGoogle,
    logIn,
    logOut,
    createAccount,
    resetPassword,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
