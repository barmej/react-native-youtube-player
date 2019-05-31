import Animated, { Easing } from "react-native-reanimated";
const { interpolate, Extrapolate } = Animated;
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
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

export const fullScreenInterpolate = width => {
  const inputRange = [VideoSize.inline.width, VideoSize.fullScreen.width];

  const rotate = interpolate(width, {
    inputRange,
    outputRange: [0, 90],
    extrapolate: Extrapolate.CLAMP
  });
  const height = interpolate(width, {
    inputRange,
    outputRange: [VideoSize.inline.height, VideoSize.fullScreen.height],
    extrapolate: Extrapolate.CLAMP
  });

  const translate = interpolate(width, {
    inputRange,
    outputRange: [0, innerWidth / 2 + 32],
    extrapolate: Extrapolate.CLAMP
  });

  return { rotate, height, translate };
};
