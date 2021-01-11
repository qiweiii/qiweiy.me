import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NewBlog from "../components/NewBlog";
import Blogs from "../components/Blogs";
import BlogEdit from "../components/BlogEdit";
import BlogView from "../components/BlogView";
import More from "../components/More";
import AppliedRoute from "./AppliedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";


export default ({ childProps }) =>
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
  </Switch>;
