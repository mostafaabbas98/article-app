import ArticleItem from './ArticleItem'

import style from '../../style/Articles/Articles.module.css'

const ArticlesList = ({ articles }) => {
  return (
    <ul className={style.articles}>
      {articles.map((article) => {
        return (
          <ArticleItem
            key={article.id}
            id={article.id}
            title={article.title}
            auther={article.auther}
            articleDate={article.articleDate}
          />
        )
      })}
    </ul>
  )
}

export default ArticlesList
