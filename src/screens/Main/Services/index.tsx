import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
} from "react-native";
import ScreenLayout from "../../../components/ScreenLayout";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import CustomInput from "../../../components/Input";
import { icons } from "../../../assets/icons";
import { appStyles } from "../../../utils/GlobalStyles";
import sizeHelper from "../../../utils/Helpers";
import { colors } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import CustomButtom from "../../../components/Button";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fonts } from "../../../utils/Themes/fonts";
import { CommonActions } from "@react-navigation/native";
import HomeHeader from "../../../components/HomeHeader";
import ServiceCard from "../../../components/ServiceCard";
import Dropdown from "../../../components/CustomDropDown";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../api/ApiServices";
import AddServiceBottomSheet from "./AddServiceBottomSheet";
import ScreenLoader from "../../../components/ScreenLoader";
import CustomToast from "../../../components/CustomToast";

const ScheduleScreen = ({ navigation }: any) => {
  const addScheduleSheetRef = useRef<any>(null);
  const addScheduleSheetRefSnapPoints = useMemo(() => ["80%", "80%"], []);
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(true);
  const [selected, setSelected] = useState("All");
  const token = useSelector(getToken);
  const [serviceGroup, setServiceGroup] = useState([]);
  const [selectedService, setSelectedService] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [toastColor, setToastColor] = useState(colors.red);
    const [isMessage, setIsMessage] = useState(false);

  useEffect(() => {
    fetchServiceGroup();
  }, []);
  console.log("serviceGroup", serviceGroup);
  const fetchServiceGroup = () => {
    ApiServices.GetServiceGroup(
      token,
      ({ isSuccess, response, status }: any) => {
        if (isSuccess && status === 200) {
          setServiceGroup(response?.message?.data || []);
        } else {
          console.log("Staff API Error", response);
        }
      },
    );
  };

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Hair" },
    { id: 3, name: "Face" },
    { id: 4, name: "Nails" },
    { id: 5, name: "Massage" },
  ];
  
  const ServiceData = [
    {
      id: 1,
      Professionname: "Women's Haircut",
      time: "45 mint",
      profession: "Hair",
      price: "$25.00",
    },

    {
      id: 2,
      Professionname: "Men's Haircut",
      time: "30 mint",
      profession: "Hair",
      price: "$12.00",
    },

    {
      id: 3,
      Professionname: "Blowout",
      time: "30 mint",
      profession: "Hair",
      price: "$15.00",
    },
  ];
  return (
    <>
      <ScreenLayout>
        <View
          style={{
            padding: sizeHelper.calWp(35),
            gap: sizeHelper.calHp(20),
          }}
        >
          <HomeHeader />
          <View style={styles.line} />
          <View style={appStyles.rowjustify}>
            <CustomText
              text={"Services"}
              size={28}
              color={colors.black}
              fontFam={fonts.InterTight_Bold}
              fontWeight="700"
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => addScheduleSheetRef.current.present()}
              style={
                {
                  // position: "absolute",
                  // right: sizeHelper.calWp(40),
                  // bottom: sizeHelper.calHp(120),
                  // backgroundColor:'red'
                }
              }
            >
              {/* <Shadow
          distance={10} // spread size
          startColor="rgba(124,58,237,0.45)" // main glow color
          endColor="rgba(124,58,237,0.00)" // fade out
          offset={[0, 0]}
          paintInside={false}
          // 👈 push shadow DOWN
          // containerViewStyle={{
          //   borderRadius: SIZE / 2,
          // }}
        > */}
              <View
                // onPress={() => navigation.navigate('SearchScreen')}
                style={{
                  height: sizeHelper.calHp(60),
                  width: sizeHelper.calHp(60),
                  borderRadius: sizeHelper.calWp(30),
                  backgroundColor: colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  elevation: 8,
                  shadowColor: "#6F00FF",
                  padding: sizeHelper.calWp(10),
                }}
              >
                <Image
                  resizeMode="contain"
                  source={icons.plus}
                  style={{
                    height: sizeHelper.calHp(20),
                    width: sizeHelper.calHp(20),
                    tintColor: colors.white,
                  }}
                />
              </View>
              {/* </Shadow> */}
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelected(item.name)}
                style={[
                  styles.catagoryButton,
                  selected === item.name && styles.activebg,
                ]}
              >
                <CustomText
                  text={item.name}
                  size={24}
                  fontWeight="700"
                  color={colors.text_grey}
                  fontFam={fonts.InterTight_Bold}
                  style={[selected === item.name && styles.activetext]}
                />
              </TouchableOpacity>
            )}
          />
          <FlatList
            data={ServiceData}
            contentContainerStyle={{
              gap: sizeHelper.calWp(30),
              paddingBottom: sizeHelper.calHp(180),
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              return (
                <>
                  <ServiceCard item={item} />
                </>
              );
            }}
          />
          <CustomBottomSheet
            scrollEnabled={true}
            snapPoints={addScheduleSheetRefSnapPoints}
            bottomSheetModalRef={addScheduleSheetRef}
          >
            <AddServiceBottomSheet
              SheetVisible={addScheduleSheetRef}
              selectedService={selectedService}
              serviceGroup={serviceGroup}
              setToastColor={setToastColor}
              setLoading={setLoading}
              loading={loading}
              setMessage={setMessage}
              setIsMessage={setIsMessage}
              
              onGetService={()=>{

                console.log("clkndknck")
              }}
            />
          </CustomBottomSheet>
        </View>
      </ScreenLayout>

       {loading && <ScreenLoader />}
        <CustomToast
          isVisable={isMessage}
          setIsVisable={setIsMessage}
          message={message}
          backgroundColor={toastColor}
        />
    </>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  line: {
    width: "120%",
    height: 1,
    alignSelf: "center",
    backgroundColor: colors.border,
  },
  catagoryButton: {
    width: sizeHelper.calWp(150),
    height: sizeHelper.calWp(70),
    backgroundColor: colors.light_blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calWp(40),
  },
  activebg: {
    backgroundColor: colors.primary,
  },
  activetext: {
    color: colors.white,
  },
});
