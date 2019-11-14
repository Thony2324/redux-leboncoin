import {
  SET_ADS_REQUEST,
  SET_ADS_SUCCESS,
  SET_ADS_ERROR,
  SET_AD_DETAIL_REQUEST,
  SET_AD_DETAIL_SUCCESS,
  SET_AD_DETAIL_ERROR
} from "../constants";

export const fetchAds = async dispatch => {
  dispatch({ type: SET_ADS_REQUEST });
  // FETCH API
  await fetch("https://leboncoin-api.herokuapp.com/api/offer/with-count")
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        dispatch({ type: SET_ADS_SUCCESS, payload: data });
      }, 200);
    })
    .catch(error => {
      dispatch({ type: SET_ADS_ERROR, payload: error });
    });
};

export const fetchDetailAd = async (dispatch, id) => {
  dispatch({ type: SET_AD_DETAIL_REQUEST });
  // FETCH API
  await fetch(`https://leboncoin-api.herokuapp.com/api/offer/${id}`)
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        dispatch({ type: SET_AD_DETAIL_SUCCESS, payload: data });
      }, 200);
    })
    .catch(error => {
      dispatch({ type: SET_AD_DETAIL_ERROR, payload: error });
    });
};
