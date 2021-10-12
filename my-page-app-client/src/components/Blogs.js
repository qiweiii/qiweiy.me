import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import { Link as RouterLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { orderBy } from 'lodash-es';
import BlogCard from "./BlogCard";
import BlogListItem from "./BlogListItem";
import { getUserBlogs, setListSwitch, setFilter } from "../actions";
import { Helmet } from "react-helmet";


const styles = theme => ({
  h1: {
    paddingLeft: theme.spacing(3),
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
    // marginLeft: theme.spacing(2),
    width: '100%',
    padding: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px ${theme.spacing(3)}px`,
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
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "30px"
  },
  tools: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px'
  },
  formControl: {
    margin: '12px'
  }
});

const regex = /[\s,_#/]/g // regex for title in URL

class Blogs extends React.Component {

  componentDidMount() {
    if (this.props.userHasAuthenticated) this.props.getUserBlogs();
  }

  processBlogs(blogs) {
    return orderBy(blogs, ['createdAt'], ['desc']); // sort
  }

  handleFilterChange = (e) => {
    this.props.setFilter(e.target.value);
  }

  // helper function
  renderBlogs(blogs) {
    const { classes } = this.props;
    if (this.props.blogListSwitch) {
      // show as a list
      return (
        <Grid container spacing={0} className={classes.listContainer}>
          {[{}].concat(blogs).map((blog, i) => i === 0 ? null :
            <Grid item xs={12} key={blog.noteId}>
              <BlogListItem 
                content={blog.content}
                editedAt={new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false })}
                createdAt={new Date(blog.createdAt).toLocaleDateString('en-US', { hour12: false })}
                key={blog.noteId}
                id={blog.noteId}
                link={`/blogs/view/${blog.content.title.replace(regex, '-')}-${blog.noteId}`}
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
                editedAt={new Date(blog.editedAt).toLocaleDateString('en-US', { hour12: false })}
                createdAt={new Date(blog.createdAt).toLocaleDateString('en-US', { hour12: false })}
                key={blog.noteId}
                id={blog.noteId}
                link={`/blogs/view/${blog.content.title.replace(regex, '-')}-${blog.noteId}`}
              />
            </Grid>
          )}
        </Grid>
      )
    }
  }

  // defualt content for all users
  renderAllBlogs() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.h1}>All blogs</h1>
        { this.props.allBlogsReady ?
          this.renderBlogs(this.processBlogs(this.props.allBlogs))
          :
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        }
      </div>
    );
  }

  // add content for users who logged in
  renderUserBlogs() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.h1}>Your Blogs</h1>
        <ListItem className={classes.h1}>
          <Link
            component={RouterLink}
            key="new"
            to="/blogs/new"
          >
            <h3>
              <b>{"\uFF0B"}</b> Create a new blog
            </h3>
          </Link>
        </ListItem>
        { this.props.userBlogsReady ?
          <div>
            {this.renderBlogs(this.processBlogs(this.props.userBlogs))}
          </div>
          :
          <div className={classes.spinner}>
            <CircularProgress />
          </div>
        }
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* change meta */}
        <Helmet>
          <title>Qiwei Yang - Blogs</title>
          <meta property="og:title" content="Qiwei Yang - Blogs" />
          <meta property="og:type" content="website" />
          <meta name="description" content="Qiwei Yang - Blogs" />
        </Helmet>

        {/* render blogs filter and list switch */}
        { this.props.allBlogsReady && // only show when tags are ready
          <div className={classes.tools}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Tags</InputLabel>
              <Select
                native
                value={this.props.blogFilter}
                onChange={this.handleFilterChange}
                label="Tags"
                inputProps={{
                  name: 'tags',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option key="all-blogs" value="all">all</option>
                {this.props.tags.map(item => 
                  <option key={item} value={item}>{item}</option>
                )}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={this.props.blogListSwitch}
                  onChange={() => {this.props.setListSwitch()}}
                  name="listToggle"
                  color="primary"
                />
              }
              style={{ marginLeft: 4 }}
              label="List"
            />
          </div>
        }

        {/* render blogs */}
        { this.props.userHasAuthenticated && this.renderUserBlogs() }
        { this.renderAllBlogs() }
      </div>
    );
  }
}

const selectVisibleBlogs = (blogs, blogfilter) => {
  if (blogfilter === "all") return blogs;
  return blogs.filter(b => {
    if (b.content.tags && b.content.tags.includes(blogfilter)) return true;
    return false;
  })
}

const mapStateToProps = state => {
  return { 
    userBlogs: selectVisibleBlogs(state.userBlogs, state.blogFilter),
    allBlogs: selectVisibleBlogs(state.allBlogs, state.blogFilter),
    userBlogsReady: state.userBlogsReady,
    allBlogsReady: state.allBlogsReady,
    blogListSwitch: state.blogListSwitch,
    blogFilter: state.blogFilter,
    tags: state.tags,
    userHasAuthenticated: state.userHasAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { getUserBlogs, setListSwitch, setFilter }
)(withStyles(styles)(Blogs));