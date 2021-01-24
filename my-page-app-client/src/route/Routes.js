import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import Home from "../components/Home";

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
const NotFound = lazy(() => import('../components/NotFound'));
const Login = lazy(() => import('../components/Login'));
const Signup = lazy(() => import('../components/Signup'));
const NewBlog = lazy(() => import('../components/NewBlog'));
const Blogs = lazy(() => import('../components/Blogs'));
const BlogEdit = lazy(() => import('../components/BlogEdit'));
const BlogView = lazy(() => import('../components/BlogView'));
const More = lazy(() => import('../components/More'));


export default ({ childProps }) =>
  <Suspense fallback={<div></div>}>
    <Switch>
      <AppliedRoute path="/" exact component={Home} props={childProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
      {/* removed resume section coz i am going to make customized resume for each company */}
      {/* <AppliedRoute path="/resume" exact component={Resume} props={childProps} /> */}
      <AuthenticatedRoute path="/blogs/new" exact component={NewBlog} props={childProps} />
      <AppliedRoute path="/blogs" exact component={Blogs} props={childProps} />
      <AuthenticatedRoute path="/blogs/edit/:id" exact component={BlogEdit} props={childProps} />
      <AppliedRoute path="/blogs/view/:id" exact component={BlogView} props={childProps} />
      <AppliedRoute path="/more" exact component={More} props={childProps} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  </Suspense>
