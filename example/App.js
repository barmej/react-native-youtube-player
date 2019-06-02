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
      //backgroundColor: "red",
      height: 20,
      width: "100%",
      alignSelf: "center",
      position: "absolute",
      top: 0
    }}
  />
);

export default class App extends Component<Props> {
  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <YoutubePlayer topBar={TopBar} videoId="Z1LmpiIGYNs" autoPlay={false} />
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
          laudantium id vitae similique consequuntur recusandae nostrum, ab
          mollitia a velit? Minus voluptatem blanditiis quis repellat fugiat vel
          libero, fugit necessitatibus.
        </Text>
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
