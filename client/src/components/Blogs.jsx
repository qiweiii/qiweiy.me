import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles'
import ListItem from '@mui/material/ListItem'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import { Link as RouterLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { orderBy } from 'lodash-es'
import BlogCard from './BlogCard'
import BlogListItem from './BlogListItem'
import { getUserBlogs, setListSwitch, setFilter } from '../actions'
import { Helmet } from 'react-helmet'

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

const Blogs = (props) => {
  useEffect(() => {
    if (props.userHasAuthenticated) props.getUserBlogs()
  }, [])

  const processBlogs = (blogs) => {
    return orderBy(blogs, ['createdAt'], ['desc']) // sort
  }

  const handleFilterChange = (e) => {
    props.setFilter(e.target.value)
  }

  const renderBlogs = (blogs) => {
    if (props.blogListSwitch) {
      // show as a list
      return (
        <Grid container spacing={0} className={classes.listContainer} sx={{ m: 1, minWidth: 120 }}>
          {[{}].concat(blogs).map((blog, i) =>
            i === 0 ? null : (
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
            )
          )}
        </Grid>
      )
    } else {
      // show as cards
      return (
        <Grid container spacing={3} className={classes.cardContainer}>
          {[{}].concat(blogs).map((blog, i) =>
            i === 0 ? null : (
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
            )
          )}
        </Grid>
      )
    }
  }

  // defualt content for all users
  const renderAllBlogs = () => {
    return (
      <div>
        <h1 className={classes.h1}>All blogs</h1>
        {props.allBlogsReady ? (
          renderBlogs(processBlogs(props.allBlogs))
        ) : (
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        )}
      </div>
    )
  }

  // add content for users who logged in
  const renderUserBlogs = () => {
    return (
      <div>
        <h1 className={classes.h1}>Your Blogs</h1>
        <ListItem className={classes.h1}>
          <Link component={RouterLink} key="new" to="/blogs/new">
            <h3>
              <b>{'\uFF0B'}</b> Create a new blog
            </h3>
          </Link>
        </ListItem>
        {props.userBlogsReady ? (
          <div>{renderBlogs(processBlogs(props.userBlogs))}</div>
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
      {props.allBlogsReady && ( // only show when tags are ready
        <div className={classes.tools}>
          <FormControl variant="outlined" className={classes.formControl} sx={{ minWidth: 120 }} size="small">
            <InputLabel id="simple-select-label">Tags</InputLabel>
            <Select value={props.blogFilter} onChange={handleFilterChange} label="Tags" labelId="simple-select-label">
              <MenuItem key="all-blogs" value="all">
                all
              </MenuItem>
              {props.tags.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={props.blogListSwitch}
                onChange={() => {
                  props.setListSwitch()
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
      {props.userHasAuthenticated && renderUserBlogs()}
      {renderAllBlogs()}
    </Root>
  )
}

const selectVisibleBlogs = (blogs, blogfilter) => {
  if (blogfilter === 'all') return blogs
  return blogs.filter((b) => {
    if (b.content?.tags && b.content?.tags.includes(blogfilter)) return true
    return false
  })
}

const mapStateToProps = (state) => {
  return {
    userBlogs: selectVisibleBlogs(state.userBlogs, state.blogFilter),
    allBlogs: selectVisibleBlogs(state.allBlogs, state.blogFilter),
    userBlogsReady: state.userBlogsReady,
    allBlogsReady: state.allBlogsReady,
    blogListSwitch: state.blogListSwitch,
    blogFilter: state.blogFilter,
    tags: state.tags,
    userHasAuthenticated: state.userHasAuthenticated
  }
}

export default connect(mapStateToProps, { getUserBlogs, setListSwitch, setFilter })(Blogs)
