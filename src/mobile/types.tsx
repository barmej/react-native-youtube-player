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
  onPause: () => void;
  onEnd: () => void;
  onDurationReady: (s: number) => void;
  onStateChange: () => void;
  onPlaybackRateChange: () => void;
  onPlaybackQualityChange: () => void;
} & typeof YTPlayerDefaultProps;

export type PlayerState = {
  ready: Boolean;
  fullScreen: Boolean;
  play: Boolean;
  duration: number;
  currentTime: number;
  top: number;
  left: number;
};

export const YTPlayerDefaultProps = {
  style: {},

  onReady: () => {},
  onError: () => {},
  onPlay: () => {},
  onPause: () => {},
  onEnd: () => {},
  onDurationReady: (s: number) => {},
  onStateChange: () => {},
  onPlaybackRateChange: () => {},
  onPlaybackQualityChange: () => {}
};
