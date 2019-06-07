export enum YTPlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

export type YTPlayerProps = {
  videoId: string;
  autoPlay: Boolean;
  style: {};
  onReady: () => void;
  onError: () => void;
  onPlay: () => void;
  onPlaying: (s: number) => void;
  onPause: () => void;
  onEnd: () => void;
  onDurationReady: (s: number) => void;
  onStateChange: (s: YTPlayerState) => void;
  onPlaybackRateChange: () => void;
  onPlaybackQualityChange: () => void;
};

export type PlayerState = {
  ready: Boolean;
  layoutReady: Boolean;
  fullScreen: Boolean;
  play: Boolean;
  duration: number;
  currentTime: number;
  layout: {
    top: number;
    left: number;
  };
};

export const YTPlayerDefaultProps = {
  style: {},
  onReady: () => {},
  onError: () => {},
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
  onPlaying: () => {},
  onDurationReady: () => {},
  onStateChange: () => {},
  onPlaybackRateChange: () => {},
  onPlaybackQualityChange: () => {}
};
