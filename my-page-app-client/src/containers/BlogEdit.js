import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    minHeight: 500,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
      minHeight: 500,
    },
  },
  content: {
    minHeight: 400,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonDelete: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  }
});


class BlogView extends React.Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      blog: null,
      title: "",
      content: "",
      author: "",
    };
  }

  async componentDidMount() {
    this.setState({
      title: this.props.location.state.title,
      content: this.props.location.state.content,
      author: this.props.location.state.author,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  saveNote(blog) {
    return API.put("pages", `/pages/${this.props.match.params.id}`, {
      body: blog
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try {
      await this.saveNote({
        content: {
          content: this.state.content,
          title: this.state.title,
          author: this.state.author,
        },
      });
      this.props.history.push("/blogs");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  deleteNote() {
    return API.del("pages", `/pages/${this.props.match.params.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) {
      return;
    }
    this.setState({ isDeleting: true });
    try {
      await this.deleteNote();
      this.props.history.push("/blogs");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    const { classes } = this.props;

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
                  single
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
                  single
                  variant="filled"
                  value={this.state.author}
                  onChange={this.handleChange('author')}
                  fullWidth
                  inputProps={{
                    maxLength: 50,
                  }}
                  required
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <TextField
                  id="filled-textarea-3"
                  label="Content"
                  multiline
                  rows='15'
                  variant="filled"
                  value={this.state.content} 
                  onChange={this.handleChange('content')}
                  required
                  fullWidth
                />
              </FormControl>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.button}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleDelete}
                  className={classes.buttonDelete}
                >
                  Delete
                </Button>
              </div>
            </form>
         </Paper>
        </main>
      </React.Fragment>
    );
  }
}


BlogView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BlogView);