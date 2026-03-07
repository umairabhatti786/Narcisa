module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["react-native-reanimated/plugin", { relativeSourceLocation: true }, "reanimated"],
    ["react-native-worklets/plugin", {}, "worklets"],
  ],
};
