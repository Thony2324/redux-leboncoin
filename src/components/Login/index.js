import React from "react";
import { connect } from "react-redux";
import { userLoginFetch } from "../../actions";
import { selectCurrentUser } from "../../selectors";
import MainLayout from "../MainLayout";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <MainLayout>
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <h1>Se connecter</h1>
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
            Se connecter
          </button>
        </form>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: userInfo => userLoginFetch(dispatch, userInfo)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
