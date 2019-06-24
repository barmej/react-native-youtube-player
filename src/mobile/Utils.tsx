import Animated from "react-native-reanimated";
const { interpolate, Extrapolate } = Animated;
import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const innerHeight = width < height ? height : width;
const innerWidth = width < height ? width : height;

const IsAndroid = Platform.OS === "android";

export const VideoSize = {
  inline: {
    width: innerWidth,
    height: (innerWidth * 9) / 16
  },
  fullScreen: {
    height: innerWidth,
    width: innerHeight
  }
};

export const fullScreenInterpolate = (
  width: Animated.Value<number>,
  layout: { top: number; left: number }
) => {
  const inputRange = [VideoSize.inline.width, VideoSize.fullScreen.width];

  const topRange = [IsAndroid ? layout.top : 0, IsAndroid ? 0 : -layout.top];
  const leftRange = [IsAndroid ? layout.left : 0, IsAndroid ? 0 : -layout.left];

  const top = interpolate(width, {
    inputRange,
    outputRange: topRange,
    extrapolate: Extrapolate.CLAMP
  });
  const left = interpolate(width, {
    inputRange,
    outputRange: leftRange,
    extrapolate: Extrapolate.CLAMP
  });

  const height = interpolate(width, {
    inputRange,
    outputRange: [VideoSize.inline.height, VideoSize.fullScreen.height + 2],
    extrapolate: Extrapolate.CLAMP
  });

  return { top, height, left };
};

export const sec2time = (time: number) => {
  var pad = function(num: number, size: number) {
      return ("000" + num).slice(size * -1);
    },
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

  return `${hours > 0 ? pad(hours, 2) + ":" : ""} ${pad(minutes, 2)} :${pad(
    seconds,
    2
  )}`;
};
