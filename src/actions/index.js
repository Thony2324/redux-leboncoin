import {
  SET_ADS_REQUEST,
  SET_ADS_SUCCESS,
  SET_ADS_ERROR,
  SET_AD_DETAIL_REQUEST,
  SET_AD_DETAIL_SUCCESS,
  SET_AD_DETAIL_ERROR,
  LOGIN_USER,
  LOGOUT_USER
} from "../constants";

export const fetchAds = async (
  dispatch,
  searchTitle = "",
  searchPriceMin = "",
  searchPriceMax = "",
  searchTri = "date-desc"
) => {
  dispatch({ type: SET_ADS_REQUEST });
  // FETCH API
  await fetch(
    `https://leboncoin-api.herokuapp.com/api/offer/with-count?sort=${searchTri}&title=${searchTitle}&priceMin=${searchPriceMin}&priceMax=${searchPriceMax}`
  )
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

export const userPostFetch = async (dispatch, user) => {
  // FETCH POST API
  await fetch("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      console.log("data : ", data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const userLoginFetch = async (dispatch, user) => {
  // FETCH POST API
  await fetch("https://leboncoin-api.herokuapp.com/api/user/log_in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .then(data => {
      const obj_user = { token: data.token, username: data.account.username };
      localStorage.setItem("user", JSON.stringify(obj_user));
      dispatch({ type: LOGIN_USER, payload: data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const userLogout = async dispatch => {
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT_USER });
};
