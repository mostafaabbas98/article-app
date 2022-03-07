import { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth-context'
import { db } from '../utils/firebase-config'

import style from '../style/Layout/Form.module.css'
import classes from '../style/page/AddArticle.module.css'

const AddArticle = () => {
  const { currentUser } = useAuth()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'articles'), {
        title,
        description,
        auther: { name: currentUser.displayName, id: currentUser.uid },
        articleDate: Timestamp.now(),
      })
      navigate('/home')
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className={`${style.formContainer} ${classes.addArticle}`}>
      <h2>Add Article</h2>
      <form onSubmit={formSubmitHandler}>
        <div className={style.formGroup}>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            type='text'
            autoComplete=''
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor='description'>Description</label>
          <textarea
            className={classes.formTextarea}
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={style.formActions}>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddArticle
