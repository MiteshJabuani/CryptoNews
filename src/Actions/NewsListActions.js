import axios from 'axios';
import {
    NEWS_FETCH,
    NEWS_FETCH_SUCCESS,
    NEWS_FETCH_FAIL
} from './types';

export const fetchNews = () => {
    return (dispatch) => {
        const url = `https://newsapi.org/v2/everything?sources=crypto-coins-news&apiKey=c679268919504986929df51ac0f86597`;
        dispatch({type: NEWS_FETCH});
        axios.get(url)
            .then(res => fetchNewsSuccess(dispatch, res.data.articles))
            .catch(error => fetchNewsFail(dispatch, error));
    };
};

const fetchNewsFail = (dispatch, error) => {
    dispatch({
        type: NEWS_FETCH_FAIL,
        payload: error
    });
};

const fetchNewsSuccess = (dispatch, news) => {
    dispatch({
        type: NEWS_FETCH_SUCCESS,
        payload: news
    });
};
