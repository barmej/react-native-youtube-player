import React, { Component } from "react";
import Animated, { Easing } from "react-native-reanimated";
const { Value, timing, concat } = Animated;

import { View, StatusBar } from "react-native";
import styles from "./styles";
import PlayerControls from "./Controls";
import PlayerView from "./YTPlayer";
import { YTPlayerState, PlayerState, YTPlayerProps } from "./types";
import { fullScreenInterpolate, VideoSize } from "./Utils";

type Props = YTPlayerProps & {};

export default class Player extends Component<Props, PlayerState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ready: false,
      fullScreen: false,
      play: this.props.autoPlay,
      duration: 0,
      currentTime: 0,
      layout: {
        top: 0,
        left: 0
      }
    };
  }
  player: any;

  _width = new Value(VideoSize.inline.width + 2);

  // listeners
  onDurationReady = (duration: number) => {
    this.setState({ duration });
  };

  onPlaying = (currentTime: number) => {
    this.setState({ currentTime });
  };
  onReady = () => {
    console.log("ready");
    this.setState({ ready: true });
  };
  onError = () => {
    console.log("error");
  };
  onEnded = () => {
    this.seekTo(0);
    this.pauseVideo();
  };
  onStateChange = (state: YTPlayerState) => {
    if (state === YTPlayerState.ENDED) this.onEnded();
  };
  onPlaybackRateChange = () => {};
  onPlaybackQualityChange = () => {};

  playVideo = () => {
    this.setState({ play: true });
    this.player._playVideo();
  };
  seekTo = async (s: number) => {
    this.setState({ currentTime: s });
    this.player._seekTo(s);
  };

  pauseVideo = () => {
    this.setState({ play: false });
    this.player._pauseVideo();
  };

  toggleFS = () => {
    const { fullScreen } = this.state;
    this.setState({ fullScreen: !fullScreen });
    if (fullScreen) this.goToInlineScreen();
    else this.goToFullScreen();
  };

  goToFullScreen = () => {
    timing(this._width, {
      toValue: VideoSize.fullScreen.width,
      duration: 200,
      easing: Easing.inOut(Easing.ease)
    }).start();
    StatusBar.setHidden(true);
  };
  goToInlineScreen = () => {
    timing(this._width, {
      toValue: VideoSize.inline.width,
      duration: 200,
      easing: Easing.inOut(Easing.ease)
    }).start();
    StatusBar.setHidden(false);
  };
  onLayout = ({
    nativeEvent: {
      layout: { x, y }
    }
  }: any) => {
    this.setState({ layout: { top: y, left: x } });
  };

  render() {
    const { fullScreen } = this.state;
    const { height, rotate, translateX, translateY } = fullScreenInterpolate(
      this._width,
      this.state.layout
    );

    const VideoStyle = fullScreen ? { ...styles.fullScreen } : styles.inline;

    const { playVideo, pauseVideo, seekTo, toggleFS } = this;
    const { videoId, autoPlay } = this.props;
    const style: any = {
      ...VideoStyle,
      width: this._width,
      height,
      transform: [
        { rotateZ: concat(rotate, "deg") },
        { translateX },
        { translateY }
      ]
    };

    return (
      <View style={styles.wrapper} onLayout={this.onLayout}>
        <Animated.View style={style}>
          <PlayerView
            videoId={videoId}
            autoPlay={autoPlay}
            ref={(player: any) => (this.player = player)}
            onDurationReady={this.onDurationReady}
            onReady={this.onReady}
            onError={this.onError}
            onPlaying={this.onPlaying}
          />
          <PlayerControls
            {...{ playVideo, seekTo, pauseVideo, toggleFS, ...this.state }}
          />
        </Animated.View>
      </View>
    );
  }
}
