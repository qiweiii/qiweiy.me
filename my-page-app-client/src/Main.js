import React, { useEffect } from 'react';
import { getAllBlogs, getUserBlogs } from './actions';
import { connect } from 'react-redux';
import Routes from './Routes';

/* load blogs asap, so user don't need to wait everything they go to blogs */
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