import YouTubePlayer from "youtube-player";
import invoke from "react-native-webview-invoke/browser";

var player;
let duration = 0;
let isPaused = false;
const { innerWidth, innerHeight } = window;
let width = "100%";
let height = "100%";

// if (innerHeight > (innerWidth * 9) / 16) width = (innerHeight * 16) / 9;
// else height = (innerWidth * 9) / 16;

//listeners

const onReady = invoke.bind("onReady");
const onError = invoke.bind("onError");
const onStateChange = invoke.bind("onStateChange");
const onPlaybackRateChange = invoke.bind("onPlaybackRateChange");
const onPlaybackQualityChange = invoke.bind("onPlaybackQualityChange");
const onPlaying = invoke.bind("onPlaying");
const onDurationReady = invoke.bind("onDurationReady");

const _onStateChange = ({ data }) => {
  // in case first time playing ,
  // we need to send Duration
  // and start Interval to sent current Time and
  if (data === 1 && duration === 0) {
    _setDuration();
    _setCurrentTime();
  }
  // we need to stop interval in case player state !== playing and activate it on playing mode
  if (data !== 1) isPaused = true;
  else isPaused = false;

  onStateChange(data);
};

const createPlayer = opts => {
  const options = {
    width,
    height,
    ...opts,
    playerVars: {
      enablejsapi: 1,
      autoplay: 0,
      rel: 0,
      controls: 0,
      playsinline: 1,
      modestbranding: 1,
      showinfo: 0,
      ...opts.playerVars
    }
  };

  player = YouTubePlayer("player", options);
  player.on("ready", onReady);
  player.on("error", onError);
  player.on("stateChange", _onStateChange);
  player.on("playbackRateChange", onPlaybackRateChange);
  player.on("playbackQualityChange", onPlaybackQualityChange);
  if (opts.playerVars && opts.playerVars.autoplay) playVideo();
};

//createPlayer({ videoId: "Z1LmpiIGYNs" });

// actions
const playVideo = () => {
  player.playVideo().then(() => {});
};
const pauseVideo = () => {
  player.pauseVideo().then(() => {});
};
const seekTo = s => {
  player.seekTo(s).then(() => {});
};

const _setDuration = () =>
  player.getDuration().then(s => {
    duration = s;
    onDurationReady(s);
  });

// send current time every 1000 ms
const _setCurrentTime = () => {
  setInterval(() => {
    if (!isPaused) player.getCurrentTime().then(s => onPlaying(s));
  }, 500);
};

// invoke functions

invoke.define("createPlayer", createPlayer);
invoke.define("playVideo", playVideo);
invoke.define("pauseVideo", pauseVideo);
invoke.define("seekTo", seekTo);
