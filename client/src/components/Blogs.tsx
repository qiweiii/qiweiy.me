import { Helmet } from 'react-helmet'
import { Link as RouterLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import Link from '@mui/material/Link'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import orderBy from 'lodash/orderBy'

import { Blog } from 'src/types'
import { useAppData } from 'src/hooks/appData'
import { useBlogs } from 'src/hooks/blogs'
import BlogCard from './BlogCard'
import BlogListItem from './BlogListItem'

const PREFIX = 'Blogs'

const classes = {
  h1: `${PREFIX}-h1`,
  listContainer: `${PREFIX}-listContainer`,
  cardContainer: `${PREFIX}-cardContainer`,
  uploads: `${PREFIX}-uploads`,
  input: `${PREFIX}-input`,
  submit: `${PREFIX}-submit`,
  spinner: `${PREFIX}-spinner`,
  tools: `${PREFIX}-tools`,
  formControl: `${PREFIX}-formControl`
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.h1}`]: {
    paddingLeft: theme.spacing(3)
  },
  [`& .${classes.listContainer}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
    padding: `${theme.spacing(1)} ${theme.spacing(3)} ${theme.spacing(2)}`,
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      margin: '3% 12% 3% 12%'
    },
    [theme.breakpoints.up('lg')]: {
      width: 'auto',
      margin: '3% 16% 3% 16%'
    }
  },
  [`& .${classes.cardContainer}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
    width: '100%',
    padding: `${theme.spacing(1)} 0 ${theme.spacing(2)} ${theme.spacing(3)}`
  },
  [`& .${classes.uploads}`]: {
    paddingBottom: '10px'
  },
  [`& .${classes.input}`]: {
    display: 'none'
  },
  [`& .${classes.submit}`]: {
    marginBottom: 20
  },
  [`& .${classes.spinner}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '80px',
    marginBottom: '30px'
  },
  [`& .${classes.tools}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px'
  },
  [`& .${classes.formControl}`]: {
    margin: '12px'
  }
}))

const regex = /[\s,_#?/]/g // regex for title in URL

const selectVisibleBlogs = (blogs: Blog[], blogfilter: string) => {
  if (blogfilter === 'all') return blogs
  return blogs.filter((b) => {
    if (b.content?.tags && b.content?.tags.includes(blogfilter)) return true
    return false
  })
}

const processBlogs = (blogs: Blog[]) => {
  return orderBy(blogs, ['createdAt'], ['desc']) // sort
}

const Blogs = () => {
  const { userBlogs: userBlogsQuery, allBlogs: allBlogsQuery } = useBlogs()
  const { userHasAuthenticated, isBlogsListView, setIsBlogsListView, blogsFilter, setBlogsFilter, tags } = useAppData()
  const userBlogs = selectVisibleBlogs(userBlogsQuery.data || [], blogsFilter)
  const allBlogs = selectVisibleBlogs(allBlogsQuery.data || [], blogsFilter)

  const handleFilterChange = (e: SelectChangeEvent<string>) => {
    setBlogsFilter(e.target.value)
  }

  const renderBlogs = (blogs: Blog[]) => {
    if (isBlogsListView) {
      // show as a list
      return (
        <Grid container spacing={0} className={classes.listContainer} sx={{ m: 1, minWidth: 120 }}>
          {blogs.map((blog, i) => (
            <Grid item xs={12} key={blog.noteId}>
              <BlogListItem
                content={blog.content}
                editedAt={new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false })}
                createdAt={new Date(blog.createdAt).toLocaleDateString('en-US', {
                  hour12: false
                })}
                key={blog.noteId + i}
                id={blog.noteId}
                link={`/blogs/view/${blog.content?.title.replace(regex, '-')}-${blog.noteId}`}
              />
            </Grid>
          ))}
        </Grid>
      )
    } else {
      // show as cards
      return (
        <Grid container spacing={3} className={classes.cardContainer}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog.noteId}>
              <BlogCard
                content={blog.content}
                editedAt={new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false })}
                createdAt={new Date(blog.createdAt).toLocaleDateString('en-US', {
                  hour12: false
                })}
                key={blog.noteId}
                id={blog.noteId}
                link={`/blogs/view/${blog.content?.title.replace(regex, '-')}-${blog.noteId}`}
              />
            </Grid>
          ))}
        </Grid>
      )
    }
  }

  // defualt content for all users
  const renderAllBlogs = (blogsCount?: number) => {
    return (
      <div>
        <h1 className={classes.h1}>All blogs {`(${blogsCount || 0})`}</h1>
        {allBlogsQuery.isFetched ? (
          renderBlogs(processBlogs(allBlogs))
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
    )
  }

  // add content for users who logged in
  const renderUserBlogs = (blogsCount?: number) => {
    return (
      <div>
        <h1 className={classes.h1}>Your Blogs {`(${blogsCount || 0})`}</h1>
        <ListItem className={classes.h1}>
          <Link component={RouterLink} key="new" to="/blogs/new">
            <h3>
              <b>{'\uFF0B'}</b> Create a new blog
            </h3>
          </Link>
        </ListItem>
        {userBlogsQuery.isFetched ? (
          <div>{renderBlogs(processBlogs(userBlogs))}</div>
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
    )
  }

  return (
    <Root>
      {/* change meta */}
      <Helmet>
        <title>Qiwei Yang - Blogs</title>
        <meta property="og:title" content="Qiwei Yang - Blogs" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Qiwei Yang - Blogs" />
      </Helmet>

      {/* render blogs filter and list switch */}
      {allBlogsQuery.isFetched && ( // only show when tags are ready
        <div className={classes.tools}>
          <FormControl variant="outlined" className={classes.formControl} sx={{ minWidth: 120 }} size="small">
            <InputLabel id="simple-select-label">Tags</InputLabel>
            <Select value={blogsFilter} onChange={handleFilterChange} label="Tags" labelId="simple-select-label">
              <MenuItem key="all-blogs" value="all">
                all
              </MenuItem>
              {tags.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={isBlogsListView}
                onChange={() => {
                  setIsBlogsListView(!isBlogsListView)
                }}
                name="listToggle"
                color="primary"
              />
            }
            style={{ marginLeft: 4 }}
            label="List"
          />
        </div>
      )}

      {/* render blogs */}
      {userHasAuthenticated && renderUserBlogs(userBlogs?.length)}
      {renderAllBlogs(allBlogs?.length)}
    </Root>
  )
}

export default Blogs
