import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import sizeHelper, { screenWidth } from "../../../utils/Helpers";
import { appStyles } from "../../../utils/GlobalStyles";
import { colors } from "../../../utils/Themes";
import { icons } from "../../../assets/icons";
import { fonts } from "../../../utils/Themes/fonts";
import CustomText from "../../../components/Text";
import CustomInput from "../../../components/Input";
import CustomButtom from "../../../components/Button";
import { emailRegex, phoneRegex } from "../../../utils/Regex";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import ScreenLoader from "../../../components/ScreenLoader";

interface ClientValue {
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
  phone: string;
  phoneError: string;
  email: string;
  emailError: string;
}

const EditClientModal = ({ modalVisible, setModalVisible }: any) => {
  const [value, setValue] = useState<ClientValue>({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    phone: "",
    phoneError: "",
    email: "",
    emailError: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [isMessage, setIsMessage] = useState(false);

  const OnSave = () => {
    const firstName = value.firstName.trim();
    const lastName = value.lastName.trim();
    const phone = value.phone.trim();
    const email = value.email.trim();

    // Reset all errors
    setValue(prev => ({
      ...prev,
      firstNameError: "",
      lastNameError: "",
      phoneError: "",
      emailError: "",
    }));

    // Sequential Validation
    if (!firstName) {
      setValue(prev => ({ ...prev, firstNameError: "First name is required" }));
      return;
    }

    if (!lastName) {
      setValue(prev => ({ ...prev, lastNameError: "Last name is required" }));
      return;
    }

    if (!phone) {
      setValue(prev => ({ ...prev, phoneError: "Phone is required" }));
      return;
    }

    if (!email) {
      setValue(prev => ({ ...prev, emailError: "Email is required" }));
      return;
    } else if (!emailRegex.test(email)) {
      setValue(prev => ({ ...prev, emailError: "Invalid Email Format" }));
      return;
    }
    setLoading(true);
    const param = {
      raw: JSON.stringify({
        name: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      }),
    };

    ApiServices.CreateClient(param, ({ isSuccess, response, status }: any) => {
      setLoading(false);

      if (!isSuccess) {
        setMessage("API Error");
        setToastColor(colors.red);
        setIsMessage(true);
        return;
      }

      if (!response?.success) {
        setMessage(response?.message?.info || "Something went wrong");
        setToastColor(colors.red);
        setIsMessage(true);
        return;
      }

      if (status === 200) {
        setMessage("Client Updated Successfully");
        setToastColor(colors.green);
        setIsMessage(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 500);
      }
    });
  };

  return (
    <Modal
      isVisible={modalVisible}
      deviceWidth={screenWidth}
      onBackButtonPress={() => setModalVisible?.(false)}
      onBackdropPress={() => setModalVisible?.(false)}
      backdropColor="rgba(0,0,0,0.5)"
      style={{ flex: 1 }}
    >
      <View style={styles.Container}>
        <View style={appStyles.rowjustify}>
          <View>
            <CustomText
              text={"Edit Client"}
              fontWeight="700"
              fontFam={fonts.Inter_Bold}
              color={colors.black}
              size={35}
            />
            <CustomText
              text={"Update client details"}
              fontWeight="600"
              fontFam={fonts.Inter_Medium}
              color={colors.text_grey}
              size={23}
            />
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={appStyles.circle}>
            <Image
              style={{ width: sizeHelper.calWp(25), height: sizeHelper.calWp(25) }}
              source={icons.cross}
            />
          </TouchableOpacity>
        </View>

        <CustomInput
          leftSource={icons.client}
          placeholder="First Name"
          label="First Name"
          value={value.firstName}
          error={value.firstNameError}
          onChangeText={(text: any) => setValue(prev => ({ ...prev, firstName: text, firstNameError: "" }))}
          backgroundColor={colors.background}
        />

        <CustomInput
          leftSource={icons.client}
          placeholder="Last Name"
          label="Last Name"
          value={value.lastName}
          error={value.lastNameError}
          onChangeText={(text: any) => setValue(prev => ({ ...prev, lastName: text, lastNameError: "" }))}
          backgroundColor={colors.background}
        />

        <CustomInput
          leftSource={icons.call}
          placeholder="Phone"
          label="Phone"
          value={value.phone}
          error={value.phoneError}
          keyboard="phone-pad"
          onChangeText={(text: any) => {
            setValue(prev => ({
              ...prev,
              phone: text.replace(/[^0-9]/g, ""),
              phoneError: "", 
            }));
          }}
          backgroundColor={colors.background}
        />

        <CustomInput
          leftSource={icons.email}
          placeholder="Email"
          label="Email"
          value={value.email}
          error={value.emailError}
          onChangeText={(text: any) => setValue(prev => ({
            ...prev,
            email: text,
            emailError: text && !emailRegex.test(text) ? "Invalid Email Format" : "",
          }))}
          backgroundColor={colors.background}
        />

        <CustomButtom onPress={OnSave} width="100%">
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
            <Image
              source={icons.changes}
              style={{ width: sizeHelper.calWp(35), height: sizeHelper.calWp(35) }}
              resizeMode="contain"
            />
            <CustomText
              text={"SAVE CHANGES"}
              color={colors.white}
              size={27}
              fontWeight="700"
              fontFam={fonts.Inter_Bold}
            />
          </View>
        </CustomButtom>
      </View>

      {/* Toast & Loader */}
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        backgroundColor={toastColor}
      />
      {loading && <ScreenLoader />}
    </Modal>
  );
};

export default EditClientModal;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: sizeHelper.calWp(40),
    paddingHorizontal: sizeHelper.calWp(35),
    paddingVertical: sizeHelper.calHp(35),
    gap: sizeHelper.calHp(30),
  },
});