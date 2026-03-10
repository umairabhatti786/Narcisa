import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../utils/Themes";

const ScreenLoader = ({backgroundColor}:any) => {
    /// 'rgba(0,0,0,.1)'
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        zIndex: 1,
        position: "absolute",
        backgroundColor:backgroundColor,
        justifyContent: "center",
        alignItems: "center",
      
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default ScreenLoader;
