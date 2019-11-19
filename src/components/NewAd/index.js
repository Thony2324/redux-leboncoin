import React from "react";
import MainLayout from "../MainLayout";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../selectors";

class NewAd extends React.Component {
  render() {
    return (
      <MainLayout>
        <React.Fragment>
          <h1>Déposer une annonce</h1>
          {this.props.user.username}
        </React.Fragment>
      </MainLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: selectCurrentUser(state)
  };
};

export default connect(mapStateToProps, null)(NewAd);
