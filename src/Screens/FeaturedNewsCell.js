import React, { PureComponent } from 'react';
import { Text, TouchableHighlight, View, ImageBackground, Dimensions, Platform } from 'react-native';
import {Navigation} from "react-native-navigation";

const { width } = Dimensions.get('window');

class FeaturedNewsCell extends PureComponent {
  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
  }

  onRowPress() {
      Navigation.showModal({
          stack: {
              children: [{
                  component: {
                      name: 'NewsDetail',
                      passProps: {
                        newsDetail: this.props.FeaturedNews,
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
  }

  render() {

    const {
      title,
      urlToImage} = this.props.FeaturedNews;

      return (
        <TouchableHighlight onPress={() => this.onRowPress()} underlayColor='rgba(255, 255, 255, 0.0)'>
            <View style={{flex:1,marginLeft:14,marginRight:14,marginBottom:0,marginTop:0}}>
              <ImageBackground
              style={{width:width-28,height:130}}
              source={{uri:urlToImage}}
              resizeMode={'cover'}>
              <View style={{flex:1,justifyContent: 'flex-end'}}>
                <View style={{width:width-28,backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
                  <Text style={{color:'white',marginTop:8,marginBottom:8,marginLeft:8,marginRight:8}}>{title}</Text>
                </View>
              </View>
              </ImageBackground>
            </View>
        </TouchableHighlight>
      );
  }
}

const styles = {
  changeImageStyle: {
    width: 14, 
    height: 14,
    marginRight:3
  }
};

export default FeaturedNewsCell;
