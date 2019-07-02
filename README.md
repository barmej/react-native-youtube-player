# React Native Youtube Player

A cross-platform Youtube Player component for React Native Built using the official [YouTube IFrame Player API](https://developers.google.com/youtube/iframe_api_reference).

## Features

- No need of API key
- FullScreen Animation
- FullScreen on orientation change.
- Full Control
- Add Custom TopBar
- Fully typed with TypeScript

## DEMO

- Checkout the [example/](https://github.com/barmej/react-native-youtube-player/tree/master/example) folder for demo source code.

![Demo](https://raw.githubusercontent.com/barmej/react-native-youtube-player/master/demo.gif)

## Installation

Open a Terminal in the project root and run:

```sh
yarn add react-native-yt-player
```

Link [`react-native-webview`](https://github.com/react-native-community/react-native-webview), [`react-native-slider`](https://github.com/react-native-community/react-native-slider),[`react-native-orientation`](https://github.com/yamill/react-native-orientation) and [`react-native-reanimated`](https://github.com/kmagiera/react-native-reanimated):

```sh
react-native link react-native-webview
react-native link react-native link @react-native-community/slider
react-native link react-native-reanimated
react-native link react-native-orientation
```

**IMPORTANT:** There are additional steps required for `react-native-orientation` on Android after running `react-native link react-native-orientation`. Check the [this guide](https://github.com/yamill/react-native-orientation#configuration) to complete the installation.

## Quick Start

```jsx
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-yt-player";

export default class App extends Component<Props> {
  onFullScreen = fullScreen => {
    console.log("fullscreen ", fullScreen);
  };
  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <YoutubePlayer
          loop
          topBar={TopBar}
          videoId="Z1LmpiIGYNs"
          autoPlay
          onFullScreen={this.onFullScreen}
          onStart={() => console.log("onStart")}
          onEnd={() => alert("on End")}
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
```

## API reference

| Property             |                          Type                           | Description                                                                                           |
| :------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------- |
| videoId(required)    |                         string                          | Youtube video Id                                                                                      |
| autoPlay             |                         Boolean                         | Auto play the video                                                                                   |
| loop                 |                         Boolean                         | Loop the video                                                                                        |
| style                |                         object                          | You can pass this to override some default styles                                                     |
| topBar               | (play: boolean, fullScreen: boolean) => React.ReactNode | Function which takes the play and fullScreen status and return a react element to be used as a topBar |
| showFullScreenButton |                         Boolean                         | Display a button to allow user to see the video on fullScreen                                         |
| onFullScreen         |              (fullScreen: Boolean) => void              | Execute a function on fullScreen changed                                                              |
| onStart              |                       () => void                        | Execute a function on start                                                                           |
| onPause              |                       () => void                        | Execute a function on pause                                                                           |
| onDurationReady      |                   (s: number) => void                   | Execute a function when the duration is ready                                                         |
| onPlaybackRateChange |                        () =>void                        | Execute a function when the playback rate will actually change                                        |
| onEnd                |                       () => void                        | Execute a function on end                                                                             |
| onError              |                       () => void                        | Execute a function on error                                                                           |

Check [types.tsx](https://github.com/barmej/react-native-youtube-player/tree/master/src/mobile/types.tsx) file.

You can use `Ref` to access to Player functions in case you want to have full control :

```jsx
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import YoutubePlayer from "react-native-yt-player";

export default class App extends Component<Props> {
  onFullScreen = fullScreen => {
    console.log("fullscreen ", fullScreen);
  };

  play = () => {
    this.player.playVideo();
  };
  pause = () => {
    this.player.pauseVideo();
  };

  seekTo = s => {
    this.player.seekTo(s);
  };
  render() {
    return (
      <View style={{ paddingTop: 60 }}>
        <YoutubePlayer
          loop
          ref={ref => {
            this.player = ref;
          }}
          topBar={TopBar}
          videoId="Z1LmpiIGYNs"
          autoPlay
          onFullScreen={this.onFullScreen}
          onStart={() => console.log("onStart")}
          onEnd={() => alert("on End")}
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
```

## Licensing

The code in this project is licensed under MIT license.

## Credit

[`react-native-webview-invoke`](https://github.com/pinqy520/react-native-webview-invoke) For Making Communication between react-native and webview simple and clean.

[`react-native-tab-view`](https://github.com/react-native-community/react-native-tab-view) For the great Project structure.
