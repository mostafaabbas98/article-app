import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import { db } from '../../utils/firebase-config'
import { deleteDoc, doc } from 'firebase/firestore'
import style from '../../style/Articles/Articles.module.css'

const ArticleItem = ({ id, title, auther, articleDate }) => {
  const createdDate = new Date(articleDate.seconds * 1000).toUTCString()
  const { currentUser } = useAuth()

  const navigate = useNavigate()

  const deleteArticleHandler = async (id) => {
    const articleDoc = doc(db, 'articles', id)
    try {
      await deleteDoc(articleDoc)
      // console.log('delet article: ' + id)
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <li className={style.ArticleItem}>
      <div>
        <h3>{title}</h3>
        <p>By: {auther.name}</p>
        <p>At: {createdDate}</p>
      </div>
      <div>
        <button onClick={() => navigate(id)}>Reed</button>
        {currentUser?.uid === auther.id ? (
          <button onClick={() => deleteArticleHandler(id)}>Delete</button>
        ) : (
          ''
        )}
      </div>
    </li>
  )
}

export default ArticleItem
