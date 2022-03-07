import { useEffect, useRef, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

import { db } from '../utils/firebase-config'
import { useAuth } from '../context/auth-context'
import ArticlesList from '../components/Article/ArticlesList'

import style from '../style/page/Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  const [articles, setArticles] = useState([])

  const { currentUser } = useAuth()

  // const articleCollectionRef = collection(db, 'articles')

  //this solve the problem for component unmount and still
  //update the state after fetch data
  const componentMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentMounted.current = false
    }
  }, [])

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await getDocs(
          query(collection(db, 'articles'), orderBy('articleDate', 'desc'))
        )
        componentMounted.current &&
          setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      } catch (error) {
        console.log(error)
      }
    }
    getArticles()
  })

  return (
    <>
      <h1 className={style.title}>Welcome {currentUser?.displayName}</h1>

      {articles.length > 0 && <ArticlesList articles={articles} />}
      {articles.length === 0 && (
        <div className={style.title}>
          <h2>Thire is Not Articles yet</h2>
          {currentUser && (
            <button>
              <Link to='/add-article'>Add Article</Link>
            </button>
          )}
        </div>
      )}
    </>
  )
}

export default Home
