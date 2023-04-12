import React, { Component } from "react";
import auth from "../services/authService";
class LogOut extends Component {
  state = {};
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default LogOut;
