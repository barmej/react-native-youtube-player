/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import YoutubePlayer from 'react-native-yt-player';

const TopBar = () => (
  <View
    style={{
      alignSelf: 'center',
      position: 'absolute',
      top: 0,
    }}>
    <Text style={{color: '#FFF'}}> Custom Top bar</Text>
  </View>
);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{paddingTop: 60}}>
          <YoutubePlayer
            topBar={TopBar}
            videoId="H5R9jZMBNI8"
            // autoPlay
            //onFullScreen={this.onFullScreen}
            onStart={() => console.log('onStart')}
            onEnd={() => console.log('on End')}
          />

          <View>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              aspernatur rerum, deserunt cumque ipsam unde nam voluptatum
              tenetur cupiditate veritatis autem quidem ad repudiandae sapiente
              odit voluptates fugit placeat ut!
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
