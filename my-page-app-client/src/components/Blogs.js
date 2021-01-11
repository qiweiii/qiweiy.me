import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Link as RouterLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import BlogCard from "./BlogCard";
import BlogListItem from "./BlogListItem";
import { setListSwitch } from "../actions";


const styles = theme => ({
  h1: {
    paddingLeft: 12,
  },
  listContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      width: 'auto',
      margin: '3% 18% 3% 18%',
    },
    [theme.breakpoints.up(1000 + theme.spacing(3 * 2))]: {
      width: 'auto',
      margin: '3% 21% 3% 21%',
    },
  },
  cardContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
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
    display: 'flex',
    justifyContent: 'center',
    marginTop: "20%"
  },
  switch: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px'
  }
});

class Blogs extends React.Component {

  sortBlogs(blogs) {
    blogs = blogs[0]
    return _.orderBy(blogs, ['createdAt'], ['desc']);
  }

  renderBlogs(blogs, noEditButton) {
    const { classes } = this.props;
    // console.log(blogs[0]);
    if (this.props.blogListSwitch) {
      return (
        <Grid container spacing={0} className={classes.listContainer}>
          {[{}].concat(blogs).map((blog, i) => i === 0 ? null :
            <Grid item xs={12} key={blog.noteId}>
              <BlogListItem 
                content={blog.content}
                edit={new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false })}
                create={new Date(blog.createdAt).toLocaleDateString('en-US', { hour12: false })}
                noedit={noEditButton}
                key={blog.noteId}
                link={`/blogs/view/${blog.noteId}`}
              />
            </Grid>
          )}
        </Grid>
      )
    } else {
      // show as cards
      return (
        <Grid container spacing={3} className={classes.cardContainer}>
          {[{}].concat(blogs).map((blog, i) => i === 0 ? null :
            <Grid item xs={12} sm={6} md={4} lg={3} key={blog.noteId}>
              <BlogCard 
                content={blog.content}
                edit={new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false })}
                create={new Date(blog.createdAt).toLocaleDateString('en-US', { hour12: false })}
                noedit={noEditButton}
                key={blog.noteId}
                link={`/blogs/view/${blog.noteId}`}
              />
            </Grid>
          )}
        </Grid>
      )
    }
  }

  // content for guests (when user is not logged in)
  renderAllBlogs() {
    return (
      <div>
        {this.renderBlogs(this.sortBlogs(this.props.allBlogs), true)}
      </div>
    );
  }

  // content for user who logged in
  renderUserBlogs() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.h1}>Your Blogs</h1>
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
          {this.renderBlogs(this.sortBlogs(this.props.userBlogs), false)}
        <Divider/>
        <h1 className={classes.h1}>All blogs</h1>
        <div>
          {this.renderAllBlogs()}
        </div>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.switch}>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.blogListSwitch}
                onChange={() => {this.props.setListSwitch()}}
                name="listToggle"
                color="primary"
              />
            }
            label="List"
          />
        </div>
        { this.props.blogsReady ? 
          ( this.props.isAuthenticated ? 
            this.renderUserBlogs()
            : 
            this.renderAllBlogs()
          )
          :
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
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
    allBlogs: state.allBlogs,
    blogsReady: state.blogsIsReady.allBlogsReady && state.blogsIsReady.userBlogsReady,
    blogListSwitch: state.blogListSwitch
  };
};

export default connect(
  mapStateToProps,
  { setListSwitch }
)(withStyles(styles)(Blogs));