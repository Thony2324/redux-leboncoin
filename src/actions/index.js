import { SET_ADS_REQUEST, SET_ADS_SUCCESS, SET_ADS_ERROR } from "../constants";

export const fetchAds = async dispatch => {
  dispatch({ type: SET_ADS_REQUEST });
  // FETCH API
  await fetch("https://leboncoin-api.herokuapp.com/api/offer/with-count")
    .then(response => response.json())
    .then(data => {
      setTimeout(() => {
        dispatch({ type: SET_ADS_SUCCESS, payload: data });
      }, 500);
    })
    .catch(error => {
      dispatch({ type: SET_ADS_ERROR, payload: error });
    });
};
