import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";

const PlayImage = require("./play.png");
const PauseImage = require("./pause.png");
const FSImage = require("./fullscreen.png");
const ExitFSImage = require("./fullscreen-exit.png");

export const PlayIcon = ({ onPress, size = 40 }) => (
  <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
    <Image style={{ height: size, width: size }} source={PlayImage} />
  </TouchableOpacity>
);
export const PauseIcon = ({ onPress, size = 40 }) => (
  <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
    <Image style={{ height: size, width: size }} source={PauseImage} />
  </TouchableOpacity>
);
export const FSIcon = ({ onPress, size = 40 }) => (
  <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
    <Image style={{ height: size, width: size }} source={FSImage} />
  </TouchableOpacity>
);
export const ExitFSIcon = ({ onPress, size = 40 }) => (
  <TouchableOpacity style={{ padding: 5 }} onPress={onPress}>
    <Image style={{ height: size, width: size }} source={ExitFSImage} />
  </TouchableOpacity>
);
