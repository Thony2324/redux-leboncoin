import {
  SET_ADS_REQUEST,
  SET_ADS_SUCCESS,
  SET_ADS_ERROR
} from "../../constants";

const initialState = {
  isLoading: null,
  error: null,
  data: null
};

export const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADS_REQUEST:
      return {
        ...state, // copy all properties of state
        isLoading: true,
        error: null,
        data: null
      };
    case SET_ADS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.payload
      };
    case SET_ADS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: false
      };
    default:
      return state;
  }
};
