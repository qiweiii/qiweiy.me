import { API } from "aws-amplify";


export const getUserBlogs = () => async (dispatch, getState) => {
  // this user's blogs
  const response = await API.get("pages", "/pages");
  dispatch({ type: 'GET_USER_BLOGS', payload: response });
}

export const getAllBlogs = () => async (dispatch, getState) => {
  // all blogs in table
  const response = await API.get("pages", "/pages/all");
  dispatch({ type: 'GET_ALL_BLOGS', payload: response });
}


// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
