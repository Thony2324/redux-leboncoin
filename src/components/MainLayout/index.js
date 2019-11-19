import React from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";

const MainLayout = ({ children, history }) => {
  return (
    <div className="main-layout">
      <Header history={history} />
      <div className="uk-section uk-section-muted uk-section-small">
        <div className="uk-container">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default MainLayout;
