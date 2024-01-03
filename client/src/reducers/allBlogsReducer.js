export default (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_BLOGS':
      return action.payload
    default:
      return state
  }
}
