import React from "react";
//import Api from "../../utils/Api";
import { connect } from "react-redux";
import { fetchAds } from "../../actions";
import { selectAds } from "../../selectors";
import Loader from "../Loader";
import AdItem from "../AdItem";

const mapStateToProps = state => {
  return {
    ads: selectAds(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAds: () => fetchAds(dispatch) // renvoie une fonction
  };
};

class Home extends React.Component {
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
      <div className="homepage">
        <h1>{this.props.ads.data.count} annonces</h1>
        {this.props.ads.data.offers.map(offer => {
          return (
            <AdItem
              key={offer._id}
              id={offer._id}
              title={offer.title}
              price={offer.price}
            />
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
