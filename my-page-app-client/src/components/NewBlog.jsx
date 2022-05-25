import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { API } from 'aws-amplify'
import validUrl from 'valid-url'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import './NewBlog.css'

const styles = (theme) => ({
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
})

function checkURL(str) {
  // check the url is valid
  if (validUrl.isUri(str)) {
    return true
  } else {
    // alert("not a valid url");
    return false
  }
}

class NewBlog extends React.Component {
  constructor(props) {
    super(props)

    this.file = null

    this.state = {
      title: '',
      content: '',
      author: '',
      image: '',
      tags: '',
      isLoading: false
    }
  }

  validateForm = () => {
    return this.state.content.length > 0 && this.state.title.length > 0
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    let str = this.state.image
    if (!checkURL(str)) {
      if (str === '' || str === null || str === undefined) {
        await this.setState({ image: 'blank' })
      } else {
        alert('not a valid url')
        return false
      }
    }
    // console.log(this.state.image);
    try {
      await this.createBlog({
        content: {
          content: this.state.content,
          title: this.state.title,
          author: this.state.author,
          image: this.state.image,
          tags: this.state.tags
        }
      })
      this.setState({ isLoading: false })
      this.props.history.push('/blogs')
      window.location.reload(false)
    } catch (e) {
      this.setState({ isLoading: false })
      alert(e.message)
    }
  }

  createBlog(blog) {
    // console.log(blog);
    return API.post('pages', '/pages', {
      body: blog
    })
  }

  render() {
    const { classes } = this.props

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-1"
                label="Title"
                multiline
                className={classes.textField}
                margin="normal"
                variant="filled"
                value={this.state.title}
                onChange={this.handleChange('title')}
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
                value={this.state.author}
                onChange={this.handleChange('author')}
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
                value={this.state.image}
                onChange={this.handleChange('image')}
                placeholder="Cover image of your post (need to be available online, pls put the link to that image here)"
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="filled-textarea-4"
                label="tags"
                margin="normal"
                variant="filled"
                value={this.state.tags}
                inputProps={{
                  maxLength: 50
                }}
                onChange={this.handleChange('tags')}
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
                value={this.state.content}
                onChange={this.handleChange('content')}
                required
              />
            </FormControl>
            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!this.validateForm() || this.state.isLoading}
              >
                Create{' '}
                {this.state.isLoading && (
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
}

export default withStyles(styles)(NewBlog)
