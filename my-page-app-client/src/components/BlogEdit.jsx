import React, { useState, useEffect, useCallback } from 'react'
import { API } from 'aws-amplify'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import validUrl from 'valid-url'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core'
import { useLocation, useNavigate } from 'react-router-dom'
import './NewBlog.css'

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2 * 2))]: {
      width: 'auto',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    minHeight: 500,
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      minHeight: 500
    }
  },
  content: {
    minHeight: 400
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  buttonDelete: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  link: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(3),
    marginBottom: 10
  }
}))

function checkURL(str) {
  // check the url is valid
  if (validUrl.isUri(str)) {
    return true
  } else {
    // alert("not a valid url");
    return false
  }
}

const BlogEdit = () => {
  const [data, setData] = useState({
    blog: null,
    title: '',
    content: '',
    author: '',
    image: '',
    id: '',
    tags: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  const getBlogData = useCallback(async () => {
    const id = location.pathname.split('/').slice(-1)
    const res = await API.get('pages', `/pages/${id}`)
    setData({
      ...data,
      title: res.content.title,
      content: res.content.content,
      author: res.content.author,
      image: res.content.image,
      id: res.noteId,
      tags: res.content.tags
    })
  }, [])

  useEffect(() => {
    getBlogData().catch((e) => {
      console.log(e)
      alert('Blog does not exist.')
      navigate('/blogs')
    })
  }, [])

  const validateForm = () => {
    return data.content.length > 0 && data.title.length > 0
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value })
  }

  const saveNote = (blog) => {
    return API.put('pages', `/pages/${data.id}`, {
      body: blog
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    let str = data.image
    if (!checkURL(str)) {
      if (str === '' || str === null || str === undefined || str === 'blank') {
        setData({ ...data, image: 'blank' })
      } else {
        alert('not a valid url')
        return false
      }
    }
    try {
      await saveNote({
        content: {
          content: data.content,
          title: data.title,
          author: data.author,
          image: data.image,
          tags: data.tags
        }
      })
      setIsLoading(false)
      navigate('/blogs')
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }
  }

  const deleteNote = () => {
    return API.del('pages', `/pages/${data.id}`)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    const confirmed = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmed) {
      return
    }
    setIsLoading(true)
    try {
      await deleteNote()
      setIsLoading(false)
      navigate('/blogs')
    } catch (e) {
      alert(e)
      setIsLoading(false)
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-1"
                label="Content"
                single="true"
                variant="filled"
                value={data.title}
                onChange={handleChange('title')}
                required
                fullWidth
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-2"
                label="Author"
                single="true"
                variant="filled"
                value={data.author}
                onChange={handleChange('author')}
                fullWidth
                inputProps={{
                  maxLength: 50
                }}
                required
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-3"
                label="ImageURL"
                margin="normal"
                variant="filled"
                value={data.image}
                onChange={handleChange('image')}
                placeholder="Cover image of your post (need to be available online, pls put the link to that image here)"
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-4"
                label="tags"
                margin="normal"
                variant="filled"
                value={data.tags}
                inputProps={{
                  maxLength: 50
                }}
                onChange={handleChange('tags')}
                placeholder="tags of this article, separated by ','"
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea"
                label="Content"
                multiline
                rows="15"
                variant="filled"
                value={data.content}
                onChange={handleChange('content')}
                required
                fullWidth
              />
            </FormControl>
            <div className={classes.buttons}>
              <Link href="https://remarkjs.github.io/react-markdown/" target="_blank" className={classes.link}>
                Formatting help
              </Link>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
                disabled={!validateForm() || isLoading}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDelete}
                className={classes.buttonDelete}
                disabled={isLoading}
              >
                Delete
              </Button>
              {isLoading && (
                <span style={{ paddingLeft: '10px', alignSelf: 'center' }}>
                  <CircularProgress size="1.5em" />
                </span>
              )}
            </div>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  )
}

export default BlogEdit
