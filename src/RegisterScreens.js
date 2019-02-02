import { Navigation } from 'react-native-navigation';

import NewsList from './Screens/NewsList';
import NewsDetail from './Screens/NewsDetail';

export function registerScreens(store, Provider) {
    Navigation.registerComponentWithRedux('NewsList', () => NewsList, Provider, store);
    Navigation.registerComponentWithRedux('NewsDetail', () => NewsDetail, Provider, store);
}