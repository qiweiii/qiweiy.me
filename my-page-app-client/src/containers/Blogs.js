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
import BlogCard from "./BlogCard";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink, withRouter } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
      maxWidth: '1000',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  list: {
    marginTop: theme.spacing.unit * 1,
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
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


class Blogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blogs: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const blogs = await this.blogs();
      this.setState({ blogs });
    } catch (e) {
      alert(e);
      console.log(e);
    }
    this.setState({ isLoading: false });
  }

  blogs() {
    return API.get("pages", "/pages");
  }

  renderBlogsList(blogs) {
    return [{}].concat(blogs).map(
      (blog, i) => 
        i !== 0 ?
        <Grid item xs={12} sm={6} md={3} header={blog.content.trim().split("\n")[0]}>
          <Link 
            component={RouterLink} 
            key={blog.noteId}
            to={`/pages/${blog.noteId}`}
          >
            <BlogCard 
              content={blog.content}
              date={new Date(blog.createdAt).toLocaleString()}
              title={blog.title}
              image={blog.attachment}
            />
          </Link>
        </Grid>
        : null
    );
  }

  renderAllBlogs() {
    return (
      <div>
        <h1>All blogs</h1>
        <p>get all blogs here, add a blog that says how to use! login and stuff</p>
      </div>
    );
  }

  renderUserBlogs() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <h1>Your Blogs</h1>
          <ListItem>
            <Link
              component={RouterLink}
              key="new"
              to="/blogs/new"
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new blog
              </h4>
            </Link>
          </ListItem>
        <Grid container spacing={24} className={classes.list}>
          {!this.state.isLoading && this.renderBlogsList(this.state.blogs)}
        </Grid>
        <Divider/>
        <div>
          {this.renderAllBlogs()}
        </div>
      </main>
    );
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? 
          this.renderUserBlogs()
          : 
          this.renderAllBlogs()
        }
      </div>
    );
  }
}

Blogs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blogs);