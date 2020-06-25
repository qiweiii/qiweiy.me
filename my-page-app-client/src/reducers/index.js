import { combineReducers } from 'redux';
import userBlogsReducer from './userBlogsReducer';
import allBlogsReducer from './allBlogsReducer';

export default combineReducers({
  userBlogs: userBlogsReducer,
  allBlogs: allBlogsReducer,
  blogsIsReady: blogsReady
});


function blogsReady(state = { 
  allBlogsReady: false,
  userBlogsReady: false
}, action) {
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