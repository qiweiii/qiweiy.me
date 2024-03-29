import { ChangeEvent, FormEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { get } from 'aws-amplify/api'
import { isUri } from 'valid-url'
import { styled } from '@mui/material/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import './NewBlog.css'
import { Blog, BlogContent } from 'src/types'
import { authedApi, authedDel } from '../api/amplify'

const PREFIX = 'BlogEdit'

const classes = {
  layout: `${PREFIX}-layout`,
  paper: `${PREFIX}-paper`,
  content: `${PREFIX}-content`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  buttonDelete: `${PREFIX}-buttonDelete`,
  link: `${PREFIX}-link`,
  container: `${PREFIX}-container` // <form>
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.layout}`]: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(650)]: {
      width: 'auto',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },

  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    minHeight: 500,
    [theme.breakpoints.up(660)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
      minHeight: 500
    }
  },

  [`& .${classes.content}`]: {
    minHeight: 400
  },

  [`& .${classes.buttons}`]: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  [`& .${classes.button}`]: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },

  [`& .${classes.buttonDelete}`]: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

  [`& .${classes.link}`]: {
    marginTop: theme.spacing(4),
    marginRight: theme.spacing(3),
    marginBottom: 10
  }
}))

// check the url is valid
function checkURL(str: string) {
  if (isUri(str)) {
    return true
  } else {
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
  const location = useLocation()
  const navigate = useNavigate()

  const getBlogData = useCallback(async () => {
    setIsLoading(true)
    const id = location.pathname.split('/').slice(-1)
    const res = await get({ apiName: 'notes', path: `/notes/${id}` }).response
    const blog = (await res?.body?.json()) as unknown as Blog
    setData({
      ...data,
      title: blog.content?.title,
      content: blog.content?.content,
      author: blog.content?.author,
      image: blog.content?.image || '',
      id: blog.noteId,
      tags: blog.content?.tags
    })
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getBlogData().catch((error) => {
      console.error('[BlogEdit] ' + `${error instanceof Error ? error.message : String(error)}`)
      navigate('/blogs')
    })
  }, [])

  const validateForm = () => {
    return data.content?.length > 0 && data.title.length > 0
  }

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [name]: event.target.value })
  }

  const saveNote = (blog: { content: BlogContent }) => {
    return authedApi('put', {
      apiName: 'notes',
      path: `/notes/${data.id}`,
      options: {
        body: blog
      }
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    let str = data.image
    if (!checkURL(str)) {
      if (str === '' || str === null || str === undefined || str === 'blank') {
        setData({ ...data, image: 'blank' })
      } else {
        alert('not a valid url')
        setIsLoading(false)
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
      alert(e instanceof Error ? e.message : String(e))
      setIsLoading(false)
    }
  }

  const deleteNote = () => {
    return authedDel({ apiName: 'notes', path: `/notes/${data.id}` })
  }

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
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
      alert(e instanceof Error ? e.message : String(e))
      setIsLoading(false)
    }
  }

  return (
    <Root>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-1"
                label="Content"
                maxRows={1}
                variant="filled"
                value={data.title}
                onChange={handleChange('title')}
                required
                fullWidth
                disabled={isLoading}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-2"
                label="Author"
                maxRows={1}
                variant="filled"
                value={data.author}
                onChange={handleChange('author')}
                fullWidth
                inputProps={{
                  maxLength: 50
                }}
                required
                disabled={isLoading}
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
                placeholder='Cover image url: "blank", "zima" or "https://..."'
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
    </Root>
  )
}

export default BlogEdit
