import axios from 'axios';
import {
    FEATURED_NEWS_FETCH,
    FEATURED_NEWS_FETCH_SUCCESS,
    FEATURED_NEWS_FETCH_FAIL
} from '../Actions/types';
  
  const INITIAL_STATE = {
    resultfeaturednewslist:[],
    errorfeaturednewslist: '',
    loadingfeaturednewslist: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case FEATURED_NEWS_FETCH:
        return { ...state, loadingfeaturednewslist: true, errorfeaturednewslist: '' };
      case FEATURED_NEWS_FETCH_SUCCESS:
        return { ...state, ...INITIAL_STATE, resultfeaturednewslist: action.payload };
      case FEATURED_NEWS_FETCH_FAIL:
        return { ...state, errorfeaturednewslist: 'Top Searched Coin List not fetch.', loadingfeaturednewslist: false };
      default:
        return state;
    }
  };