import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'
import Home from '../components/Home'

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const NotFound = lazy(() => import('../components/NotFound'))
const Login = lazy(() => import('../components/Login'))
const Signup = lazy(() => import('../components/Signup'))
const NewBlog = lazy(() => import('../components/NewBlog'))
const Blogs = lazy(() => import('../components/Blogs'))
const BlogEdit = lazy(() => import('../components/BlogEdit'))
const BlogView = lazy(() => import('../components/BlogView'))
const More = lazy(() => import('../components/More'))

export default () => (
  <Suspense fallback={<div></div>}>
    <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <AuthenticatedRoute path="/blogs/new" exact component={NewBlog} />
      <Route path="/blogs" exact component={Blogs} />
      <AuthenticatedRoute path="/blogs/edit/:id" exact component={BlogEdit} />
      <Route path="/blogs/view/:id" exact component={BlogView} />
      <Route path="/more" exact component={More} />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Routes>
  </Suspense>
)
