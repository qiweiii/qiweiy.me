import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

import { useAppData } from 'src/hooks/appData'
import Me from 'src/components/Me'

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
  const userHasAuthenticated = useAppData()

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '90vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Me />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/view/:id" element={<BlogView />} />
        <Route path="/blogs/new" element={userHasAuthenticated ? <NewBlog /> : <Login />} />
        <Route path="/blogs/edit/:id" element={userHasAuthenticated ? <BlogEdit /> : <Login />} />
        <Route path="/more" element={<More />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default MyRoutes
