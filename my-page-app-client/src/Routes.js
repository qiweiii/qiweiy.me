import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewBlog from "./containers/NewBlog";
import Blogs from "./containers/Blogs";
import BlogEdit from "./containers/BlogEdit";
import BlogView from "./containers/BlogView";
import Resume from "./containers/Resume";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/resume" exact component={Resume} props={childProps} />
		<AuthenticatedRoute path="/blogs/new" exact component={NewBlog} props={childProps} />
		<AppliedRoute path="/blogs" exact component={Blogs} props={childProps} />
		<AuthenticatedRoute path="/blogs/edit/:id" exact component={BlogEdit} props={childProps} />
		<AppliedRoute path="/blogs/view/:id" exact component={BlogView} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
