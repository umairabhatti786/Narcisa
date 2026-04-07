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
import { icons } from "../../../assets/icons";
import { appStyles } from "../../../utils/GlobalStyles";
import sizeHelper from "../../../utils/Helpers";
import { colors } from "../../../utils/Themes";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import HomeHeader from "../../../components/HomeHeader";
import ServiceCard from "../../../components/ServiceCard";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import { ApiServices } from "../../../api/ApiServices";
import AddServiceBottomSheet from "./AddServiceBottomSheet";
import ScreenLoader from "../../../components/ScreenLoader";
import CustomToast from "../../../components/CustomToast";

const ScheduleScreen = ({ navigation }: any) => {
  const addScheduleSheetRef = useRef<any>(null);
  const token = useSelector(getToken);
  const [serviceGroup, setServiceGroup] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState({});
  const [selectedServiceGroup, setSelectedServiceGroup] = useState<any>({});
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [isMessage, setIsMessage] = useState(false);
  useEffect(() => {
    GetServiceGroupData();
    GetServicesData();
  }, []);

  useEffect(() => {
    GetServicesData();
  }, []);

  const GetServiceGroupData = () => {
    try {
      ApiServices.GetServiceGroup(
        token,
        ({ isSuccess, response, status }: any) => {
          console.log("cdknvkndk", response, status);

          if (!isSuccess) {
            console.log("Service--------Api--------Error");
            return;
          }

          if (status == 200) {
            setServiceGroup(response?.message?.data);
            setSelectedServiceGroup(response?.message?.data[0]);
            return;
          } else {
            setMessage(response?.message?.error);
            setToastColor(colors.red);
            setIsMessage(true);
          }
        },
      );
    } catch (error) {
      console.log("Service--------Api--------Error", error);
    }
  };

  const GetServicesData = () => {
    setLoading(true);

    try {
      ApiServices.GetServices(token, ({ isSuccess, response, status }: any) => {
        console.log("cdknvkndk", response, status);

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
          // setServices(
          //   response?.message?.data.filter(
          //     (it:any) => it?.groupId == selectedServiceGroup?.id,
          //   ),
          // );
          setServices(response?.message?.data);

          setAllServices(response?.message?.data);
          setLoading(false);
          return;
        } else {
          setMessage(response?.message?.error);
          setToastColor(colors.red);
          setLoading(false);
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

    setServices(services.filter((it: any) => it.id !== item.id));

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
        <View style={styles.line} />

        <View
          style={{
            paddingVertical: sizeHelper.calWp(35),
            backgroundColor: colors.white,
            gap: sizeHelper.calHp(30),
          }}
        >
          <View
            style={{
              ...appStyles.rowjustify,
              paddingHorizontal: sizeHelper.calWp(35),
            }}
          >
            <CustomText
              text={"Services"}
              size={28}
              color={colors.black}
              fontFam={fonts.InterTight_Bold}
              fontWeight="700"
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setSelectedService({});
                setIsServiceModalVisible(true);
              }}
            >
              <View
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
            </TouchableOpacity>
          </View>

          <FlatList
            data={serviceGroup}
            keyExtractor={(item) =>
              item.id?.toString() || Math.random().toString()
            } // must be unique
            horizontal
            contentContainerStyle={{ paddingHorizontal: sizeHelper.calWp(35) }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedServiceGroup(item);
                }}
                style={[
                  styles.catagoryButton,
                  selectedServiceGroup?.id === item.id && styles.activebg,
                ]}
              >
                <CustomText
                  text={item.groupName}
                  size={24}
                  fontWeight="700"
                  color={colors.text_grey}
                  fontFam={fonts.InterTight_Bold}
                  style={[
                    selectedServiceGroup?.id === item.id && styles.activetext,
                  ]}
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.line} />
        {loading ? (
          <></>
        ) : (
          <FlatList
            data={services.filter(
              (it) => it?.groupId == selectedServiceGroup?.id,
            )}
            style={{ padding: sizeHelper.calWp(35) }}
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
                    onEdit={() => {
                      console.log("ckdnckdnkcd", item);
                      setSelectedService(item);
                      setIsServiceModalVisible(true);
                    }}
                    deleteService={() => {
                      Alert.alert(
                        `Alert!`,
                        `Are you sure you want to delete this Service.`,

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
        )}
      </ScreenLayout>

      <AddServiceBottomSheet
        SheetVisible={addScheduleSheetRef}
        modalVisible={isServiceModalVisible}
        setModalVisible={setIsServiceModalVisible}
        selectedService={selectedService}
        serviceGroup={serviceGroup}
        setToastColor={setToastColor}
        setLoading={setLoading}
        loading={loading}
        setMessage={setMessage}
        setIsMessage={setIsMessage}
        onGetService={(newService: any) => {
          // local state mein naya service add karo
          GetServicesData();
        }}
      />

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
    height: sizeHelper.calWp(70),
    backgroundColor: colors.light_blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calWp(40),
    paddingHorizontal: sizeHelper.calWp(30),
  },
  activebg: {
    backgroundColor: colors.primary,
  },
  activetext: {
    color: colors.white,
  },
});
