import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Plans from "./Plans";
import SignUpPage from "./SignUp";
import Home from "./Home";
import { Navbar1 } from "./Navbar1";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/plans" component={Plans} />
        <Route exact path="/nav" component={Navbar1} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
