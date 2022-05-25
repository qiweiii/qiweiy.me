import { API } from 'aws-amplify'

// how do we use the synchronous action creators together with network requests?
// Use the Redux Thunk middleware
export const getUserBlogs = () => async (dispatch, getState) => {
  // get current user's blogs
  const response = await API.get('pages', '/pages').catch((e) => {})
  if (response) dispatch({ type: 'GET_USER_BLOGS', payload: response })
  dispatch(userBlogsReady())
}

export const getAllBlogs = () => async (dispatch, getState) => {
  // get all blogs in the table
  const response = await API.get('pages', '/pages/all').catch((e) => {})
  if (response) dispatch({ type: 'GET_ALL_BLOGS', payload: response })
  dispatch(allBlogsReady())
}

export const userBlogsReady = () => {
  return {
    type: 'USER_BLOGS_READY',
    ready: true
  }
}

export const allBlogsReady = () => {
  return {
    type: 'ALL_BLOGS_READY',
    ready: true
  }
}

export const setListSwitch = (checked) => {
  return {
    type: 'SET_LIST_SWITCH',
    payload: checked
  }
}

export const setFilter = (tag) => ({
  type: 'SET_FILTER',
  filter: tag
})

export const saveTags = (tags) => {
  return {
    type: 'SAVE_TAGS',
    tags: tags
  }
}

export const userAuthSuccess = () => {
  return {
    type: 'USER_AUTH_SUCCESS',
    status: true
  }
}

export const userLogout = () => {
  return {
    type: 'USER_LOGOUT',
    status: false
  }
}

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
