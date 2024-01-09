import { ChangeEvent, FormEventHandler, useState } from 'react'
import { isUri } from 'valid-url'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'

import './NewBlog.css'
import { BlogContent } from 'src/types'
import { authedApi } from 'src/api/amplify'

const PREFIX = 'NewBlog'

const classes = {
  main: `${PREFIX}-main`,
  paper: `${PREFIX}-paper`,
  container: `${PREFIX}-container`,
  uploads: `${PREFIX}-uploads`,
  input: `${PREFIX}-input`,
  buttons: `${PREFIX}-buttons`,
  button: `${PREFIX}-button`,
  link: `${PREFIX}-link`,
  textField: `${PREFIX}-textField`
}

const Root = styled('main')(({ theme }) => ({
  [`&.${classes.main}`]: {
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
  [`& .${classes.paper}`]: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)} ${theme.spacing(2)} ${theme.spacing(2)}`
  },
  [`& .${classes.container}`]: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  [`& .${classes.uploads}`]: {
    paddingBottom: '10px'
  },
  [`& .${classes.input}`]: {
    display: 'none'
  },
  [`& .${classes.buttons}`]: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  [`& .${classes.button}`]: {
    marginTop: theme.spacing(3),
    marginBottom: 20
  },
  [`& .${classes.link}`]: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    marginBottom: 10
  }
}))

function checkURL(str: string) {
  // check the url is valid
  if (isUri(str)) {
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

  const navigate = useNavigate()

  const validateForm = () => {
    return state.content?.length > 0 && state.title.length > 0
  }

  const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    let str = state.image
    if (!checkURL(str)) {
      if (str === '' || str === null || str === undefined) {
        setState({ ...state, image: 'blank' })
      } else {
        alert('not a valid url')
        setIsLoading(false)
        return false
      }
    }
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
      alert(e instanceof Error ? e.message : String(e))
    }
  }

  const createBlog = (blog: { content: BlogContent }) => {
    return authedApi('post', {
      apiName: 'notes',
      path: '/notes',
      options: {
        body: blog
      }
    })
  }

  return (
    <Root className={classes.main}>
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
              placeholder='Cover image url: "blank", "zima" or "https://..."'
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
    </Root>
  )
}

export default NewBlog
