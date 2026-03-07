import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
  BackHandler,
  Image,
} from "react-native";
import sizeHelper from "../../../utils/Helpers";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import CustomButtom from "../../../components/Button";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomInput from "../../../components/Input";
import { icons } from "../../../assets/icons";
import GoogleIcon from "../../../assets/svgs/google.svg";
import AppleIcon from "../../../assets/svgs/apple.svg";
import BackArrow from "../../../assets/svgs/backArrow.svg";
import { CommonActions } from "@react-navigation/native";
import { colors } from "../../../utils/Themes";
import { images } from "../../../assets/images";

const LoginScreen = ({ navigation }: any) => {
  const [showPassowrd, setShowPassowrd] = useState(false);
  console.log("ckdnkdnc", navigation);

  return (
    <>
      <ScreenLayout
      backgroundColor={colors.background}
      >
        <Pressable
          onPress={() => Keyboard.dismiss()}
          style={appStyles.inner_container}
        >
          <Image
            style={{
              width: "60%",
              resizeMode: "contain",
              height: sizeHelper.calWp(140),
              marginTop: "30%",
              marginBottom: sizeHelper.calHp(-20),
            }}
            source={images.logo}
          />
          <CustomText
            text={`Managing your salon has never been easier.`}
            size={24}
            style={{ textAlign: "center", marginBottom: sizeHelper.calHp(20) }}
            fontFam={fonts.Inter_Medium}
            color={colors.text_grey}
            fontWeight={"600"}
          />

          <CustomInput leftSource={icons.email} placeholder="demo@narcisa.rs" />
          <CustomInput
            leftSource={icons.password}
            placeholder="password"
            secureTextEntry={showPassowrd}
            rightSource={showPassowrd ? icons.eye_off : icons.eye}
            onRightSource={() => setShowPassowrd(!showPassowrd)}
          />

          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            // onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <CustomText
              text={"Forgot Password?"}
              fontWeight="700"
              color={colors.primary}
              size={23}
              fontFam={fonts.Inter_Bold}
            />
          </TouchableOpacity>

          <CustomButtom
            //   textColor={theme.colors.white}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "AppStack" }], // or AuthStack
                  })
                );
              }}
            width={"100%"}
          >
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
              <CustomText
                text={"Sign In"}
                color={colors.white}
                size={27}
                fontWeight={"700"}
                fontFam={fonts.Inter_Bold}
              />

              <Image
                source={icons.next}
                style={{
                  width: sizeHelper.calWp(25),
                  height: sizeHelper.calWp(25),
                  marginTop:sizeHelper.calHp(8)
                }}
                resizeMode={"contain"}
              />
            </View>
          </CustomButtom>

          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(5),
              alignSelf: "center",
            }}
          >
            <CustomText
              text={"Don’t have an account?"}
              color={colors.text_grey}
              fontWeight="600"
              size={23}
              fontFam={fonts.Inter_Medium}
            />

            <CustomText
              text={"Register"}
              color={colors.primary}
              fontWeight="700"
              size={27}
              fontFam={fonts.Inter_Bold}
            />
          </TouchableOpacity>

          {/* <View style={{ gap: sizeHelper.calHp(10) }}>
         

            <CustomText
              text={`Login to your Account.`}
              size={28}
              fontFam={fonts.InterTight_Regular}
              color={theme.colors.secondry}
              fontWeight={"400"}
            />
          </View>
          <View
            style={{
              gap: sizeHelper.calHp(32),
            }}
          >
            

            <View style={{ gap: sizeHelper.calHp(10) }}>
              <CustomInput
                label="Password"
                borderRadius={999}
                secureTextEntry={showPassowrd}
                onRightSource={() => setShowPassowrd(!showPassowrd)}
                rightSource={!showPassowrd ? icons.eye : icons.eye_off}
                placeholder="Password"
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPasswordScreen")}
              >
                <CustomText
                  text={"Forgot Password?"}
                  fontWeight="600"
                  color={theme.colors.primary}
                  size={20}
                  fontFam={fonts.InterTight_Medium}
                />
              </TouchableOpacity>
            </View>

            <CustomButtom
              textColor={theme.colors.white}
              text="Login"
              borderRadius={999}
              onPress={() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "AppStack" }], // or AuthStack
                  })
                );
              }}
              width={"100%"}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
              style={{
                ...appStyles.row,
                gap: sizeHelper.calWp(5),
                alignSelf: "center",
              }}
            >
              <CustomText
                text={"Don’t have an account?"}
                color={theme.colors.secondry}
                fontWeight="400"
                size={23}
                fontFam={fonts.InterTight_Regular}
              />

              <CustomText
                text={"Signup"}
                color={theme.colors.primary}
                fontWeight="600"
                size={25}
                fontFam={fonts.InterTight_SemiBold}
              />
            </TouchableOpacity>
            <View style={{ gap: sizeHelper.calHp(35) }}>
              <View
                style={{
                  ...appStyles.row,
                  gap: sizeHelper.calWp(15),
                  marginTop: sizeHelper.calHp(50),
                }}
              >
                <View style={styles.line} />

                <CustomText
                  text={"or"}
                  fontWeight="400"
                  color={theme.colors.secondry}
                  size={27}
                  fontFam={fonts.InterTight_Regular}
                />
                <View style={styles.line} />
              </View>

              <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
                <TouchableOpacity style={styles.authButton}>
                  <GoogleIcon
                    height={sizeHelper.calWp(55)}
                    width={sizeHelper.calWp(55)}
                  />

                  <CustomText
                    text={"Login with Google"}
                    fontWeight="500"
                    color={theme.colors.secondry}
                    size={20}
                    fontFam={fonts.InterTight_Regular}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.authButton}>
                  <AppleIcon
                    height={sizeHelper.calWp(55)}
                    width={sizeHelper.calWp(55)}
                  />

                  <CustomText
                    text={"Login with Apple"}
                    fontWeight="500"
                    color={theme.colors.secondry}
                    size={20}
                    fontFam={fonts.InterTight_Regular}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
        </Pressable>
      </ScreenLayout>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
