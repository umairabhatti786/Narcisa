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
import { Snackbar } from 'react-native-paper'
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
import { emailRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";

const LoginScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isMessage, setIsMessage] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const [toastColor, setToastColor] = useState(colors.red)
  console.log("ckdnkdnc", navigation);

  const validateEmail = (value: any) => {
    setEmail(value)
    if (value.trim() === '') {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value.trim())) {
      setEmailError("Invalid email format")
    } else {
      setEmailError("");
    }
  }
  const PasswordLength = (value: any) => {
    setPassword(value);
    if (value.trim() === "") {
      setPasswordError("Password is Required")
    }
    else {
      setPasswordError("")
    }
  }
  const saveData = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
      setPasswordError("");
      return;
    }

    let valid = true;

    if (!emailRegex.test(email.trim())) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!emailRegex.test(email.trim())) {
      setMessage("Invalid credentials");
      setToastColor(colors.red);
      setIsMessage(true);
      return;
    }

    const raw = JSON.stringify({
      email: email,
      password: password
    });

    const param = { raw };

    ApiServices.Login(param, ({ isSuccess, response }: any) => {
      console.log("FULL RESPONSE:", response);

      if (isSuccess && response.success) {
        setMessage("Login Success");
        setIsMessage(true);
        setToastColor(colors.green);

        setTimeout(() => {
          navigation.navigate("AppStack");
        }, 1000);
      } else {
        setMessage(response?.message?.info || "Invalid credentials");
        setIsMessage(true);
        setToastColor(colors.red);
      }
    });
  };
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

          <View>
            <CustomInput
              leftSource={icons.email}
              placeholder="demo@narcisa.rs"
              onChangeText={(text: any) => {
                setEmail(text)
                if (text && !emailRegex.test(text)) {
                  setEmailError("Invalid email format")
                } else (
                  setEmailError("")
                )
              }
              } />
            {
              emailError ? (
                <CustomText
                  text={emailError}
                  size={24}
                  color={colors.red}
                // style={{
                //   marginTop:sizeHelper.calHp(10)
                // }}
                />)
                : null
            }
          </View>
          <View>
            <CustomInput
              leftSource={icons.password}
              placeholder="password"
              onChangeText={(text: any) => {
                setPassword(text)
                setPasswordError("")
              }}
              secureTextEntry={showPassword}
              rightSource={showPassword ? icons.eye_off : icons.eye}
              onRightSource={() => setShowPassword(!showPassword)}
            />
            {
              passwordError ? (
                <CustomText
                  text={passwordError}
                  size={24}
                  color={colors.red}
                // style={{
                //   marginTop:sizeHelper.calHp(10)
                // }}
                />
              ) : null
            }
          </View>
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
            onPress={saveData}
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
                  marginTop: sizeHelper.calHp(8)
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
                secureTextEntry={showPassword}
                onRightSource={() => setShowPassword(!showPassword)}
                rightSource={!showPassword ? icons.eye : icons.eye_off}
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
          <CustomToast
            isVisable={isMessage}
            setIsVisable={setIsMessage}
            message={message}
            backgroundColor={toastColor}
          />
        </Pressable>
      </ScreenLayout >
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
