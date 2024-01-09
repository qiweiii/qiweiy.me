import { get } from 'aws-amplify/api'
import { useQuery } from '@tanstack/react-query'

import { Blog } from 'src/types'
import { authedApi } from 'src/api/amplify'
import { queryClient } from 'src/contexts/queryClient'

export const getUserBlogs = async () => {
  // get current user's blogs (required login)
  const response = await authedApi('get', { apiName: 'notes', path: '/notes' })
  return (await response.body.json()) as Blog[]
}

export const getAllBlogs = async () => {
  // get all blogs in the table
  const response = await get({ apiName: 'notes', path: '/notes/all' }).response
  return (await response.body.json()) as Blog[]
}

export const useBlogs = () => {
  // Queries
  const userBlogs = useQuery<Blog[]>({ queryKey: ['blogs'], queryFn: getUserBlogs }, queryClient)
  const allBlogs = useQuery<Blog[]>({ queryKey: ['blogs', 'all'], queryFn: getAllBlogs }, queryClient)
  return { userBlogs, allBlogs }
}
