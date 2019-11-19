import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../selectors";
import Home from "./Home";
import NewAd from "./NewAd";
import Login from "./Login";
import Signup from "./Signup";
import AdDetail from "./AdDetail";
import NoMatch from "./NoMatch";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return <Home history={props.history} />;
            }}
          />
          <Route
            path="/newad"
            render={props => {
              if (this.props.user.token !== "") {
                return <NewAd history={props.history} />;
              } else {
                return <Redirect to={{ pathname: "/login" }} />;
              }
            }}
          />
          <Route
            path="/login"
            render={props => {
              if (this.props.user.token === "") {
                return <Login history={props.history} />;
              } else {
                return <Redirect to={{ pathname: "/" }} />;
              }
            }}
          />
          <Route
            path="/signup"
            render={props => {
              return <Signup history={props.history} />;
            }}
          />
          <Route
            path="/ad/:id"
            render={props => {
              return <AdDetail history={props.history} match={props.match} />;
            }}
          />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps, null)(App);
