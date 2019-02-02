import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Dimensions, Image, ScrollView, Share, Linking } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {Navigation} from "react-native-navigation";

var newsPostlink = "";
var newsGetTitle= "";
const { height } = Dimensions.get('window');

class NewsDetail extends Component {

    backClick = () => {
        Navigation.dismissModal(this.props.componentId);
    }

    onSharePress = () => {
      Share.share({
        message: newsGetTitle,
        url: newsPostlink,
        title: newsPostlink
      }, {
        dialogTitle: 'Crypto News',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.Message',
          'com.apple.UIKit.activity.Mail'
        ]
      })
    }

    renderDate = () => {
      var yourDate = new Date();
      var yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
      var currDate = moment(yourDate, 'MMM dd, yyyy');
      var yesterdayDate = moment(yesterday, 'MMM dd, yyyy');
      var getDate = moment(this.props.newsDetail.publishedAt, 'MMM dd, yyyy');
      var strDate = "";
      if (currDate == getDate) {
        strDate = "Today";
      } else if (yesterdayDate == getDate) {
        strDate = "YesterDay";
      } else {
        strDate = this.props.newsDetail.publishedAt;
      }
      return (
        <React.Fragment>
        <View style={{flex:1,marginLeft:14,marginTop:8,marginBottom:8}}>
          <Text style={{fontSize:12}}>{strDate}</Text>
        </View>
        </React.Fragment>
      );
    }

    LinkingButtonClick = () => {
      Linking.canOpenURL(newsPostlink).then(supported => {
        if (supported) {
          Linking.openURL(newsPostlink);
        } else {
          console.log("Don't know how to open URI: " + newsPostlink);
        }
      });
    };

    render() {

      const {
        url,
        urlToImage,
        title,
        description,
        content
      } = this.props.newsDetail;

      newsPostlink = url;
      newsGetTitle = title;

      return (
        <View style={{flex:1}}>
            <LinearGradient
              colors={['#9F5AB8', '#B2355F']}
              start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}}
              style={{height:height}}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingTop:30,paddingBottom:8,paddingLeft:14,paddingRight:14}}>
                <View style={{flex:1}}>
                  <Text style={{color:'white',fontSize:17}}>News</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end'}}>
                  <TouchableOpacity onPress={this.backClick}>
                    <View style={{justifyContent:'center',alignItems:'center',width:35,height:35,borderRadius:35/2,backgroundColor:'rgba(255, 255, 255, 0.200000002980232)'}}>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                          <Text style={{color:'white',fontWeight:'900',fontSize:12}}>X</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex:1}}>
                <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                  <View style={{flex:1}}>
                    <View style={{marginLeft:14,marginRight:14,marginBottom:8}}>
                      <Text style={{color:'white',fontWeight:'900',fontSize:34}}>{title}</Text>
                    </View>
                    <View style={{height:250,backgroundColor:'white'}}>
                      <Image
                        style={{height:250}}
                        source={{uri:urlToImage}}/>
                    </View>
                    <View style={{flex:1,flexDirection:'row',backgroundColor:'white'}}>
                      {this.renderDate()}
                      <View style={{flex:1,marginRight:14,alignItems:'flex-end',marginTop:8,marginBottom:8}}>
                        <TouchableOpacity onPress={this.onSharePress}>
                          <Text style={{color:'gray',fontWeight:'700',fontSize:15}}>Share</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{backgroundColor:'white',marginBottom:0,paddingRight:14,paddingLeft:14}}>
                      <Text>{description}</Text>
                      <TouchableOpacity onPress={this.LinkingButtonClick}>
                        <View>
                          <Text style={{color:'blue', textDecorationLine: 'underline'}}>Click on Link for More Details...{url}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </LinearGradient>
        </View>
      );
    }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};


export default connect(null, null)(NewsDetail);

