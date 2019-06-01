import React, { Component } from "react";
import { View } from "react-native";
import createInvoke from "react-native-webview-invoke/native";
import { WebView } from "react-native-webview";
import { YTPlayerState, YTPlayerProps, YTPlayerDefaultProps } from "./types";
const html = require("../web/dist/index.html");

export default class YTPlayer extends Component<YTPlayerProps> {
  static defaultProps = YTPlayerDefaultProps;
  webview: any;
  invoke = createInvoke(() => this.webview);
  _createPlayer = this.invoke.bind("createPlayer");
  _playVideo = this.invoke.bind("playVideo");
  _pauseVideo = this.invoke.bind("pauseVideo");
  _seekTo = this.invoke.bind("seekTo");

  invokeFunctions = () => {
    // invoke fuctions
    this.invoke.define("onReady", this.props.onReady);
    this.invoke.define("onError", this.props.onError);
    this.invoke.define("onStateChange", this.props.onStateChange);
    this.invoke.define("onPlaying", this.props.onPlaying);
    this.invoke.define("onDurationReady", this.props.onDurationReady);
  };

  componentDidMount = async () => {
    this.invokeFunctions();
    this.initPlayer();
  };

  initPlayer = async () => {
    // create Player
    const { videoId, autoPlay } = this.props;
    const opts = { videoId, playerVars: { autoPlay } };
    await this._createPlayer(opts);
    if (autoPlay) await this._playVideo();
  };

  onStateChange = (state: YTPlayerState) => {
    if (state === YTPlayerState.ENDED) this.props.onEnd();
    this.props.onStateChange(state);
  };

  render() {
    return (
      <WebView
        ref={(webview: WebView) => (this.webview = webview)}
        onMessage={this.invoke.listener}
        useWebKit
        allowsInlineMediaPlayback={true}
        renderLoading={() => (
          <View style={{ backgroundColor: "#000", height: 100, width: 100 }} />
        )}
        mediaPlaybackRequiresUserAction={false}
        source={html}
      />
    );
  }
}
