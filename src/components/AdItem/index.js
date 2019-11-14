import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";
import { Link } from "react-router-dom";

const AdItem = ({ id, title, price }) => {
  return (
    <Link to={`/ad/${id}`}>
      <div
        className="uk-card uk-card-default uk-card-small uk-grid-collapse uk-child-width-expand uk-margin-bottom"
        data-uk-grid
      >
        <div className="uk-card-media-left uk-cover-container uk-width-auto">
          <img
            src="https://via.placeholder.com/200x150"
            alt={title}
            data-uk-cover
          />
          <canvas width="200" height="150"></canvas>
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
    </Link>
  );
};

AdItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number
};

export default AdItem;
