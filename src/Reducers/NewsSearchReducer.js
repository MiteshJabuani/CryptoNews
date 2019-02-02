import {
    NEWS_SEARCH_FETCH,
    NEWS_SEARCH_FETCH_SUCCESS,
    NEWS_SEARCH_FETCH_FAIL
} from '../Actions/types';

const INITIAL_STATE = {
    resultnewssearchlist:null,
    errornewssearchlist: '',
    loadingnewssearchlist: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEWS_SEARCH_FETCH:
            return { ...state, loadingnewssearchlist: true, errornewssearchlist: '' };
        case NEWS_SEARCH_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE, resultnewssearchlist: action.payload };
        case NEWS_SEARCH_FETCH_FAIL:
            return { ...state, errornewssearchlist: 'News List not fetch.', loadingnewssearchlist: false };
        default:
            return state;
    }
};