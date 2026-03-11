import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, StatusBar, Platform } from "react-native";
import sizeHelper from "../../../utils/Helpers";
import { images } from "../../../assets/images";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { colors } from "../../../utils/Themes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { CommonActions } from "@react-navigation/native";

const SplashScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const token = useSelector(getToken);
  console.log("token", token);

  // useEffect(() => {
  //   setTimeout(() => {

  //     navigation.navigate("LoginScreen");
  //   }, 3000);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: token ? "AppStack" : "LoginScreen" }],
        }),
      );
    }, 3000);
  }, []);

  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#ffff"} />

      <View style={{ flex: 1 }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image style={styles.splash_background} source={images.shadow_logo} />
        </View>

        <View
          style={{
            paddingBottom: sizeHelper.calHp(70),
            bottom:
              Platform.OS == "ios"
                ? 0
                : insets.bottom <= 16
                ? insets.bottom - insets.bottom
                : insets.bottom,
            alignItems: "center",
          }}
        >
          <CustomText
            text={`POWERED BY NARCISA`}
            size={22}
            style={{ textAlign: "center" }}
            fontFam={fonts.InterTight_Bold}
            color={colors.text_grey}
            fontWeight={"700"}
          />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splash_background: {
    width: "100%",
    height: sizeHelper.calWp(400),
  },
  inner_logo: {
    width: "100%",
    height: sizeHelper.calHp(150),
    position: "absolute",
    alignSelf: "center",
    top: "45%",
  },
});
