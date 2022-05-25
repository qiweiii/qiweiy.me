import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { API } from 'aws-amplify'
import validUrl from 'valid-url'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import './NewBlog.css'
import { makeStyles } from '@material-ui/styles'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  uploads: {
    paddingBottom: '10px'
  },
  input: {
    display: 'none'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: 20
  },
  link: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
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

const NewBlog = () => {
  const [state, setState] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
    tags: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()
  const navigate = useNavigate()

  const validateForm = () => {
    return state.content.length > 0 && state.title.length > 0
  }

  const handleChange = (name) => (event) => {
    setState({ ...state, [name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    let str = state.image
    if (!checkURL(str)) {
      if (str === '' || str === null || str === undefined) {
        setState({ ...state, image: 'blank' })
      } else {
        alert('not a valid url')
        return false
      }
    }
    // console.log(state.image);
    try {
      await createBlog({
        content: {
          content: state.content,
          title: state.title,
          author: state.author,
          image: state.image,
          tags: state.tags
        }
      })
      setIsLoading(false)
      navigate('/blogs')
    } catch (e) {
      setIsLoading(false)
      alert(e.message)
    }
  }

  const createBlog = (blog) => {
    // console.log(blog);
    return API.post('pages', '/pages', {
      body: blog
    })
  }

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
          <FormControl margin="normal" fullWidth>
            <TextField
              id="filled-textarea-1"
              label="Title"
              multiline
              className={classes.textField}
              margin="normal"
              variant="filled"
              value={state.title}
              onChange={handleChange('title')}
              required
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField
              id="filled-textarea-2"
              label="Author"
              className={classes.textField}
              margin="normal"
              variant="filled"
              value={state.author}
              onChange={handleChange('author')}
              required
              inputProps={{
                maxLength: 50
              }}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <TextField
              id="filled-textarea-3"
              label="ImageURL"
              className={classes.textField}
              margin="normal"
              variant="filled"
              value={state.image}
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
              value={state.tags}
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
              margin="normal"
              rows="15"
              variant="filled"
              value={state.content}
              onChange={handleChange('content')}
              required
            />
          </FormControl>
          <div className={classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!validateForm() || isLoading}
            >
              Create{' '}
              {isLoading && (
                <span style={{ paddingLeft: '10px', display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size="1.1em" />
                </span>
              )}
            </Button>
            <Link href="https://remarkjs.github.io/react-markdown/" target="_blank" className={classes.link}>
              Formatting help
            </Link>
          </div>
        </form>
      </Paper>
    </main>
  )
}

export default NewBlog
