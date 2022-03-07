import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Home from './page/Home'
import Login from './page/Login'
import SignUp from './page/SignUp'
import ForgetPassword from './page/ForgetPassword'
import AddArticle from './page/AddArticle'
import PageNotFound from './page/PageNotFound'
import RequiredAuth from './components/Layout/RequireAuth'
import RequiredNotAuth from './components/Layout/RequireNotAuth'
import ArticleDetail from './page/ArticleDetail'

import './style/app.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='home/:id' element={<ArticleDetail />} />
        <Route element={<RequiredNotAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget-password' element={<ForgetPassword />} />
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path='/add-article' element={<AddArticle />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
