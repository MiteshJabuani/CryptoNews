import {featuredNewsFetch, fetchNews} from '../Actions';
import _ from 'lodash';
import React, {Component} from 'react';
import {
    Image,
    ListView,
    Text,
    View,
    Dimensions,
    FlatList,
    TouchableHighlight,
    LayoutAnimation,
    Platform,
    Share
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Spinner} from '../components/common';
import FeaturedNewsCell from './FeaturedNewsCell';
import FastImage from 'react-native-fast-image';
import moment from "moment";
import { Navigation } from 'react-native-navigation';

const {width, height} = Dimensions.get('window');
let dsFeaturedNews = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var totalFeaturedNews = 0;
let currentNews = 1;


class NewsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            featuredNewsViewHeight: 190,
            isFetching: false,
        };

        this.onPageControlValueChange = this.onPageControlValueChange.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }

    componentWillMount() {
        this.props.featuredNewsFetch();
        this.props.fetchNews();

        this.createDataSourceFeaturedNews(this.props);
    }

    componentWillReceiveProps(nextProps) {
        totalFeaturedNews = nextProps.featuredNewsListData.length;
        this.createDataSourceFeaturedNews(nextProps);
    }

    createDataSourceFeaturedNews({featuredNewsListData}) {
        this.featuredNewsDataSource = dsFeaturedNews.cloneWithRows(featuredNewsListData);
    }

    featuredNewsRenderRow(rowData, sectionID, rowID, highlightRow) {
        return <FeaturedNewsCell FeaturedNews={rowData}/>;
    }

    getFeaturedNewsErrorLabel() {
        if (this.props.errorfeaturednewslist != '') {
            return (
                <React.Fragment>
                    <Text style={styles.errorTextStyle}>{this.props.errorfeaturednewslist}</Text>
                </React.Fragment>
            )
        }
    }

    getFeaturedNewsLoader() {
        if (this.props.loadingfeaturednewslist) {
            return <Spinner size="large"/>;
        }
    }

    getFetauredNewsData() {
        const numberTemp = parseInt(currentNews+1);
        return (
            <React.Fragment>
                <View style={{height: this.state.featuredNewsViewHeight, backgroundColor: 'white'}}>
                    <View style={{marginTop: 8, marginLeft: 14, height: 21, justifyContent: 'center'}}>
                        <Text style={{color: '#245DA6', fontWeight: '700', fontSize: 11}}>FEATURED</Text>
                    </View>
                    <View style={{height: 160, marginTop: 0}}>
                        {this.getFeaturedNewsErrorLabel()}
                        {this.getFeaturedNewsLoader()}
                        <ListView
                            ref="ListViewFeaturedNews"
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.featuredNewsDataSource}
                            renderRow={this.featuredNewsRenderRow}
                            pagingEnabled={true}
                            onScroll={this.onScroll}/>
                        <View style={{height: 22, justifyContent: 'center', alignItems:'center'}}>
                            <Text>{currentNews}/{totalFeaturedNews}</Text>
                        </View>
                    </View>
                </View>
            </React.Fragment>
        );
    }

    onPageControlValueChange(currentPage) {
        this.refs.ListViewFeaturedNews.scrollResponderScrollTo({x: width * currentPage, y: 0, animated: true});
    }

    onScroll({nativeEvent}) {
        let currentPage = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (this.state.currentPage !== currentPage) {
            this.setState({currentPage});
            currentNews = currentPage+1;
        }
    }

    renderFooter = () => {
        if (!this.props.loading) return null;
        return (
            <Spinner size="large"/>
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    width: '100%',
                    backgroundColor: '#CED0CE'
                }}/>
        );
    };


    onSelectCell = (index, item) => {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: 'NewsDetail',
                        passProps: {
                            newsDetail: item,
                        },
                        options: {
                            popGesture: false,
                            topBar: {
                                visible: false,
                                drawBehind: true,
                                ...Platform.select({
                                    ios: {
                                        translucent: true,
                                        transparent: true,
                                    },
                                    android: {

                                    },
                                }),
                                background: {
                                    color: 'transparent',
                                }
                            }
                        }
                    }
                }]
            }
        });
    };

    renderDate = (date) => {
        var yourDate = new Date();
        var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        var currDate = moment(yourDate, 'MMM dd, yyyy');
        var yesterdayDate = moment(yesterday, 'MMM dd, yyyy');
        var getDate = moment(date, 'MMM dd, yyyy');
        var strDate = "";
        if (currDate == getDate) {
            strDate = "Today";
        } else if (yesterdayDate == getDate) {
            strDate = "YesterDay";
        } else {
            strDate = date;
        }
        return (
            <React.Fragment>
                <View style={{flex:1}}>
                    <Text>{strDate}</Text>
                </View>
            </React.Fragment>
        );
    }

    onSharePress = (item) => {
        Share.share({
            message: item.title,
            url: item.url,
            title: item.url
        }, {
            dialogTitle: 'Crypto News',
            excludedActivityTypes: [
                'com.apple.UIKit.activity.Message',
                'com.apple.UIKit.activity.Mail'
            ]
        })
    }

    renderListItem = (index, item) => {

        if(item.urlToImage){
            image1 = (<FastImage
                style={{width: 50, height: 50}}
                source={{
                    uri: item.urlToImage,
                    priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />)
        
        }
        return (
            <TouchableHighlight
                style={{flex:1}}
                onPress={this.onSelectCell.bind(this, index, item)}
                underlayColor='rgba(255, 255, 255, 0.0)'>
                <View style={{flex: 1, flexDirection: 'row', marginTop:8, marginBottom: 8}}>
                    <View style={{marginRight: 14}}>
                    { image1 }
                    </View>

                    <View style={{flex: 1, flexDirection:'column'}}>
                        <Text style={{color:'black', fontSize: 17, fontWeight:'700'}}>
                            {item.title}
                        </Text>
                        <Text style={{color:'black', fontSize:17}}>
                            {item.isSelected ? item.description : ""}
                        </Text>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            {this.renderDate(item.publishedAt)}
                            <TouchableHighlight
                                onPress={() => this.onSharePress(item)}
                                style={{width:40, marginLeft: 8, marginRight: 20}}
                                underlayColor='rgba(255, 255, 255, 0.0)'>
                                <Text style={{color:'gray'}}>Share</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={this.onSelectNews.bind(this, index, item)}
                                underlayColor='rgba(255, 255, 255, 0.0)'>
                                <View style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 35,
                                    width: 35,
                                    borderRadius: 35/2
                                }}>
                                    {item.isSelected ? <Image
                                        style={{width: 14, height: 14}}
                                        source={require('../Image/arrow-up.png')}/> : <Image
                                        style={{width: 14, height: 14}}
                                        source={require('../Image/arrow-down.png')}/>}

                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );

    };

    onSelectNews = (index, item) => {
        console.log("Selected index : ", index);
        let tempList = this.props.data;
        tempList[index].isSelected = tempList[index].isSelected ? false : true
        this.forceUpdate();

    };

    onRefresh() {
        this.setState({ isFetching: true }, () => {
            this.props.featuredNewsFetch();
            this.props.fetchNews();
        });
    }

    componentWillUpdate() {
        if(this.state.isFetching == true) {
            this.setState({ isFetching: false });
        }
    }

    renderNewsData = () => {
        if (this.props.loading === 0) {
            return <Spinner size="large"/>;
        }
        return (
            <FlatList
                style={{flex:1, marginLeft:10, marginRight:10}}
                data={this.props.data}
                renderItem={
                    ({index, item}) => this.renderListItem(index, item)
                }
                initialNumToRender={15}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
                ListFooterComponent={this.renderFooter.bind(this)}
                onEndReachedThreshold={0.5}
                onScroll={(event) => {
                    const currentOffset = event.nativeEvent.contentOffset.y;
                    if (this.lastContentOffset < currentOffset) {
                        // moved to top
                        if (currentOffset > 0) {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({featuredNewsViewHeight: 0})
                        }
                    } else if (this.lastContentOffset > currentOffset) {
                        // moved to bottom
                        if (currentOffset <= 0) {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            this.setState({featuredNewsViewHeight: 190})
                        }
                    }
                }}
                onScrollBeginDrag={(event) => {
                    this.lastContentOffset = event.nativeEvent.contentOffset.y;
                }}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={25}
                windowSize={25}
                updateCellsBatchingPeriod={25}
                getItemLayout={(data, index) => (
                    {length: 60, offset: 60 * index, index}
                )}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
            />
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <LinearGradient
                    colors={['#9F5AB8', '#B2355F']}
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={{height: height}}>
                    <View style={{
                        flexDirection: 'row',
                        paddingTop: 30,
                        paddingBottom: 15,
                        paddingLeft: 14,
                        paddingRight: 14,
                        height: 167
                    }}>
                        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-between'}}>
                            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'space-between'}}>
                                <Text style={{color: 'white', fontSize: 17}}>Crypto News</Text>
                                <Text style={{color: 'white', fontWeight: '900', fontSize: 34}}>News</Text>
                            </View>
                            <View style={{flex: 1, paddingRight: 10, justifyContent: 'flex-end'}}>
                                
                            </View>
                        </View>
                    </View>
                    {this.getFetauredNewsData()}
                    <View style={{backgroundColor:'gray', width: width, height:1}}></View>
                    <View style={{flex: 1, backgroundColor: 'white'}}>
                        {this.renderNewsData()}
                    </View>
                </LinearGradient>
            </View>

        );
    }


}

const styles = {
    textColorWhite: {
        color: 'white'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 30
    },
    offlineText: {
        color: '#fff'
    }
};

const mapStateToProps = state => {

    const {resultfeaturednewslist, errorfeaturednewslist, loadingfeaturednewslist} = state.featuredNewsFinalList;
    const featuredNewsListData = _.map(resultfeaturednewslist, (val) => {
        return {...val};
    });

    const {data, error, loading} = state.finalNewsList;

    return {featuredNewsListData, data, error, loading, loadingfeaturednewslist, errorfeaturednewslist};
};

export default connect(mapStateToProps, {featuredNewsFetch, fetchNews})(NewsList);
