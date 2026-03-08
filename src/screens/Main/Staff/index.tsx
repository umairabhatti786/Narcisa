import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import HomeHeader from "../../../components/HomeHeader";
import sizeHelper from "../../../utils/Helpers";
import { colors } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { appStyles } from "../../../utils/GlobalStyles";
import ClientCard from "../../../components/ClientCard";
import StaffCard from "../../../components/StaffCard";

const StaffScreen = ({ navigation }: any) => {
  const StaffData = [
    {
      id: 1,
      name: "Anna Peters",
      profession: "Hairstylist",
      time: "Today at 4:30 PM",
      review:"4.9",
      availity:"Next available slot:"
    },

    {
      id: 2,
      name: "Maya Nichols",
      profession: "Nail Artist",
      time: "Today at 4:30 PM",
      review:"4.8",
      availity:"Next available slot:"
    },

    {
      id: 3,
      name: "Ivy Simmons",
      profession: "Esthetician",
      time: "Today at 4:30 PM",
      review:"5",
      availity:"Next available slot:"
    },
    {
      id: 4,
      name: "Drake Thompson",
      profession: "Massage Therapist",
      time: "Today at 4:30 PM",
      review:"4.9",
      availity:"Next available slot:"
    },
  ];
  return (
    <>
      <ScreenLayout
      >
        <View
          style={{
            padding: sizeHelper.calWp(35),
            backgroundColor: colors.white,
          }}
        >
          <HomeHeader />
        </View>
        <View style={appStyles.rowjustify}>
          <CustomText
            text={"Staff Members"}
            size={32}
            color={colors.black}
            fontFam={fonts.InterTight_Bold}
            fontWeight="700"
          />
          <CustomText
            text={"Edit Shifts"}
            size={22}
            color={colors.primary}
            fontFam={fonts.InterTight_Bold}
            fontWeight="700"
          />

        </View>
        <FlatList
          data={StaffData}
          contentContainerStyle={{
            gap: sizeHelper.calWp(30),
            paddingBottom: sizeHelper.calHp(180),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: any) => {
            return (
              <>
                <StaffCard
                  item={item}
                  isAway={item.id === 4}
                />
              </>
            );
          }}
        />
      </ScreenLayout>
    </>
  );
};

export default StaffScreen;

const styles = StyleSheet.create({});
