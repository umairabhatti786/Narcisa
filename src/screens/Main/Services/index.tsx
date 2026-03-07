import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import CustomInput from "../../../components/Input";
import { icons } from "../../../assets/icons";
import { appStyles } from "../../../utils/GlobalStyles";
import sizeHelper from "../../../utils/Helpers";
import { colors } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import CustomButton from "../../../components/Button";

import { fonts } from "../../../utils/Themes/fonts";

const ScheduleScreen = ({ navigation }: any) => {
  const addScheduleSheetRef = useRef<any>(null);
  const addScheduleSheetRefSnapPoints = useMemo(() => ["80%", "80%"], []);

  return (
    <>
      <ScreenLayout>
        <CustomBottomSheet
          snapPoints={addScheduleSheetRefSnapPoints}
          bottomSheetModalRef={addScheduleSheetRef}
        >
          <View style={appStyles.rowjustify}>
            <View>
              <CustomText
                text={"New Appointment"}
                fontWeight="700"
                fontFam={fonts.Inter_Bold}
                color={colors.black}
                size={35}
              />

              <CustomText
                text={"Select client and service"}
                fontWeight="600"
                fontFam={fonts.Inter_Medium}
                color={colors.text_grey}
                size={23}
              />
            </View>
            <TouchableOpacity
              // onPress={()=>setModalVisible(false)}
              style={appStyles.circle}
            >
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
            placeholder=""
            label="Client"
            backgroundColor={colors?.background}
          />

          <CustomInput
            leftSource={icons.service}
            placeholder=""
            label="Service"
            backgroundColor={colors?.background}
          />
          <View style={appStyles.rowjustify}>
            <CustomButton
              text="Cancel"
              bgColor={colors.light_blue}
              textColor={colors.text_grey}
              //  onPress={()=>setModalVisible(false)}
              width={"48%"}
            />

            <CustomButton
              text="Create Appointment"
              //  onPress={()=>setModalVisible(false)}
              width={"48%"}
            />
          </View>
        </CustomBottomSheet>
      </ScreenLayout>
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({});
