import axios from 'axios';
import {
    FEATURED_NEWS_FETCH,
    FEATURED_NEWS_FETCH_SUCCESS,
    FEATURED_NEWS_FETCH_FAIL
} from './types';

export const featuredNewsFetch = () => {
  var url = `https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=c679268919504986929df51ac0f86597`;
  return (dispatch) => {
    dispatch({ type: FEATURED_NEWS_FETCH });
    axios.get(url)
      .then(response => featuredNewsFetchSuccess(dispatch, response.data.articles))
      .catch(() => featuredNewsFetchFail(dispatch));
  };
};

const featuredNewsFetchFail = (dispatch) => {
  dispatch({ type: FEATURED_NEWS_FETCH_FAIL });
};

const featuredNewsFetchSuccess = (dispatch, resultFeaturedNewsList) => {
  dispatch({
    type: FEATURED_NEWS_FETCH_SUCCESS,
    payload: resultFeaturedNewsList
  });
};
