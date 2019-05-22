import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { API } from "aws-amplify";
import validUrl from "valid-url";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  uploads: {
    paddingBottom: '10px',
  },
  input: {
    display: 'none',
  },
  submit: {
    marginBottom: 20,
  }
});

function checkURL(str) {
  // check the url is valid
  if (validUrl.isUri(str)
    || str === ""
    || str === null
    || str === undefined) {
    return true;
  } else {
    alert("not a valid url");
    return false;
  }
};

class NewBlog extends React.Component {

  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      title: "",
      content: "",
      author: "",
      image: "",
    };
  }

  

  validateForm() {
    return this.state.content.length > 0 && this.state.title.length > 0;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (!checkURL(this.state.image)) {
      return false;
    }
    console.log(this.state.title);
    try {
      await this.createBlog({
        content: {
          content: this.state.content,
          title: this.state.title,
          author: this.state.author,
          image: this.state.image,
        }
      });
      this.props.history.push("/blogs");
    } catch (e) {
      alert(e.message);
    }
  }

  createBlog(blog, title) {
    return API.post("pages", "/pages", {
      body: blog,
    });
  }



  render() {
    const { classes } = this.props;

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
                minputProps={{
                  maxLength: 50,
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
                id="filled-textarea"
                label="Content"
                multiline
                margin="normal"
                rows='15'
                variant="filled"
                value={this.state.content} 
                onChange={this.handleChange('content')}
                required
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.validateForm()}
            >
              Create
            </Button>
          </form>

        </Paper>
      </main>
    );
  }
}

NewBlog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewBlog);