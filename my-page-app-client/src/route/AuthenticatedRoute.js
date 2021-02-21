import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

const AuthRoute = ({ component: C, props: cProps, userHasAuthenticated, ...rest }) => {
  return <Route
    {...rest}
    render={props =>
      userHasAuthenticated
        ? <C {...props} {...cProps} />
        : <Redirect
            to={`/login`}
          />}
  />;
}

const mapStateToProps = state => {
  return { 
    userHasAuthenticated: state.userHasAuthenticated,
  };
};

export default connect(
  mapStateToProps,
  null
)(AuthRoute);