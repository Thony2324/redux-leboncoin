import React from "react";
import { connect } from "react-redux";
import { userPostFetch } from "../../actions";
import { selectCurrentUser } from "../../selectors";
import MainLayout from "../MainLayout";

class Signup extends React.Component {
  state = {
    email: "",
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
    this.props.history.push("/");
  };

  render() {
    //if (Object.keys(this.props.user.currentUser).length === 0) {
    // check if object is empty...
    // TODO : message de confirmation que le user a bien été créé
    return (
      <MainLayout>
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <h1>Créer un compte</h1>
          <div className="uk-margin">
            <label className="uk-form-label">Username</label>
            <div className="uk-form-controls">
              <input
                name="username"
                className="uk-input uk-form-width-large"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Email</label>
            <div className="uk-form-controls">
              <input
                name="email"
                className="uk-input uk-form-width-large"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Password</label>
            <div className="uk-form-controls">
              <input
                type="password"
                name="password"
                className="uk-input uk-form-width-large"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <button type="submit" className="uk-button uk-button-primary">
            Créer
          </button>
        </form>
      </MainLayout>
    );
    // } else {
    //   return (
    //     <div>
    //       {/* TODO : Gestion des erreurs (duplicate key) */}
    //       L'utilisateur {this.props.user.currentUser.account.username} a bien
    //       été créé.
    //     </div>
    //   );
    // }
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: userInfo => userPostFetch(dispatch, userInfo)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
