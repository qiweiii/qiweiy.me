import { combineReducers } from 'redux';
import userBlogsReducer from './userBlogsReducer';
import allBlogsReducer from './allBlogsReducer';

export default combineReducers({
  userBlogs: userBlogsReducer,
  allBlogs: allBlogsReducer,
});
