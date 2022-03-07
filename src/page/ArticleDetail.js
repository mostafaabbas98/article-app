import { useEffect, useRef, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../utils/firebase-config'

import style from '../style/page/ArticleDetail.module.css'

const ArticleDetail = () => {
  const [article, setArticle] = useState()

  //this solve the problem for component unmount and still
  //update the state after fetch data
  const componentMounted = useRef(true)
  useEffect(() => {
    return () => {
      componentMounted.current = false
    }
  }, [])

  const createdDate = new Date(
    article?.articleDate.seconds * 1000
  ).toUTCString()

  const param = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const articleDoc = doc(db, 'articles', param.id)

    const getArticleData = async () => {
      try {
        const data = await getDoc(articleDoc)
        componentMounted.current && setArticle(data.data())
      } catch (error) {
        console.log('error')
      }
    }

    getArticleData()
  }, [param.id])

  return (
    <div className={style.articleBody}>
      <h2>{article?.title}</h2>
      <small>Written by: {article?.auther.name}</small>
      <br />
      <small>At: {createdDate}</small>
      <hr />
      <p>{article?.description}</p>
      <button onClick={() => navigate(-1)}>Return</button>
    </div>
  )
}

export default ArticleDetail
