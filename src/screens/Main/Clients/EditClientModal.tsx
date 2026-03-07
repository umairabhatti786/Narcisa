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

const EditClientModal = ({ modalVisible, setModalVisible }: any) => {
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
          <TouchableOpacity 
          onPress={()=>setModalVisible(false)}
          style={appStyles.circle}>
            <Image
              style={{
                width: sizeHelper.calWp(25),
                height: sizeHelper.calWp(25),
              }}
              source={icons.cross}
            />
          </TouchableOpacity>
        </View>

          <CustomInput
            leftSource={icons.client}
            placeholder="First Name"
            label="First Name"
            value={"Jessica"}
            backgroundColor={colors?.background}
          />

            <CustomInput
            leftSource={icons.client}
            placeholder="Last Name"
            label="Last Name"
            value={"Miller"}
            backgroundColor={colors?.background}
          />

           <CustomInput
            leftSource={icons.call}
            label="Phone"
            value={"+381 64 123 4567"}
            backgroundColor={colors?.background}
          />

            <CustomInput
            leftSource={icons.email}
            label="Email"
            value={"jessica@example.com"}
            backgroundColor={colors?.background}
          />


             <CustomButtom
                       onPress={()=>setModalVisible(false)}

            //   textColor={theme.colors.white}
              // onPress={() => {
              //   navigation.dispatch(
              //     CommonActions.reset({
              //       index: 0,
              //       routes: [{ name: "AppStack" }], // or AuthStack
              //     })
              //   );
              // }}
            width={"100%"}
          >
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
                 <Image
                source={icons.changes}
                style={{
                  width: sizeHelper.calWp(35),
                  height: sizeHelper.calWp(35),
                  // marginTop:sizeHelper.calHp(8)
                }}
                resizeMode={"contain"}
              />
              <CustomText
                text={"SAVE CHANGES"}
                color={colors.white}
                size={27}
                fontWeight={"700"}
                fontFam={fonts.Inter_Bold}
              />

           
            </View>
          </CustomButtom>
      </View>
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
