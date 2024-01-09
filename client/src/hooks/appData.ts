import { useContext } from 'react'

import { AppDataContext } from 'src/contexts/AppDataContext'

export const useAppData = () => {
  const {
    userHasAuthenticated,
    setUserHasAuthenticated,
    isBlogsListView,
    setIsBlogsListView,
    blogsFilter,
    setBlogsFilter,
    tags,
    setTags
  } = useContext(AppDataContext)

  return {
    userHasAuthenticated,
    setUserHasAuthenticated,
    isBlogsListView,
    setIsBlogsListView,
    blogsFilter,
    setBlogsFilter,
    tags,
    setTags
  }
}
