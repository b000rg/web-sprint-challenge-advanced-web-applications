import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { login } from "../actions/actions";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (props.token && !props.loggingIn) history.push("/bubbles");
  }, [props.loggingIn]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.persist();
    props.login({
      username: loginDetails.username,
      password: loginDetails.password,
    });
  };

  const handleChange = (evt) => {
    setLoginDetails({ ...loginDetails, [evt.target.name]: evt.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
        <Card.Header>
          <Card.Title>Login</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form.Group controlId="login-username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={loginDetails.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={loginDetails.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return { token: state.token, loggingIn: state.loggingIn };
};

export default connect(mapStateToProps, { login })(Login);
