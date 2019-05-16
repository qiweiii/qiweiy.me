import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import config from "../config";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";


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
  textField: {
    // margin: theme.spacing.unit * 1,
  },
  textFieldContent: {
    // marginRight: theme.spacing.unit * 1,
    // height: 200,
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


class NewBlog extends React.Component {

  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      title: "",
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }

    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;
      await this.createBlog({
        attachment,
        title: this.state.title,
        content: this.state.content
      });
      this.props.history.push("/blogs");
    } catch (e) {
      alert(e.message);
    }
  }

  createBlog(page) {
    return API.post("pages", "/pages", {
      body: page
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
                id="filled-textarea"
                label="Content"
                multiline
                className={classes.textFieldContent}
                margin="normal"
                rows='15'
                variant="filled"
                value={this.state.content} 
                onChange={this.handleChange('content')}
                required
              />
            </FormControl>
            <FormControl className={classes.uploads} margin="normal" fullWidth>
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Select Image
                </Button>
              </label>
              <Input 
                accept="image"
                className={classes.input}
                id="raised-button-file"
                single
                type="file" 
                value={this.state.file}
                onChange={this.handleFileChange}
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