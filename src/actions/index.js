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
      //console.log("data : ", data);
      //if (data.message) {
      // Here you should have logic to handle invalid creation of a user.
      // This assumes your Rails API will return a JSON object with a key of
      // 'message' if there is an error with creating the user, i.e. invalid username
      //} else {
      // Permet de connecter directement l'utilisateur ajouté
      // localStorage.setItem("token", data.token);
      // dispatch({ type: LOGIN_USER, payload: data });
      //}
    })
    .catch(error => {
      //dispatch({ type: SET_AD_DETAIL_ERROR, payload: error });
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
      //console.log("data : ", data);
      //if (data.message) {
      // Here you should have logic to handle invalid creation of a user.
      // This assumes your Rails API will return a JSON object with a key of
      // 'message' if there is an error with creating the user, i.e. invalid username
      //} else {
      // Permet de connecter directement l'utilisateur ajouté
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.account.username);
      dispatch({ type: LOGIN_USER, payload: data });
      //}
    })
    .catch(error => {
      //dispatch({ type: SET_AD_DETAIL_ERROR, payload: error });
      console.log(error);
    });
};

export const userLogout = async dispatch => {
  // console.log(history);
  // history.push("/");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT_USER });
};
