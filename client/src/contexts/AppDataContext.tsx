import { Dispatch, JSX, SetStateAction, createContext, useEffect, useState } from 'react'

import { useBlogs } from 'src/hooks/blogs'

type AppData = {
  userHasAuthenticated: boolean
  setUserHasAuthenticated: Dispatch<SetStateAction<boolean>>
  isBlogsListView: boolean
  setIsBlogsListView: Dispatch<SetStateAction<boolean>>
  blogsFilter: string
  setBlogsFilter: Dispatch<SetStateAction<string>>
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
}

export const AppDataContext = createContext<AppData>({
  userHasAuthenticated: false,
  setUserHasAuthenticated: () => {},
  isBlogsListView: false,
  setIsBlogsListView: () => {},
  blogsFilter: 'all',
  setBlogsFilter: () => {},
  tags: [] as string[],
  setTags: () => {}
})

export const AppDataProvider = ({ children }: { children: JSX.Element }) => {
  const [userHasAuthenticated, setUserHasAuthenticated] = useState(false)
  const [isBlogsListView, setIsBlogsListView] = useState(false)
  const [blogsFilter, setBlogsFilter] = useState('all')
  // this is a list of all tags in the database
  const [tags, setTags] = useState<string[]>([])
  const { allBlogs } = useBlogs()

  useEffect(() => {
    if (allBlogs.data) {
      let alltags = new Set<string>()
      for (const blog of allBlogs.data) {
        if (blog.content?.tags) {
          // some early blogs did not have tags (value is undefined)
          blog.content?.tags.split(/\s*[,，]\s*/).forEach((elem) => {
            alltags.add(elem)
          })
        }
      }
      // save all tags
      setTags(Array.from(alltags).sort())
    }
  }, [allBlogs.data])

  return (
    <AppDataContext.Provider
      value={{
        userHasAuthenticated,
        setUserHasAuthenticated,
        isBlogsListView,
        setIsBlogsListView,
        blogsFilter,
        setBlogsFilter,
        tags,
        setTags
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}
