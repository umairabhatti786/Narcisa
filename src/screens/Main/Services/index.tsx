import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  Alert,
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
  const [serviceGroup, setServiceGroup] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [isMessage, setIsMessage] = useState(false);

  useEffect(() => {
    GetServiceData();
  }, []);
  console.log("token", serviceGroup);

  const GetServiceData = () => {
    setLoading(true);

    try {
      ApiServices.GetServiceGroup(token, ({ isSuccess, response, status }: any) => {
        console.log("cdknvkndk", response, status);
        setLoading(false);

        if (!isSuccess) {
          console.log("Service--------Api--------Error");
          return;
        }
        if (!response?.success) {
          setMessage(response?.message?.info || "Something went wrong");
          setToastColor(colors.red);
          return;
        }

        if (status == 200) {
          setServiceGroup(response?.message?.data);
          return;
        } else {
          setMessage(response?.message?.info);
          setToastColor(colors.red);
          setIsMessage(true);
        }
      });
    } catch (error) {
      console.log("Service--------Api--------Error", error);
    }
  };
  const OnDeleteService = (item: any) => {
    let params = {
      token: token,
      id: item?.id,
    };

    setServiceGroup(serviceGroup.filter((it: any) => it.id !== item.id));

    try {
      ApiServices.DeleteService(
        params,
        ({ isSuccess, response, status }: any) => {
          console.log("cdknvkndk", response, status);
          setLoading(false);

          if (!isSuccess) {
            console.log("Service--------Api--------Error");
            return;
          }
          if (!response?.success) {
            setMessage(response?.message?.info || "Something went wrong");
            setToastColor(colors.red);
            return;
          }

          if (status == 200) {
            // setMessage(response?.message?.info);
            // setToastColor(colors.green);
            // setIsMessage(true);
            return;
          } else {
            setMessage(response?.message?.info);
            setToastColor(colors.red);
            setIsMessage(true);
          }
        },
      );
    } catch (error) {
      console.log("Service--------Api--------Error", error);
    }
  };
  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Hair" },
    { id: 3, name: "Face" },
    { id: 4, name: "Nails" },
    { id: 5, name: "Ostalo" },
  ];
  const filteredServices = useMemo(() => {
    if (selected === "All") {
      return serviceGroup;
    }

    return serviceGroup.filter(
      (item: any) => item?.category?.name === selected
    );
  }, [selected, serviceGroup]);
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
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // must be unique
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
            data={filteredServices}
            contentContainerStyle={{
              gap: sizeHelper.calWp(30),
              paddingBottom: sizeHelper.calHp(180),
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "50%",
                  }}
                >
                  <CustomText
                    text={"No Service Are Available"}
                    color={colors.primary}
                    size={27}
                    fontWeight={"700"}
                    fontFam={fonts.Inter_Bold}
                  />
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }: any) => {
              return (
                <>
                  <ServiceCard
                    item={item}
                    deleteService={() => {
                      Alert.alert(
                        `Alert!`,
                        `Are you sure you want to delete this client.`,

                        [
                          {
                            text: `Yes`,
                            onPress: () => {
                              OnDeleteService(item);
                            },
                          },
                          {
                            text: `No`,
                          },
                        ],
                      );
                    }}
                  />
                </>
              );
            }}
          />
          <CustomBottomSheet
            scrollEnabled={true}
            snapPoints={addScheduleSheetRefSnapPoints}
            bottomSheetModalRef={addScheduleSheetRef}
          >
            // ScheduleScreen.tsx
            <AddServiceBottomSheet
              SheetVisible={addScheduleSheetRef}
              selectedService={selectedService}
              serviceGroup={serviceGroup}
              setToastColor={setToastColor}
              setLoading={setLoading}
              loading={loading}
              setMessage={setMessage}
              setIsMessage={setIsMessage}
              onGetService={(newService: any) => {
                // local state mein naya service add karo
                setServiceGroup(prev => [...prev, newService]);
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