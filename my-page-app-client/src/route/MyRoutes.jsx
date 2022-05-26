import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import { useSelector } from 'react-redux'

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const NotFound = lazy(() => import('../components/NotFound'))
const Login = lazy(() => import('../components/Login'))
const Signup = lazy(() => import('../components/Signup'))
const NewBlog = lazy(() => import('../components/NewBlog'))
const Blogs = lazy(() => import('../components/Blogs'))
const BlogEdit = lazy(() => import('../components/BlogEdit'))
const BlogView = lazy(() => import('../components/BlogView'))
const More = lazy(() => import('../components/More'))

const MyRoutes = () => {
  const userHasAuthenticated = useSelector((state) => state.userHasAuthenticated)
  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/blogs" exact element={<Blogs />} />
        <Route path="/blogs/view/:id" exact element={<BlogView />} />
        {/* <AuthenticatedRoute path="/blogs/new" exact element={NewBlog} /> */}
        {/* <AuthenticatedRoute path="/blogs/edit/:id" exact element={BlogEdit} /> */}
        {/* Next time I will use https://reactrouter.com/docs/en/v6/examples/auth */}
        <Route path="/blogs/new" exact element={userHasAuthenticated ? <NewBlog /> : <Login />} />
        <Route path="/blogs/edit/:id" exact element={userHasAuthenticated ? <BlogEdit /> : <Login />} />
        <Route path="/more" exact element={<More />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default MyRoutes
