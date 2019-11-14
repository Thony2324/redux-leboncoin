import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    return (
      <div className="App">
        <Router>
          <Header />
          <div className="uk-section uk-section-muted uk-section-small">
            <div className="uk-container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/newad" component={NewAd} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route
                  exact
                  path="/ad/:id"
                  render={props => <AdDetail {...props} />}
                />
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

export default App;
