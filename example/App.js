/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-yt-player";
import { WebView } from "react-native-webview";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

const TopBar = ({ play, fullScreen }) => (
  <View
    style={{
      alignSelf: "center",
      position: "absolute",
      top: 0
    }}
  >
    <Text style={{ color: "#FFF" }}> Custom Top bar</Text>
  </View>
);

export default class App extends Component<Props> {
  state = {
    fullScreen: false
  };

  onFullScreen = fullScreen => {
    console.log("fullscreen ", fullScreen);

    this.setState({ fullScreen });
  };
  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <YoutubePlayer
          onFullScreen={this.onFullScreen}
          onStart={() => console.log("onStart")}
          loop
          topBar={TopBar}
          videoId="Z1LmpiIGYNs"
          autoPlay
        />

        <View>
          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            aspernatur rerum, deserunt cumque ipsam unde nam voluptatum tenetur
            cupiditate veritatis autem quidem ad repudiandae sapiente odit
            voluptates fugit placeat ut!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
