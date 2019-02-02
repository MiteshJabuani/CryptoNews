import {combineReducers} from 'redux';
import FeaturedNewsReducers from './FeaturedNewsReducers';
import NewsListReducers from './NewsListReducers';

export default combineReducers({
    featuredNewsFinalList: FeaturedNewsReducers,
    finalNewsList: NewsListReducers,
});
