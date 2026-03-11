import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
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
import { colors } from "../../../utils/Themes";
import { images } from "../../../assets/images";
import { emailRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import ScreenLoader from "../../../components/ScreenLoader";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../../../redux/reducers/authReducer";

interface LoginValues {
  email: string;
  email_error: string;
  password: string;
  password_error: string;
}

const LoginScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isMessage, setIsMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch=useDispatch()

  const [values, setValues] = useState<LoginValues>({
    email: "",
    email_error: "",
    password: "",
    password_error: "",
  });
  console.log("loading", loading);
  const OnLogin = async () => {
    const email = values?.email?.trim();
    const password = values?.password?.trim();

    // Email validation
    if (!email) {
      return setValues((prev) => ({
        ...prev,
        email_error: "Email is required",
      }));
    }

    if (!emailRegex.test(email)) {
      return setValues((prev) => ({
        ...prev,
        email_error: "Invalid Email Format",
      }));
    }

    // Password validation
    if (!password) {
      return setValues((prev) => ({
        ...prev,
        password_error: "Password is required",
      }));
    }

    try {
      setLoading(true);
      const param = {
        raw: JSON.stringify({
          email,
          password,
        }),
      };

      ApiServices.Login(param, ({ isSuccess, response, status }: any) => {
        if (!isSuccess) {
          setMessage("API Error");
          setLoading(false);
          setIsMessage(true);

          return;
        }
        if (!response?.success) {
          setMessage(response?.message?.info);
          setLoading(false);
          setIsMessage(true);

          return;
        }

        if (status === 401) {
          setMessage(response?.message?.info);
          setLoading(false);
          setIsMessage(true);

          return;
        }

        if (status === 200) {
          setMessage("Successfully Login");
          setToastColor(colors.green);
          setIsMessage(true);
          setTimeout(() => {
            navigation.navigate("AppStack");
            setLoading(false);
            dispatch(setAuthToken(response?.message?.token))
          }, 500);
        }

        setIsMessage(true);
      });
    } catch (error) {
      console.log("Login Error:", error);
      setMessage("Something went wrong");
      setIsMessage(true);
    }
  };
  return (
    <>
      <ScreenLayout backgroundColor={colors.background}>
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
              value={values?.email}
              error={values?.email_error}
              placeholder="demo@narcisa.rs"
              onChangeText={(text: string) => {
                const emailError =
                  text && !emailRegex.test(text) ? "Invalid Email Format" : "";

                setValues((prev) => ({
                  ...prev,
                  email: text,
                  email_error: emailError,
                }));
              }}
            />
          </View>
          <View>
            <CustomInput
              leftSource={icons.password}
              placeholder="password"
              value={values?.password}
              error={values?.password_error}
              onChangeText={(text: any) => {
                setValues((prev) => ({
                  ...prev,
                  password: text,
                  password_error: "",
                }));
              }}
              secureTextEntry={showPassword}
              rightSource={showPassword ? icons.eye_off : icons.eye}
              onRightSource={() => setShowPassword(!showPassword)}
            />
          </View>
          <TouchableOpacity style={{ alignItems: "flex-end" }}>
            <CustomText
              text={"Forgot Password?"}
              fontWeight="700"
              color={colors.primary}
              size={23}
              fontFam={fonts.Inter_Bold}
            />
          </TouchableOpacity>

          <CustomButtom onPress={OnLogin} width={"100%"}>
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
                  marginTop: sizeHelper.calHp(8),
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
        </Pressable>
      </ScreenLayout>

      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        backgroundColor={toastColor}
      />

      {loading && <ScreenLoader />}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
