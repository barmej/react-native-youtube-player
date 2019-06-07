import Animated from "react-native-reanimated";
const { interpolate, Extrapolate } = Animated;
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const innerHeight = width < height ? height : width;
const innerWidth = width < height ? width : height;

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
const dx = (VideoSize.inline.width - VideoSize.fullScreen.width) / 2;
const dy = (VideoSize.fullScreen.width - VideoSize.inline.width) / 2;

export const fullScreenInterpolate = (
  width: Animated.Value<number>,
  layout: { top: number; left: number }
) => {
  const inputRange = [VideoSize.inline.width, VideoSize.fullScreen.width];
  console.log(layout);

  const rotate = interpolate(width, {
    inputRange,
    outputRange: [0, 90],
    extrapolate: Extrapolate.CLAMP
  });
  const height = interpolate(width, {
    inputRange,
    outputRange: [VideoSize.inline.height, VideoSize.fullScreen.height + 2],
    extrapolate: Extrapolate.CLAMP
  });

  const translateX = interpolate(width, {
    inputRange,
    outputRange: [0, -dy - layout.left - 1],
    extrapolate: Extrapolate.CLAMP
  });
  const translateY = interpolate(width, {
    inputRange,
    outputRange: [0, -dx - layout.top - 1],
    extrapolate: Extrapolate.CLAMP
  });

  return { rotate, height, translateX, translateY };
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
