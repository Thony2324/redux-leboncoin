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
    console.log("Token = ", this.props.user.token);
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

          {this.props.user.token !== "" ? (
            <React.Fragment>
              <Route
                path="/login"
                render={props => {
                  return <Login history={props.history} />;
                }}
              >
                {/* Redirige vers la home si le chemin dans l'url est login (pas besoin d'accéder au form login si on est déjà connecté) */}
                <Redirect to="/" />
              </Route>

              <Route
                path="/newad"
                render={props => {
                  return <NewAd history={props.history} />;
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route
                path="/login"
                render={props => {
                  return <Login history={props.history} />;
                }}
              />
              {/* Redirige vers login si le chemin dans l'url ne correspond pas à login ou signup */}
              <Redirect to="/login" />
            </React.Fragment>
          )}
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
