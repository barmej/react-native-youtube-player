import React, { Component } from "react";
import Animated, { Easing } from "react-native-reanimated";
const { Value, timing } = Animated;

import {
  View,
  StatusBar,
  Platform,
  Dimensions,
  BackHandler
} from "react-native";
import styles from "./styles";
import PlayerControls from "./Controls";
import PlayerView from "./YTWebView";
import {
  YTWebViewState,
  PlayerState,
  PlayerProps,
  PlayerDefaultProps
} from "./types";
import { fullScreenInterpolate, VideoSize } from "./Utils";
import Orientation from "react-native-orientation";

const IsAndroid = Platform.OS === "android";

export default class Player extends Component<PlayerProps, PlayerState> {
  static defaultProps = PlayerDefaultProps;

  constructor(props: PlayerProps) {
    super(props);
    this.state = {
      ready: false,
      layoutReady: !IsAndroid,
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

  _width = new Value(VideoSize.inline.width);

  componentDidMount() {
    Dimensions.addEventListener("change", this.onRotated);
    BackHandler.addEventListener("hardwareBackPress", this.onBackButtonClick);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.onRotated);
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onBackButtonClick
    );
  }

  // listeners
  onDurationReady = (duration: number) => {
    this.setState({ duration });
    this.props.onDurationReady(duration);
    this.props.onStart();
  };

  onPlaying = (currentTime: number) => {
    this.setState({ currentTime });
    this.props.onPlaying(currentTime);
  };
  onReady = () => {
    this.setState({ ready: true });
    this.props.onReady();
  };
  onError = () => {
    this.props.onError();
  };
  onEnd = () => {
    const { onEnd, loop } = this.props;
    onEnd();
    if (loop) {
      this.seekTo(0);
      this.playVideo();
    }
  };

  onStateChange = (state: YTWebViewState) => {
    this.props.onStateChange(state);
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

  // toggleFS = () => {
  //   const { fullScreen } = this.state;
  //   const { onFullScreen } = this.props;
  //   this.setState({ fullScreen: !fullScreen });
  //   if (fullScreen) this.goToInlineScreen();
  //   else this.goToFullScreen();
  //   onFullScreen(!fullScreen);
  // };

  toggleFS = () => {
    const rotateToFullScreen = true;
    this.setState({ fullScreen: !this.state.fullScreen }, () => {
      if (this.state.fullScreen) {
        this.props.onFullScreen(this.state.fullScreen);
        if (rotateToFullScreen) Orientation.lockToLandscapeRight();
        this.goToFullScreen();
      } else {
        this.props.onFullScreen(this.state.fullScreen);
        if (rotateToFullScreen) Orientation.lockToPortrait();
        this.goToInlineScreen();
        setTimeout(() => {
          if (true) Orientation.unlockAllOrientations();
        }, 1500);
      }
    });
  };

  onRotated = ({ window: { width, height } }) => {
    // Add this condition incase if inline and fullscreen options are turned on
    //if (this.props.inlineOnly) return
    const orientation = width > height ? "LANDSCAPE" : "PORTRAIT";
    const rotateToFullScreen = true;
    if (rotateToFullScreen) {
      if (orientation === "LANDSCAPE") {
        if (this.state.fullScreen) return;
        this.setState({ fullScreen: true }, () => {
          this.goToFullScreen();
          this.props.onFullScreen(this.state.fullScreen);
        });
        return;
      }
      if (orientation === "PORTRAIT") {
        if (!this.state.fullScreen) return;

        this.setState(
          {
            fullScreen: false
          },
          () => {
            this.goToInlineScreen();
            this.props.onFullScreen(this.state.fullScreen);
          }
        );
        return;
      }
    } else {
      this.goToInlineScreen();
    }
    if (this.state.fullScreen) this.goToFullScreen();
  };
  onBackButtonClick = () => {
    if (this.state.fullScreen) {
      this.toggleFS();
      return true;
    }

    return false;
  };

  goToFullScreen = () => {
    this.props.onFullScreen(true);
    timing(this._width, {
      toValue: VideoSize.fullScreen.width + 2,
      duration: 200,
      easing: Easing.inOut(Easing.ease)
    }).start(() => StatusBar.setHidden(true));
  };
  goToInlineScreen = () => {
    this.props.onFullScreen(false);
    timing(this._width, {
      toValue: VideoSize.inline.width,
      duration: 200,
      easing: Easing.inOut(Easing.ease)
    }).start(() => StatusBar.setHidden(false));
  };
  onLayout = ({
    nativeEvent: {
      layout: { x, y }
    }
  }: any) => {
    this.setState({ layoutReady: true, layout: { top: y, left: x } });
  };

  render() {
    const { fullScreen } = this.state;
    const { height, top, left } = fullScreenInterpolate(
      this._width,
      this.state.layout
    );

    const VideoStyle = fullScreen
      ? { ...styles.fullScreen }
      : {
          ...styles.inline
        };

    const AbsoluteStyle = IsAndroid ? { ...this.state.layout } : {};

    const { playVideo, pauseVideo, seekTo, toggleFS } = this;
    const { videoId, autoPlay, topBar, showFullScreenButton } = this.props;
    const style: any = {
      ...VideoStyle,
      ...AbsoluteStyle,
      width: this._width,
      height,
      top,
      left
      // transform: [
      //   { translateY },
      //   { translateX },
      //   { rotateZ: concat(rotate as any, "deg" as any) }
      // ],
    };
    if (IsAndroid)
      return (
        <React.Fragment>
          <View style={styles.wrapper} onLayout={this.onLayout} />
          {this.state.layoutReady && (
            <Animated.View style={style} removeClippedSubviews={true}>
              <PlayerView
                videoId={videoId}
                autoPlay={autoPlay}
                ref={(player: any) => (this.player = player)}
                onDurationReady={this.onDurationReady}
                onReady={this.onReady}
                onError={this.onError}
                onPlaying={this.onPlaying}
                onEnd={this.onEnd}
              />
              <PlayerControls
                {...{
                  playVideo,
                  seekTo,
                  pauseVideo,
                  toggleFS,
                  topBar,
                  showFullScreenButton,
                  ...this.state
                }}
              />
            </Animated.View>
          )}
        </React.Fragment>
      );
    else
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
              onEnd={this.onEnd}
            />
            <PlayerControls
              {...{
                playVideo,
                seekTo,
                pauseVideo,
                toggleFS,
                topBar,
                showFullScreenButton,
                ...this.state
              }}
            />
          </Animated.View>
        </View>
      );
  }
}
