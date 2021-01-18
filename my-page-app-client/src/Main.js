import React, { useEffect } from 'react';
import { getAllBlogs, getUserBlogs, saveTags } from './actions';
import { connect } from 'react-redux';
import Routes from './route/Routes';

/* load blogs asap, so user don't need to wait everytime when go to blogs */
function Main({childProps, getAllBlogs, getUserBlogs, blogsReady, userBlogs, allBlogs, saveTags}) {
  useEffect(() => {
    getAllBlogs();
    getUserBlogs();
    // get all tags
    if (blogsReady) {
      let alltags = new Set();
      for (const blog of [...userBlogs, ...allBlogs]) {
        if (blog.content.tags) { // some early blogs did not have tags (value is undefined)
          blog.content.tags.split(/\s*[,，]\s*/).forEach(elem => {
            alltags.add(elem);
          });
        }
      }
      saveTags(Array.from(alltags));
    }
  // eslint-disable-next-line 
  }, [blogsReady]); // if i put in all dependencies, it runs infinitely, am i changing userBlogs and allBlogs constantly?

  return (
    <Routes childProps={childProps}/>
  );
}

const mapStateToProps = state => {
  return { 
    userBlogs: state.userBlogs,
    allBlogs: state.allBlogs,
    blogsReady: state.blogsIsReady.allBlogsReady && state.blogsIsReady.userBlogsReady,
  };
};

export default connect(
  mapStateToProps,
  { getUserBlogs, getAllBlogs, saveTags }
)(Main);