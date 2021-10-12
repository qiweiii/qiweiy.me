import React, { useEffect } from 'react';
import { getAllBlogs, saveTags } from './actions';
import { useSelector, useDispatch } from 'react-redux';
import Routes from './route/Routes';

// load blogs asap, so user don't need to wait everytime when go to blogs
function Main() {
  const allBlogs = useSelector(state => state.allBlogs);
  const allBlogsReady = useSelector(state => state.allBlogsReady);
  const dispatch = useDispatch();

  useEffect(() => {
    // get all blogs
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (allBlogsReady) {
      // get all tags
      let alltags = new Set();
      for (const blog of [...allBlogs]) {
        if (blog.content.tags) { // some early blogs did not have tags (value is undefined)
          blog.content.tags.split(/\s*[,，]\s*/).forEach(elem => {
            alltags.add(elem);
          });
        }
      }
      // save all tags
      dispatch(saveTags(Array.from(alltags)))
    }
  }, [allBlogsReady, allBlogs, dispatch])

  return (
    <Routes />
  );
}

export default Main;