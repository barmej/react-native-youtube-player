import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
const innerHeight = width < height ? height : width;
const innerWidth = width < height ? width : height;
const VideoSize = {
  inline: {
    width: innerWidth,
    height: (innerWidth * 9) / 16
  },
  fullScreen: {
    height: innerWidth,
    width: innerHeight
  }
};

const styles = StyleSheet.create({
  inline: {
    marginTop: 50,
    marginBottom: 10,
    flex: 0,
    ...VideoSize.inline,
    backgroundColor: "#000",
    transform: [{ rotateZ: "0deg" }, { translateX: 0 }, { translateY: 0 }]
  },
  fullScreen: {
    ...VideoSize.fullScreen,
    flex: 0,
    zIndex: 99,

    transform: [
      { rotateZ: "90deg" },
      { translateX: innerWidth / 2 + 32 },
      { translateY: innerWidth / 2 + 32 }
    ],
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  button: {
    borderColor: "#000",
    borderWidth: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderRadius: 15
  }
});

export default styles;
