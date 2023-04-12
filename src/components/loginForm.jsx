import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}, //objct sy easy error find krna array sy
  };
  schema = {
    username: Joi.string().required().label("USERNAMW"),
    password: Joi.string().required().label("PASSWORD"),
  };

  doSubmit = async () => {
    //callserver
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (e) {
      if (e.response && e.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = e.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/"></Redirect>;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "USERNAME")}
          {this.renderInput("password", "PASSWORD", "password")}
          {this.renderButton("login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
