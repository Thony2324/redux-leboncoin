import {
  SET_ADS_REQUEST,
  SET_ADS_SUCCESS,
  SET_ADS_ERROR,
  SET_AD_DETAIL_REQUEST,
  SET_AD_DETAIL_SUCCESS,
  SET_AD_DETAIL_ERROR
} from "../../constants";

const initialState = {
  isLoading: null,
  error: null,
  data: null,
  dataDetail: null
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
        error: null,
        data: action.payload
      };
    case SET_ADS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: null
      };
    case SET_AD_DETAIL_REQUEST:
      return {
        ...state,
        dataDetail: null
      };
    case SET_AD_DETAIL_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload
      };
    case SET_AD_DETAIL_ERROR:
      return state;
    //   return {
    //     ...state,
    //     data: null
    //   };
    default:
      return state;
  }
};
