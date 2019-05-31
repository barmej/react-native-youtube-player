import React, { Component } from "react";
import Animated, { Easing } from "react-native-reanimated";
const { Value, timing, concat, interpolate, Extrapolate } = Animated;

import { View } from "react-native";
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
      top: 0,
      left: 0
    };
  }
  player: any;
  _width = new Value(VideoSize.inline.width);

  playVideo = () => {
    this.player.playVideo();
    this.setState({ play: true });
  };
  seekTo = async (s: number) => {
    this.setState({ currentTime: s });
    //await this._seekTo(s);
  };

  pauseVideo = () => {
    this.player.pauseVideo();
    this.setState({ play: false });
  };

  toggleFS = () => {
    const { fullScreen } = this.state;
    this.setState({ fullScreen: !fullScreen });
    if (fullScreen) this.goToInlineScreen();
    else this.goToFullScreen();
  };

  // listners
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
  goToFullScreen = () => {
    timing(this._width, {
      toValue: VideoSize.fullScreen.width,
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };
  goToInlineScreen = () => {
    timing(this._width, {
      toValue: VideoSize.inline.width,
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    }).start();
  };
  onLayout = ({
    nativeEvent: {
      layout: { x, y }
    }
  }: any) => {
    this.setState({ top: y, left: x });
  };

  render() {
    const { fullScreen } = this.state;
    const { height, rotate, translate } = fullScreenInterpolate(this._width);
    const inputRange = [VideoSize.inline.width, VideoSize.fullScreen.width];
    const top = interpolate(this._width, {
      inputRange,
      outputRange: [this.state.top, 0],
      extrapolate: Extrapolate.CLAMP
    });
    const left = interpolate(this._width, {
      inputRange,
      outputRange: [this.state.left, 0],
      extrapolate: Extrapolate.CLAMP
    });
    const VideoStyle = fullScreen ? { ...styles.fullScreen } : styles.inline;

    const { playVideo, pauseVideo, seekTo, toggleFS } = this;
    const { videoId, autoPlay } = this.props;

    return (
      <View
        style={{
          height: VideoSize.inline.height,
          width: VideoSize.inline.width,
          zIndex: 99,
          paddingTop: 30,
          backgroundColor: "#000"
        }}
      >
        <Animated.View
          onLayout={this.onLayout}
          style={[
            VideoStyle,
            {
              width: this._width,
              height,
              transform: [
                { rotateZ: concat(rotate, "deg") },
                { translateX: translate },
                { translateY: translate }
              ]
            }
          ]}
        >
          <PlayerView
            videoId={videoId}
            autoPlay={autoPlay}
            ref={(player: any) => (this.player = player)}
          />
          <PlayerControls
            {...{ playVideo, seekTo, pauseVideo, toggleFS, ...this.state }}
          />
        </Animated.View>
      </View>
    );
  }
}
