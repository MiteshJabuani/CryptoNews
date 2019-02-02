import { 
	NEWS_FETCH,
	NEWS_FETCH_SUCCESS,
	NEWS_FETCH_FAIL
} from '../Actions/types';

const INITIAL_STATE = {
    loading: false,
    data: [],
    offset: 0,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case NEWS_FETCH:
			return { ...state, loading: true, error: '' };
        case NEWS_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE, loading: false, error: '', data: action.payload };
		case NEWS_FETCH_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
		return state;
	}
};