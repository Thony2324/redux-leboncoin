import { LOGIN_USER, LOGOUT_USER } from "../../constants";

const local_storage_user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  username: local_storage_user !== null ? local_storage_user.username : "",
  token: local_storage_user !== null ? local_storage_user.token : ""
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        username: action.payload.account.username,
        token: action.payload.token
      };
    case LOGOUT_USER:
      return {
        ...state,
        username: "",
        token: ""
      };
    default:
      return state;
  }
};
