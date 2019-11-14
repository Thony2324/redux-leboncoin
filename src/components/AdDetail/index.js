import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDetailAd } from "../../actions";
import { selectAdDetail } from "../../selectors";
import Loader from "../Loader";
import { formatPrice } from "../../utils";

// const mapStateToProps = (state, ownProps) => {
//   console.log("id = ", ownProps.match.params.id);
//   return {
//     //currentAd: selectAdById(state, ownProps.match.params.id)
//   };
// };

const mapStateToProps = state => {
  return {
    detail: selectAdDetail(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDetailAd: id => fetchDetailAd(dispatch, id) // renvoie une fonction
  };
};

class AdDetail extends React.Component {
  componentDidMount() {
    this.props.getDetailAd(this.props.match.params.id);
  }

  render() {
    // If data null or loading
    if (this.props.detail.dataDetail === null) {
      return <Loader />;
    }

    const { title, price, description, creator } = this.props.detail.dataDetail;

    // return data by default
    return (
      <div>
        <Link to="/">Retour aux annonces</Link>
        <div className="ad-detail-wrapper uk-margin-top">
          <div className="ad-detail-left">
            <div className="uk-card uk-card-default">
              <div className="uk-card-media-top">
                <img src="https://via.placeholder.com/500x250" alt={title} />
              </div>
              <div className="uk-card-body">
                <h3 className="uk-card-title">{title}</h3>
                {price !== null ? (
                  <p className="lbc-textcolor">{formatPrice(price)}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h4>Description</h4>
            <p>{description}</p>
          </div>
          <div className="ad-detail-right">
            <div className="uk-tile uk-tile-primary uk-padding-small">
              <p className="uk-h4">Vendeur : {creator.account.username}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdDetail);
