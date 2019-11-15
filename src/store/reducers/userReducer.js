import { LOGIN_USER, LOGOUT_USER } from "../../constants";

const initialState = {
  currentUser: {}
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: {}
      };
    default:
      return state;
  }
};
