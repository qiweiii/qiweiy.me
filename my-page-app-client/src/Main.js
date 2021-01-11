import React, { useEffect } from 'react';
import { getAllBlogs, getUserBlogs } from './actions';
import { connect } from 'react-redux';
import Routes from './route/Routes';

/* load blogs asap, so user don't need to wait everytime when go to blogs */
function Main(props) {
  useEffect(() => {
    props.getAllBlogs();
    props.getUserBlogs();
  });

  return (
    <Routes childProps={props.childProps}/>
  );
}

export default connect(
  null,
  { getUserBlogs, getAllBlogs }
)(Main);