import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { API } from 'aws-amplify'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import validUrl from 'valid-url'
import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress'
import './NewBlog.css'

const styles = (theme) => ({
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

class BlogEdit extends React.Component {
  constructor(props) {
    super(props)

    this.file = null

    this.state = {
      blog: null,
      title: '',
      content: '',
      author: '',
      image: '',
      id: '',
      tags: '',
      isLoading: false
    }
  }

  async componentDidMount() {
    // console.log(this.props.location.state)
    if (!this.props.location.state) {
      this.props.history.push('/blogs')
    } else {
      this.setState({
        title: this.props.location.state.title,
        content: this.props.location.state.content,
        author: this.props.location.state.author,
        image: this.props.location.state.image,
        id: this.props.location.state.id,
        tags: this.props.location.state.tags
      })
    }
  }

  validateForm = () => {
    return this.state.content.length > 0 && this.state.title.length > 0
  }

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value })
  }

  saveNote(blog) {
    return API.put('pages', `/pages/${this.state.id}`, {
      body: blog
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    this.setState({ isLoading: true })
    let str = this.state.image
    if (!checkURL(str)) {
      if (str === '' || str === null || str === undefined || str === 'blank') {
        await this.setState({ image: 'blank' })
      } else {
        alert('not a valid url')
        return false
      }
    }
    try {
      await this.saveNote({
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
      window.location.reload(false) // false means use cached version
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  deleteNote() {
    return API.del('pages', `/pages/${this.state.id}`)
  }

  handleDelete = async (event) => {
    event.preventDefault()
    const confirmed = window.confirm('Are you sure you want to delete this blog?')
    if (!confirmed) {
      return
    }
    this.setState({ isLoading: true })
    try {
      await this.deleteNote()
      this.setState({ isLoading: false })
      this.props.history.push('/blogs')
      window.location.reload(false)
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="filled-textarea-1"
                  label="Content"
                  single="true"
                  variant="filled"
                  value={this.state.title}
                  onChange={this.handleChange('title')}
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
                  value={this.state.author}
                  onChange={this.handleChange('author')}
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
                  rows="15"
                  variant="filled"
                  value={this.state.content}
                  onChange={this.handleChange('content')}
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
                  disabled={!this.validateForm() || this.state.isLoading}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleDelete}
                  className={classes.buttonDelete}
                  disabled={this.state.isLoading}
                >
                  Delete
                </Button>
                {this.state.isLoading && (
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
}

export default withStyles(styles)(BlogEdit)
