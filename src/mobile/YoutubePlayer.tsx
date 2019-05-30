import React, { Component } from "react";
import createInvoke from "react-native-webview-invoke/native";
import { WebView } from "react-native-webview";
import Animated from "react-native-reanimated";
const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block
} = Animated;

import { TouchableOpacity, Text, View, Dimensions } from "react-native";
import styles from "./styles";
import PlayerControls from "./Controls";

const { width, height } = Dimensions.get("screen");
const innerHeight = width < height ? height : width;
const innerWidth = width < height ? width : height;
const VideoSize = {
  inline: {
    width: innerWidth,
    height: (innerWidth * 9) / 16
  },
  fullScreen: {
    height: innerWidth,
    width: innerHeight
  }
};
console.log(VideoSize);

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

type Props = {
  videoId: string;
  autoPlay: Boolean;
  onReady: () => void;
  onError: () => void;
  onPlay: () => void;
  onPause: () => void;
  onEnd: () => void;
  onStateChange: () => void;
  onPlaybackRateChange: () => void;
  onPlaybackQualityChange: () => void;
};
type State = {
  ready: Boolean;
  fullScreen: Boolean;
  play: Boolean;
  duration: number;
  currentTime: number;
};

export default class YoutubePlayer extends Component<Props, State> {
  webview: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      ready: false,
      fullScreen: false,
      play: this.props.autoPlay,
      duration: 0,
      currentTime: 0
    };
  }
  //Animation
  _width: Animated.Value<number> = new Value(VideoSize.inline.width);
  _height: Animated.Value<number> = new Value(VideoSize.inline.height);
  _translateX: Animated.Value<number> = new Value(0);
  _translateY: Animated.Value<number> = new Value(0);
  _rotate: Animated.Value<number> = new Value(0);

  invoke = createInvoke(() => this.webview);
  _createPlayer = this.invoke.bind("createPlayer");
  _playVideo = this.invoke.bind("playVideo");
  _seekTo = this.invoke.bind("seekTo");
  _pauseVideo = this.invoke.bind("pauseVideo");
  _getDuration = this.invoke.bind("getDuration");
  _setSize = this.invoke.bind("setSize");

  invokeFunctions = () => {
    // invoke fuctions
    this.invoke
      .define("onReady", this.onReady)
      .define("onError", this.onError)
      .define("onStateChange", this.onStateChange)
      .define("setDuration", this.setDuration)
      .define("setCurrentTime", this.setCurrentTime);
  };
  initPlayer = async () => {
    // create Player
    const { videoId, autoPlay } = this.props;
    const opts = { videoId, playerVars: { autoPlay } };
    await this._createPlayer(opts);
    if (autoPlay) this.playVideo();
  };
  setDuration = duration => {
    this.setState({ duration });
  };
  setCurrentTime = currentTime => {
    this.setState({ currentTime });
  };

  componentDidMount = async () => {
    this.invokeFunctions();
    this.initPlayer();
  };

  playVideo = async () => {
    await this._playVideo();
    this.setState({ play: true });
  };
  seekTo = async (s: number) => {
    this.setState({ currentTime: s });
    await this._seekTo(s);
  };

  pauseVideo = async () => {
    await this._pauseVideo();
    this.setState({ play: false });
  };
  setSize = async (fullScreen: Boolean) => {
    const { width, height } = !fullScreen
      ? VideoSize.fullScreen
      : VideoSize.inline;
    console.log({ width, height });
    await this._setSize(width, height);
  };
  toggleFS = () => {
    const { fullScreen } = this.state;
    this.setState({ fullScreen: !fullScreen });
  };

  // listners
  onReady = () => {
    console.log("ready");
    this.setState({ ready: true });
  };
  onError = () => {
    console.log(e);
  };
  onEnded = () => {
    this.seekTo(0);
    this.pauseVideo();
  };
  onStateChange = state => {
    if (state === PlayerState.ENDED) this.onEnded();
  };
  onPlaybackRateChange = () => {};
  onPlaybackQualityChange = () => {};

  animateToFullScreen = () => {};

  render() {
    const { fullScreen } = this.state;
    const VideoStyle = fullScreen ? styles.fullScreen : styles.inline;
    const { playVideo, pauseVideo, seekTo, toggleFS } = this;

    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={VideoStyle}>
          <WebView
            ref={(webview: WebView) => (this.webview = webview)}
            onMessage={this.invoke.listener}
            useWebKit
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            source={{ uri: "http://192.168.1.2:1234/" }}
          />
          <PlayerControls
            {...{ playVideo, seekTo, pauseVideo, toggleFS, ...this.state }}
          />
        </Animated.View>

        <TouchableOpacity style={styles.button} onPress={this.playVideo}>
          <Text>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.pauseVideo}>
          <Text>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setSize(true)}
        >
          <Text>Fuulscreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
