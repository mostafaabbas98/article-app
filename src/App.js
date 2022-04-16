import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Home from './page/Home';
// import Login from './page/Login';
// import SignUp from './page/SignUp';
// import ForgetPassword from './page/ForgetPassword';
// import AddArticle from './page/AddArticle'
// import PageNotFound from './page/PageNotFound';
import RequiredAuth from './components/Layout/RequireAuth';
import RequiredNotAuth from './components/Layout/RequireNotAuth';
// import ArticleDetail from './page/ArticleDetail';

import './style/app.css';

const AddArticle = React.lazy(() => import('./page/AddArticle'));
const ArticleDetail = React.lazy(() => import('./page/ArticleDetail'));
const Login = React.lazy(() => import('./page/Login'));
const SignUp = React.lazy(() => import('./page/SignUp'));
const ForgetPassword = React.lazy(() => import('./page/ForgetPassword'));
const PageNotFound = React.lazy(() => import('./page/PageNotFound'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<h1>Loading....</h1>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="home/:id" element={<ArticleDetail />} />
          <Route element={<RequiredNotAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Route>
          <Route element={<RequiredAuth />}>
            <Route path="/add-article" element={<AddArticle />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
