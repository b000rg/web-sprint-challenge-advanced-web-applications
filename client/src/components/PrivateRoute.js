import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  return props.token ? (
    <Route path={props.path}>{props.children}</Route>
  ) : (
    <Route path={props.path} component={() => <Redirect to="/" />} />
  );
};

export default PrivateRoute;
