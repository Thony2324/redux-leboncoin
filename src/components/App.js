import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { selectCurrentUser } from "../selectors";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import NewAd from "./NewAd";
import Login from "./Login";
import Signup from "./Signup";
import AdDetail from "./AdDetail";
import NoMatch from "./NoMatch";

class App extends React.Component {
  render() {
    console.log("currentUser", this.props.user.currentUser);
    console.log("token", localStorage.token);
    console.log("user", localStorage.user);

    //const { currentUser } = this.props.user;

    return (
      <div className="App">
        <Router>
          {/* <Header user={currentUser} /> */}
          <Header user={localStorage.user} />
          <div className="uk-section uk-section-muted uk-section-small">
            <div className="uk-container">
              {/* {currentUser.account !== undefined ? ( */}
              {localStorage.user !== undefined ? (
                <div>
                  <div className="uk-heading-small uk-heading-bullet uk-margin-medium-bottom lbc-textcolor">
                    {/* Bienvenue {currentUser.account.username} */}
                    Bienvenue {localStorage.user}
                  </div>
                </div>
              ) : (
                ""
              )}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/newad" component={NewAd} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/ad/:id" component={AdDetail} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps, null)(App);
