import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
//import { createBrowserHistory } from "history";
import { connect } from "react-redux";
import { selectCurrentUser } from "../selectors";
// import Header from "./Header";
// import Footer from "./Footer";
import Home from "./Home";
import NewAd from "./NewAd";
import Login from "./Login";
import Signup from "./Signup";
import AdDetail from "./AdDetail";
import NoMatch from "./NoMatch";

class App extends React.Component {
  render() {
    // console.log("currentUser", this.props.user.currentUser);
    // console.log("token", localStorage.token);
    // console.log("user", localStorage.user);

    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              console.log("props : ", props);
              return <Home />;
            }}
          />
          <Route
            path="/newad"
            render={() => {
              if (
                localStorage.user !== undefined &&
                localStorage.token !== undefined
              ) {
                return <NewAd />;
              } else {
                return <Redirect to={{ pathname: "/login" }} />;
              }
            }}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/ad/:id" component={AdDetail} />
          <Route component={NoMatch} />
        </Switch>
      </Router>

      // <div className="App">
      //   <Router>
      //     <Header user={localStorage.user} />
      //     <div className="uk-section uk-section-muted uk-section-small">
      //       <div className="uk-container">
      //         {localStorage.user !== undefined ? (
      //           <div>
      //             <div className="uk-heading-small uk-heading-bullet uk-margin-medium-bottom lbc-textcolor">
      //               Bienvenue {localStorage.user}
      //             </div>
      //           </div>
      //         ) : (
      //           ""
      //         )}
      //         <Switch>
      //           <Route
      //             exact
      //             path="/"
      //             render={props => {
      //               console.log("props : ", props);
      //               return <Home />;
      //             }}
      //           />
      //           <Route
      //             path="/newad"
      //             render={() => {
      //               if (
      //                 localStorage.user !== undefined &&
      //                 localStorage.token !== undefined
      //               ) {
      //                 return <NewAd />;
      //               } else {
      //                 return <Redirect to={{ pathname: "/login" }} />;
      //               }
      //             }}
      //           />
      //           <Route path="/login" component={Login} />
      //           <Route path="/signup" component={Signup} />
      //           <Route path="/ad/:id" component={AdDetail} />
      //           <Route component={NoMatch} />
      //         </Switch>
      //       </div>
      //     </div>
      //     <Footer />
      //   </Router>
      // </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps, null)(App);
