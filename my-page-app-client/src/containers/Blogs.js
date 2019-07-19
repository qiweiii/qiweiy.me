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
import _ from 'lodash';
import { DefaultBlogs } from "./DefaultBlogs";


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

  async addDefaultBlogs() {      
    // console.log(blog);
    for (var i = 0; i < DefaultBlogs.length; i++) {
      // await this.updateState(DefaultBlogs[i]);
      await this.setState({ 
        allblogs :[...this.state.allblogs, DefaultBlogs[i]]
      });
    }
    // this.setState({ 
    //   allblogs :[...this.state.allblogs, DefaultBlogs[0],DefaultBlogs[1],DefaultBlogs[2],DefaultBlogs[3], DefaultBlogs[4],DefaultBlogs[5]]
    // }); 
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.addDefaultBlogs();
      return;
    }
    try {
      const blogs = await this.blogs();
      this.setState({ blogs });
      const ab = await this.getAllBlogs();
      this.setState({ allblogs: ab });
    } catch (e) {
      // alert(e);
      console.log(e);
    }
    // rmb to add the default blogs created by me
    this.addDefaultBlogs();
  }

  // showblogs() {
  //   for (var i = 0; i < this.state.blogs.length; i++) {
  //     console.log(this.state.blogs[i]);
  //   }
  // }

  blogs() {
    return API.get("pages", "/pages");
  }

  getAllBlogs() {
    return API.get("pages", "/pages/all");
  }

  sortBlogs(blogs) {
    // return _.sortBy(blogs, 'createdAt').reverse();
    return _.sortBy(blogs, 'createdAt');
  }

  renderBlogsList(blogs, noEditButton) {
    return [{}].concat(blogs).map(
      (blog, i) => 
        i !== 0 ?
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <BlogCard 
              content={blog.content}
              date={new Date(blog.createdAt).toLocaleDateString('en-US', { hour12: false })}
              noedit={noEditButton}
              key={blog.noteId}
              link={`/blogs/view/${blog.noteId}`}
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
          {this.renderBlogsList(this.sortBlogs(this.state.allblogs), true)}
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
          {this.renderBlogsList(this.sortBlogs(this.state.blogs), false)}
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