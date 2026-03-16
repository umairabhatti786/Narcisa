import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
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

  return (
    <>
      <ScreenLayout style={{ paddingHorizontal: -1, gap: 0 }}>
             <View
               style={{
                 padding: sizeHelper.calWp(35),
                 backgroundColor: colors.white,
               }}
             >
               <HomeHeader />
             </View>
                     <View style={appStyles.line} />
             
        <View style={{...appStyles.rowjustify,
                    padding: sizeHelper.calWp(35),


        }}>
          <CustomText
            text={"Staff Members"}
            size={30}
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
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={staff}
           style={{ paddingHorizontal: sizeHelper.calWp(35) }}
              contentContainerStyle={{
                gap: sizeHelper.calWp(30),
                paddingBottom: sizeHelper.calHp(180),
              }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => {
              return <StaffCard item={item} />;
            }}
          />
        )}
      </ScreenLayout>
    </>
  );
};

export default StaffScreen;

const styles = StyleSheet.create({});
