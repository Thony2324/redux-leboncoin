import React from "react";
import PropTypes from "prop-types";
//import Api from "../../utils/Api";
import { connect } from "react-redux";
import { fetchAds } from "../../actions";
import { selectAds, selectCurrentUser } from "../../selectors";
import MainLayout from "../MainLayout";
import Loader from "../Loader";
import AdItem from "../AdItem";

class Home extends React.Component {
  state = {
    searchTitle: "",
    searchPriceMin: "",
    searchPriceMax: "",
    searchTri: "date-desc"
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.getAds(
      this.state.searchTitle,
      this.state.searchPriceMin,
      this.state.searchPriceMax,
      this.state.searchTri
    );
  };

  componentDidMount() {
    //Api.getAds();
    this.props.getAds();
  }

  render() {
    // If data null or loading
    if (this.props.ads.data === null || this.props.ads.isLoading) {
      return <Loader />;
    }
    // return data by default
    return (
      <MainLayout history={this.props.history}>
        <div className="homepage">
          {this.props.user.token !== "" ? (
            <span className="uk-heading-small lbc-textcolor">Bonjour {this.props.user.username}</span>
          ) : (
            ""
          )}

          <div className="uk-tile uk-tile-default uk-padding-small uk-box-shadow-medium uk-margin">
            <form onSubmit={this.handleSubmit}>
              <div className="uk-grid-small" data-uk-grid>
                <div className="uk-width-expand">
                  <div className="uk-form-controls">
                    <input
                      name="searchTitle"
                      className="uk-input"
                      placeholder="Que recherchez-vous ?"
                      value={this.state.searchTitle}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div data-uk-grid>
                <div className="uk-width-1-3">
                  <div className="uk-margin">
                    <label className="uk-form-label">Prix min</label>
                    <div className="uk-form-controls">
                      <input
                        name="searchPriceMin"
                        className="uk-input xuk-form-width-small"
                        placeholder="Prix min"
                        value={this.state.searchPriceMin}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="uk-width-1-3">
                  <div className="uk-margin">
                    <label className="uk-form-label">Prix max</label>
                    <div className="uk-form-controls">
                      <input
                        name="searchPriceMax"
                        className="uk-input xuk-form-width-small"
                        placeholder="Prix max"
                        value={this.state.searchPriceMax}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="uk-width-1-3">
                  <div className="uk-margin">
                    <label className="uk-form-label">Tri</label>
                    <div className="uk-form-controls">
                      <select
                        name="searchTri"
                        className="uk-select xuk-form-width-medium"
                        value={this.state.searchTri}
                        onChange={this.handleChange}
                      >
                        <option value="price-desc">Prix décroissant</option>
                        <option value="price-asc">Prix croissant</option>
                        <option value="date-desc">Plus récentes</option>
                        <option value="date-asc">Plus anciennes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="uk-margin">
                <button type="submit" className="uk-button uk-button-primary">
                  Rechercher
                </button>
              </div>
            </form>
          </div>

          <h1>{this.props.ads.data.count} annonce(s)</h1>

          {this.props.ads.data.offers.map(offer => {
            return (
              <AdItem
                key={offer._id}
                id={offer._id}
                title={offer.title}
                price={offer.price}
                picture={offer.pictures[0]}
              />
            );
          })}
        </div>
      </MainLayout>
    );
  }
}

Home.propTypes = {
  ads: PropTypes.object.isRequired,
  getAds: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    ads: selectAds(state),
    user: selectCurrentUser(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAds: (searchTitle, searchPriceMin, searchPriceMax, searchTri) =>
      fetchAds(dispatch, searchTitle, searchPriceMin, searchPriceMax, searchTri) // renvoie une fonction
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
