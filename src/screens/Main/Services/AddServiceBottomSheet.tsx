import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import sizeHelper, { screenWidth } from "../../../utils/Helpers";
import { appStyles } from "../../../utils/GlobalStyles";
import { colors } from "../../../utils/Themes";
import { icons } from "../../../assets/icons";
import { fonts } from "../../../utils/Themes/fonts";
import CustomText from "../../../components/Text";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import { ApiServices } from "../../../api/ApiServices";
import CustomToast from "../../../components/CustomToast";
import ScreenLoader from "../../../components/ScreenLoader";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import Dropdown from "../../../components/CustomDropDown";

interface ClientValue {
  serviceName: string;
  serviceNameError: string;
  price: string;
  priceError: string;
  duration: any;
  durationError: string;
  category: any;
  categoryError: string;
}

const AddServiceBottomSheet = ({
  SheetVisible,
  setModalVisible,
  selectedService,
  serviceGroup,
  onGetService,
  modalVisible,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [isMessage, setIsMessage] = useState(false);
  const [value, setValue] = useState<ClientValue>({
    serviceName: "",
    serviceNameError: "",
    price: "",
    priceError: "",
    duration: {},
    durationError: "",
    category: {},
    categoryError: "",
  });

  const token = useSelector(getToken);
  useEffect(() => {
    if (modalVisible) {
      setValue((prev) => ({
        ...prev,
        serviceName: selectedService?.name ? selectedService?.name : "",
        price: selectedService?.price ? selectedService?.price : "",
        duration: selectedService?.duration ? selectedService?.duration : "",
        category: selectedService?.groupId
          ? (() => {
              const item = serviceGroup.find(
                (i: any) => i.id === String(selectedService?.groupId),
              );
              return item
                ? {
                    name: item.groupName,
                    ...item,
                  }
                : null;
            })()
          : null,
      }));
    }
  }, [modalVisible]);

  const OnSave = () => {
    const serviceName = value?.serviceName?.trim();
    const price = value?.price?.trim();
    const duration = value?.duration;
    const category = value?.category;
    // Sequential Validation
    if (!serviceName) {
      setValue((prev) => ({
        ...prev,
        serviceNameError: "Service Name is required",
      }));
      return;
    }

    if (!price) {
      setValue((prev) => ({ ...prev, priceError: "Price is required" }));
      return;
    }

    if (!duration) {
      setValue((prev) => ({ ...prev, durationError: "Duration is required" }));
      return;
    }

    if (!category?.id) {
      setValue((prev) => ({ ...prev, categoryError: "Category is required" }));
      return;
    }
    SheetVisible.current?.dismiss();

    setLoading(true);
    const param = {
      raw: JSON.stringify({
        name: serviceName,
        duration: duration,
        price: price,
        group: category?.id,
      }),
      token: token,
      id: selectedService?.id,
    };
    ApiServices.CreateServices(
      param,
      ({ isSuccess, response, status }: any) => {
        console.log("mcndmncmddmncdncmdncmdmn", response?.success);
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
        // AddServiceBottomSheet.tsx
        if (response?.success) {
          // parent ko bhej do
          onGetService?.();

          setToastColor(colors.primary);
          setMessage(
            selectedService?.id
              ? "Service Update Successfully"
              : "Service Added Successfully",
          );
          setIsMessage(true);
          setTimeout(() => {
            setIsMessage(false);
            setValue({} as ClientValue);
            setModalVisible(false);
          }, 1000);
        } else {
          setMessage(response?.message?.info);
          setToastColor(colors.red);
          setLoading(false);
          setIsMessage(true);
        }
      },
    );
  };

  return (
    <>
      <Modal
        isVisible={modalVisible}
        deviceWidth={screenWidth}
        onBackButtonPress={() => {
          setModalVisible?.(false);
        }}
        onBackdropPress={() => {
          setModalVisible?.(false);
        }}
        backdropColor="rgba(0,0,0,0.5)"
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginBottom: sizeHelper.calHp(-60),
        }}
      >
        <View style={styles.Container}>
          <View
            style={{
              paddingHorizontal: sizeHelper.calWp(35),
              gap: sizeHelper.calHp(30),

              paddingBottom: sizeHelper.calHp(100),
            }}
          >
            <View style={appStyles.rowjustify}>
              <View>
                <CustomText
                  text={
                    Object.keys(selectedService).length > 0
                      ? "Edit Service"
                      : "Add Service"
                  }
                  fontWeight="700"
                  fontFam={fonts.Inter_Bold}
                  color={colors.black}
                  size={35}
                />
                {Object.keys(selectedService).length > 0 && (
                  <CustomText
                    text={"Update Name and Duration"}
                    fontWeight="600"
                    fontFam={fonts.Inter_Medium}
                    color={colors.text_grey}
                    size={23}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible?.(false);
                }}
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
            <View
              style={{
                height: sizeHelper.calHp(2),
                backgroundColor: colors.border,
                width: "100%",
                marginTop: sizeHelper.calHp(20),
                marginBottom: sizeHelper.calHp(20),
              }}
            />
            <CustomInput
              leftSource={icons.service}
              tintColor={colors.primary}
              placeholder="Service Name"
              label="Service Name"
              value={value.serviceName}
              error={value.serviceNameError}
              onChangeText={(text: any) =>
                setValue((prev) => ({
                  ...prev,
                  serviceName: text,
                  serviceNameError: "",
                }))
              }
              backgroundColor={colors?.background}
            />

            <Dropdown
              leftSource={icons.tags}
              data={serviceGroup?.map((item: any) => {
                return {
                  ...item,
                  name: item?.groupName,
                };
              })}
              error={value?.categoryError}
              value={value.category}
              onActions={(item: any) => {
                setValue((prev) => ({
                  ...prev,
                  category: item,
                  categoryError: "",
                }));
              }}
              tintColor={colors.primary}
              placeholder="Select Category"
              label="Category"
              lablelfontWeight={"900"}
              textTransform="uppercase"
              fontFamily={fonts.InterTight_Bold}
              backgroundColor={colors?.background}
            />

            <CustomInput
              leftSource={icons.dollar}
              tintColor={colors.primary}
              placeholder="Price"
              keyboard={"number-pad"}
              label="Price"
              backgroundColor={colors?.background}
              value={value.price}
              error={value.priceError}
              onChangeText={(text: any) =>
                setValue((prev) => ({
                  ...prev,
                  price: text,
                  priceError: "",
                }))
              }
            />

            <CustomInput
              leftSource={icons.clock}
              tintColor={colors.primary}
              placeholder="Duration"
              keyboard={"number-pad"}
              label="Duration (mint)"
              backgroundColor={colors?.background}
              value={value.duration}
              error={value.durationError}
              onChangeText={(text: any) =>
                setValue((prev) => ({
                  ...prev,
                  duration: text,
                  durationError: "",
                }))
              }
            />

            <CustomButton onPress={OnSave} width={"100%"}>
              <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
                <Image
                  source={icons.changes}
                  style={{
                    width: sizeHelper.calWp(35),
                    height: sizeHelper.calWp(35),
                    marginTop: sizeHelper.calHp(8),
                  }}
                  resizeMode={"contain"}
                />
                <CustomText
                  text={"Save Changes"}
                  color={colors.white}
                  size={27}
                  fontWeight={"700"}
                  fontFam={fonts.Inter_Bold}
                />
              </View>
            </CustomButton>
          </View>
        </View>

        {loading && <ScreenLoader />}
        <CustomToast
          marginBottom={sizeHelper.calHp(100)}
          isVisable={isMessage}
          setIsVisable={setIsMessage}
          message={message}
          backgroundColor={toastColor}
        />
      </Modal>
    </>
  );
};

export default AddServiceBottomSheet;

const styles = StyleSheet.create({
  Container: {
    width: "110%",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: sizeHelper.calWp(50),
    borderTopRightRadius: sizeHelper.calWp(50),
    paddingVertical: sizeHelper.calHp(35),
    gap: sizeHelper.calHp(30),
  },
});
