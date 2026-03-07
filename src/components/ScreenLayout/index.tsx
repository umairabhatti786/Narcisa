import React from "react";
import {
  StyleSheet,
  ViewStyle,
  View,
  StatusBar,
  StatusBarStyle,
  Platform,
} from "react-native";
import sizeHelper from "../../utils/Helpers";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../Text";
import { fonts } from "../../utils/Themes/fonts";
import { images } from "../../assets/images";
import { colors } from "../../utils/Themes";

interface ScreenLayoutProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  barStyle?: StatusBarStyle; // "light-content" | "dark-content" | "default"
  translucent?: boolean;
  paddingTop?: any;
  backgroundSource?: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  style,
  backgroundColor,
  barStyle,
  translucent,
  paddingTop,
  backgroundSource,
}) => {
  const insets = useSafeAreaInsets();
  const bg = backgroundColor || colors.white;

  return (
    <>
      <StatusBar
        barStyle={barStyle || "dark-content"}
        backgroundColor={bg}
        translucent={!!translucent}
      />

      {/* top safe area spacer so iOS shows a colored status bar background */}
      <View style={{ height: insets.top, backgroundColor: bg }} />

      <View
        style={[
          styles.background,
          {
            backgroundColor: bg,
            paddingTop: sizeHelper.calHp(paddingTop || Platform.OS=="ios"? 35:0),
          },
        ]}
      >
        <View style={[styles.container, style]}>{children}</View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
  },
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: colors.background,
    // justifyContent: "center",
    gap: sizeHelper.calHp(35),
    paddingHorizontal: sizeHelper.calWp(35),
  },
});

export default ScreenLayout;
