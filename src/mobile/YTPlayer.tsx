import React, { Component } from "react";
import createInvoke from "react-native-webview-invoke/native";
import { WebView } from "react-native-webview";
import { YTPlayerState, YTPlayerProps, YTPlayerDefaultProps } from "./types";

export default class YTPlayer extends Component<YTPlayerProps> {
  static defaultProps = { ...YTPlayerDefaultProps };
  webview: any;
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
  setDuration = (duration: number) => {
    this.props.onDurationReady(duration);
    // this.setState({ duration });
  };
  setCurrentTime = (currentTime: number) => {
    //this.props.onPlaying(currentTime);
  };

  componentDidMount = async () => {
    this.invokeFunctions();
    this.initPlayer();
  };

  playVideo = async () => {
    await this._playVideo();
  };
  seekTo = async (s: number) => {
    await this._seekTo(s);
  };

  pauseVideo = async () => {
    await this._pauseVideo();
  };

  // listners
  onReady = () => {
    console.log("ready player ready ");
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

  render() {
    return (
      <WebView
        ref={(webview: WebView) => (this.webview = webview)}
        onMessage={this.invoke.listener}
        useWebKit
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        source={{ uri: "http://localhost:1234" }}
      />
    );
  }
}
