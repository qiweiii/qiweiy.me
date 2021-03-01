import React, { useEffect } from 'react';
import { getAllBlogs, saveTags } from './actions';
import { connect } from 'react-redux';
import Routes from './route/Routes';

/* load blogs asap, so user don't need to wait everytime when go to blogs */
function Main({ getAllBlogs, allBlogsReady, allBlogs, saveTags }) {
  useEffect(() => {
    // console.log(childProps.isAuthenticated);
    getAllBlogs();
    // get all tags
    if (allBlogsReady) {
      let alltags = new Set();
      for (const blog of [...allBlogs]) {
        if (blog.content.tags) { // some early blogs did not have tags (value is undefined)
          blog.content.tags.split(/\s*[,，]\s*/).forEach(elem => {
            alltags.add(elem);
          });
        }
      }
      saveTags(Array.from(alltags));
    }
  // eslint-disable-next-line 
  }, [allBlogsReady]);

  return (
    <Routes />
  );
}

const mapStateToProps = state => {
  return { 
    allBlogs: state.allBlogs,
    allBlogsReady: state.allBlogsReady
  };
};

export default connect(
  mapStateToProps,
  { getAllBlogs, saveTags }
)(Main);