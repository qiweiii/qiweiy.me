import { API } from "aws-amplify";


// how do we use the synchronous action creators we defined earlier together with network requests? 
// The standard way to do it with Redux is to use the Redux Thunk middleware.
export const getUserBlogs = () => async (dispatch, getState) => {
  // this user's blogs
  const response = await API.get("pages", "/pages");
  dispatch({ type: 'GET_USER_BLOGS', payload: response });
  dispatch(userBlogsReady());
}

export const getAllBlogs = () => async (dispatch, getState) => {
  // all blogs in table
  const response = await API.get("pages", "/pages/all");
  dispatch({ type: 'GET_ALL_BLOGS', payload: response });
  dispatch(allBlogsReady());
}

const userBlogsReady = () => {
  return {
    type: 'USER_BLOGS_READY',
    ready: true
  }
}

const allBlogsReady = () => {
  return {
    type: 'ALL_BLOGS_READY',
    ready: true
  }
}


// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
