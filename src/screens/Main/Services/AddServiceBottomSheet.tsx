import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
  onGetClient,
  selectedService,
  setSelectedClient,
  serviceGroup,
  onGetService,
  setToastColor,
  setLoading,
  setMessage,
  setIsMessage,
}: any) => {
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
  console.log("selectedService", selectedService);

  const durations = [
    { id: 1, name: "5 mint", time: "5" },
    { id: 2, name: "10 mint", time: "10" },
    { id: 3, name: "15 mint", time: "15" },
    { id: 4, name: "20 mint", time: "20" },
    { id: 5, name: "25 mint", time: "25" },
    { id: 6, name: "30 mint", time: "30" },
    { id: 7, name: "35 mint", time: "35" },
    { id: 8, name: "40 mint", time: "40" },
    { id: 9, name: "45 mint", time: "45" },
    { id: 10, name: "50 mint", time: "50" },
    { id: 11, name: "55 mint", time: "55" },
    { id: 12, name: "60 mint", time: "60" },
  ];

  useEffect(() => {
    if (SheetVisible) {
      setValue((prev) => ({
        ...prev,
        serviceName: selectedService?.serviceName
          ? selectedService?.serviceName
          : "",
        price: selectedService?.price ? selectedService?.price : "",
        duration: selectedService?.duration ? selectedService?.duration : "",
        category: selectedService?.category ? selectedService?.category : "",
      }));
    }
  }, [SheetVisible]);
  const OnSave = () => {
    const serviceName = value?.serviceName?.trim();
    const price = value?.price?.trim();
    const duration = value?.duration;
    const category = value?.category;
    console.log("token", token);
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
    SheetVisible.current?.dismiss()

    setLoading(true);
    const param = {
      raw: JSON.stringify({
        name: serviceName,
        duration: duration?.time,
        price: price,
        groupId: category?.id,
      }),
      token: token,
      id: selectedService?.id,
    };

    ApiServices.CreateServices(param, ({ isSuccess, response, status }: any) => {
      console.log("cdknvkndk", response, status);
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
      if (status == 200) {
        const newService = {
          id: response?.message?.data?.id || Date.now(), // ya jo API return kare
          serviceName: serviceName,
          price: price,
          duration: duration,
          category: category,
        };

        // parent ko bhej do
        onGetService?.(newService);

        setToastColor(colors.primary);
        setMessage(selectedService?.id ? "Service Update Successfully" : "Service Added Successfully");
        setIsMessage(true);
        setTimeout(() => {
          setIsMessage(false);
          setValue({} as ClientValue);
          SheetVisible.current?.dismiss();
        }, 1000);
      }
      if (status === 401) {
        setMessage(response?.message?.info);
        setToastColor(colors.red);
        setLoading(false);
        setIsMessage(true);

        return;
      } else {
        setMessage(response?.message?.info);
        setToastColor(colors.red);
        setLoading(false);
        setIsMessage(true);
      }
    });
  };

  return (
    <>
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
              text={"Edit Service"}
              fontWeight="700"
              fontFam={fonts.Inter_Bold}
              color={colors.black}
              size={35}
            />
          </View>
          <TouchableOpacity
            onPress={() => SheetVisible.current?.dismiss()}
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

        <CustomInput
          leftSource={icons.dollar}
          tintColor={colors.primary}
          placeholder="Price"
          keyboard={"number-pad"}
          label="Price"
          backgroundColor={colors?.background}
          // width={"48%"}
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

        <Dropdown
          leftSource={icons.tags}
          // width={"48%"}
          onActions={(item: any) => {
            setValue((prev) => ({
              ...prev,
              duration: item,
              durationError: "",
            }));
          }}
          data={durations?.map((item: any) => {
            return {
              ...item,
              name: item?.name,
            };
          })}
          tintColor={colors.primary}
          placeholder="Duration"
          label="Duration"
          value={value?.duration}
          error={value?.durationError}
          lablelfontWeight={"900"}
          textTransform="uppercase"
          fontFamily={fonts.InterTight_Bold}
          backgroundColor={colors?.background}
        />
        {/* </View> */}
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

        <CustomButtom onPress={OnSave} width={"100%"}>
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
        </CustomButtom>
      </View>



    </>
  );
};

export default AddServiceBottomSheet;

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