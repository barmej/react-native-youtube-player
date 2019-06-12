import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import Slider from "@react-native-community/slider";

type Props = {
  value: number;
  visible: Boolean;
  fullScreen: Boolean;
  duration: number;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (t: number) => void;
};

export default ({
  value,
  visible,
  seekTo,
  duration,
  pauseVideo,
  playVideo,
  fullScreen
}: Props) => (
  <View style={[styles.container, { bottom: fullScreen ? 20 : 0 }]}>
    <Progress progress={value} />
    {visible && (
      <Slider
        style={[styles.progress, { zIndex: 99, elevation: 99 }]}
        minimumValue={0}
        onSlidingStart={pauseVideo}
        onSlidingComplete={p => {
          seekTo(p * duration);
          playVideo();
        }}
        maximumValue={1}
        minimumTrackTintColor="red"
        maximumTrackTintColor="#FFF"
        value={value}
        thumbImage={require("./icons/thumb.png")}
      />
    )}
  </View>
);

const Progress = ({ progress }: { progress: number }) => {
  const ref = useRef(new Animated.Value(0));
  Animated.timing(ref.current, {
    toValue: progress,
    duration: 250,
    easing: Easing.inOut(Easing.ease)
  }).start();

  return (
    <View style={styles.outerBar}>
      <Animated.View
        style={{ flex: ref.current, backgroundColor: "red", height: 2 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    height: 2,
    position: "absolute",
    bottom: 0 // animated to 20 on fullScreen
  },
  progress: {
    width: "100%",
    height: 8,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    transform: [{ translateY: 3 }]
  },
  outerBar: {
    flex: 1,
    height: 2,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "100%"
  }
});
