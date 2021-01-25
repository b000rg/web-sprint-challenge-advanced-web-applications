import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { foundLocalToken } from "./actions/actions";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

const App = (props) => {
  const history = useHistory();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token?.length > 0) {
      props.foundLocalToken(token);
      history.push("/bubbles");
    }
  }, []);

  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/bubbles" token={props.token}>
        <BubblePage />
      </PrivateRoute>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { token: state.token };
};

export default connect(mapStateToProps, { foundLocalToken })(App);
