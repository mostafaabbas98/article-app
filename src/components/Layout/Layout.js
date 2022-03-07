import Header from './Header'
import style from '../../style/Layout/Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={style.container}>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
