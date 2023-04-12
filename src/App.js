import "./App.css";
import React, { Component } from "react";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Customers from "./components/customers";
import Rental from "./components/rental";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import LogOut from "./components/logout";
import ProtectedRoutes from "./components/common/protectedRoutes";
class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={user}></NavBar>
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={LogOut}></Route>
            <ProtectedRoutes
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoutes>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rental" component={Rental}></Route>
            <Route path="/notfound" component={NotFound}></Route>
            <Route
              path="/movies"
              render={(props) => <Movies user={user} {...props}></Movies>}
            ></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/notfound"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
