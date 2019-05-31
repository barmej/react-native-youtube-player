import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inline: {
    flex: 0,
    backgroundColor: "#000"
  },
  fullScreen: {
    position: "absolute",
    marginTop: 0,
    flex: 0,
    zIndex: 99,
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
