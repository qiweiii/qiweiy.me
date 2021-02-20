import { combineReducers } from 'redux';
import userBlogsReducer from './userBlogsReducer';
import allBlogsReducer from './allBlogsReducer';

// note abt reducer in case i forget again
// 1. if i use matchPropsToState in a component, i will get the corresponding "state objects" exported from here
// 2. each reducer function here is responsible for one "state object", i should put actions for it inside one reducer function
// 3. argument state is initial state, reducer function's return is the new state

const blogsReady = (state = { 
  allBlogsReady: false,
  userBlogsReady: false
}, action) => {
  switch (action.type) {
    case 'USER_BLOGS_READY':
      return {
        ...state,
        userBlogsReady: action.ready
      }
    case 'ALL_BLOGS_READY':
      return {
        ...state,
        allBlogsReady: action.ready
      }
    default:
      return state;
  }
}

const blogListSwitch = (checked = false, action) => {
  if (action.type === 'SET_LIST_SWITCH') {
    return !checked;
  }
  return checked;
}

const blogFilter = (state = "all", action) => {
  switch(action.type) {
    case 'SET_FILTER': {
      return action.filter;
    }
    default:
      return state;
  }
}

const tags = (state = [], action) => {
  switch(action.type) {
    case 'SAVE_TAGS': {
      return action.tags;
    }
    default:
      return state;
  }
}

// const curBlog = (state = {}, action) => {
//   switch (action.type) {
//     case 'GET_BLOG_BY_ID':
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const curBlogReady = (state = false, action) => {
//   switch (action.type) {
//     case 'CUR_BLOG_READY':
//       return action.ready;
//     default:
//       return state;
//   }
// }

export default combineReducers({
  userBlogs: userBlogsReducer,
  allBlogs: allBlogsReducer,
  // curBlog: curBlog,
  blogsAreReady: blogsReady,
  // curBlogReady: curBlogReady,
  blogListSwitch: blogListSwitch,
  blogFilter: blogFilter,
  tags: tags
});