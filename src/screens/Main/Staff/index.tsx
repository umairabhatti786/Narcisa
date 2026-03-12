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
import { getToken } from "../../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { ApiServices } from "../../../api/ApiServices";

const StaffScreen = ({ navigation }: any) => {
  const token = useSelector(getToken); // Redux se token
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = () => {
    setLoading(true);
    ApiServices.GetStaff(token, ({ isSuccess, response, status }: any) => {
      setLoading(false);
      if (isSuccess && status === 200) {
        setStaff(response?.message?.data || []);
      } else {
        console.log("Staff API Error", response);
      }
    });
  };
  const StaffData = [
    {
      id: 1,
      name: "Anna Peters",
      profession: "Hairstylist",
      time: "Today at 4:30 PM",
      review: "4.9",
      availity: "Next available slot:"
    },

    {
      id: 2,
      name: "Maya Nichols",
      profession: "Nail Artist",
      time: "Today at 4:30 PM",
      review: "4.8",
      availity: "Next available slot:"
    },

    {
      id: 3,
      name: "Ivy Simmons",
      profession: "Esthetician",
      time: "Today at 4:30 PM",
      review: "5",
      availity: "Next available slot:"
    },
    {
      id: 4,
      name: "Drake Thompson",
      profession: "Massage Therapist",
      time: "Today at 4:30 PM",
      review: "4.9",
      availity: "Next available slot:"
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
          data={staff}
          contentContainerStyle={{
            gap: sizeHelper.calWp(30),
            paddingBottom: sizeHelper.calHp(180),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => {
            const nameParts = item.name.split(" ");
            const firstName = nameParts[1] || "Tanzeel";
            const lastName = nameParts[1] || "Chohan";

            return (
              <StaffCard
                item={{ ...item, firstName, lastName }}
              />
            );
          }}
        />
      </ScreenLayout>
    </>
  );
};

export default StaffScreen;

const styles = StyleSheet.create({});
