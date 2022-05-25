import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

// Not using anymore
// Next time, consider use: https://reactrouter.com/docs/en/v6/examples/auth
const AuthRoute = ({ component: C, props: cProps, userHasAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (userHasAuthenticated ? <C {...props} {...cProps} /> : <Navigate to={`/login`} />)}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    userHasAuthenticated: state.userHasAuthenticated
  }
}

export default connect(mapStateToProps, null)(AuthRoute)
