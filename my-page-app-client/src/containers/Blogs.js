import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { API } from "aws-amplify";
import BlogCard from "./BlogCard";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link';
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
      blogs: [],
      allblogs: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
    try {
      const blogs = await this.blogs();
      this.setState({ blogs });
      const ab = await this.getAllBlogs();
      this.setState({ allblogs: ab });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }

  blogs() {
    return API.get("pages", "/pages");
  }

  getAllBlogs() {
    return API.get("pages", "/pages/all");
  }

  renderBlogsList(blogs) {
    return [{}].concat(blogs).map(
      (blog, i) => 
        i !== 0 ?
        <Grid item xs={12} sm={6} md={3} header={blog.content.trim().split("\n")[0]}>
            <BlogCard 
              content={blog.content}
              date={new Date(blog.createdAt).toLocaleString()}
              title={blog.title}
              image={blog.attachment}
              key={blog.noteId}
              link={`/blogs/${blog.noteId}`}
            />
        </Grid>
        : null
    );
  }

  renderAllBlogs() {
    const { classes } = this.props;
    return (
      <div>
        <h1>All blogs</h1>
        <Grid container spacing={24} className={classes.list}>
          {this.renderBlogsList(this.state.allblogs)}
        </Grid>
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
          {this.renderBlogsList(this.state.blogs)}
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