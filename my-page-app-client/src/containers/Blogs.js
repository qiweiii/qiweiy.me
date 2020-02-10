import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BlogCard from "./BlogCard";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink} from 'react-router-dom'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAllBlogs, getUserBlogs } from '../actions';
import { connect } from 'react-redux';


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
  },
  spinner: {
    display: "flex",
    justifyContent: 'center',
    marginTop: "15%"
  }
});

class Blogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    // the following if block is here because amplify does not allow calling of api without authentication
    // if (!this.props.isAuthenticated) {
    //   this.addDefaultBlogs();
    //   return;
    // }

    // switched to redux
    await this.props.getAllBlogs();
    await this.props.getUserBlogs();
    this.setState({ isLoading: false });
    
    // try {
    //   const blogs = await this.blogs();
    //   this.setState({ blogs });
    //   const ab = await this.getAllBlogs();
    //   this.setState({ 
    //     allblogs: ab,
    //     isLoading: false
    //   });
    // } catch (e) {
    //   // alert(e);
    //   console.log(e);
    // }
    // rmb to add the default blogs created by me to allblogs list
  }

  // showblogs() {
  //   for (var i = 0; i < this.state.blogs.length; i++) {
  //     console.log(this.state.blogs[i]);
  //   }
  // }
  
  sortBlogs(blogs) {
    // return _.sortBy(blogs, 'createdAt').reverse();
    return _.sortBy(blogs, 'createdAt');
  }

  renderBlogsList(blogs, noEditButton) {
    // console.log(blogs[0]);
    return [{}].concat(blogs[0]).map(
      (blog, i) => 
        i !== 0 ?
        <Grid item xs={12} sm={6} md={4} lg={3} key={blog.noteId}>
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
          {this.renderBlogsList(this.sortBlogs(this.props.allBlogs), true)}
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
          {this.renderBlogsList(this.sortBlogs(this.props.userBlogs), false)}
        </Grid>
        <Divider/>
        <div>
          {this.renderAllBlogs()}
        </div>
      </main>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        { this.state.isLoading ? 
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
        :
        ( this.props.isAuthenticated ? 
          this.renderUserBlogs()
          : 
          this.renderAllBlogs()
        )
      }
      </div>
    );
  }
}

Blogs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { 
    userBlogs: state.userBlogs,
    allBlogs: state.allBlogs
  };
};

export default connect(
  mapStateToProps,
  { getUserBlogs, getAllBlogs }
)(withStyles(styles)(Blogs));