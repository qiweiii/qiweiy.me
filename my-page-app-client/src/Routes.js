import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewBlog from "./containers/NewBlog";
import Blogs from "./containers/Blogs";
import Blog from "./containers/Blog";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
		<AppliedRoute path="/blogs/new" exact component={NewBlog} props={childProps} />
		<AppliedRoute path="/blogs" exact component={Blogs} props={childProps} />
		<AppliedRoute path="/blogs/:id" exact component={Blog} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
