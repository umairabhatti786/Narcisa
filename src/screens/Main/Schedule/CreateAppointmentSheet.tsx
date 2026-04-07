import {
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import sizeHelper, { screenWidth } from "../../../utils/Helpers";
import { appStyles } from "../../../utils/GlobalStyles";
import { colors } from "../../../utils/Themes";
import { icons } from "../../../assets/icons";
import { fonts } from "../../../utils/Themes/fonts";
import CustomText from "../../../components/Text";
import CustomButton from "../../../components/Button";
import { ApiServices } from "../../../api/ApiServices";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import Dropdown from "../../../components/CustomDropDown";
import CustomDateTimePicker from "../../../components/CustomDateTimePicker";
import moment from "moment";

interface ClientValue {
  date: string;
  dateError: string;
  startTime: string;
  startTimeError: string;
  endTime: string;
  endTimeError: string;
  client: any;
  clientError: string;
  service: any;
  serviceError: string;
  worker: any;
  workerError: string;
  location: any;
  locationError: string;
}

const CreateAppointmentSheet = ({
  SheetVisible,
  selectedService,
  setToastColor,
  setLoading,
  setMessage,
  setIsMessage,
  onGetAppointments,
  isSheetVisible,
}: any) => {
  const [value, setValue] = useState<ClientValue>({
    date: "",
    dateError: "",
    startTime: "",
    startTimeError: "",
    endTime: "",
    endTimeError: "",
    client: {},
    clientError: "",
    service: {},
    serviceError: "",
    worker: {},
    workerError: "",
    location: {},
    locationError: "",
  });

  const token = useSelector(getToken);
  console.log("selectedService", selectedService);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const [serviceGroup, setServiceGroup] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [workerData, setWorkerData] = useState([]);
  const [locationData, setLocationData] = useState([]);

 

  useEffect(() => {
    if(isSheetVisible){
       GetServiceData();
    GetClientData();
    GetWorkerData();
    GetLocationData();

    }
   console.log("clientData",clientData)
  }, [isSheetVisible]);

  const GetServiceData = () => {
    try {
      ApiServices.GetServiceGroup(
        token,
        ({ isSuccess, response, status }: any) => {
          if (status == 200) {
            setServiceGroup(response?.message?.data);
            return;
          } else {
            console.log("Service--------Api--------Error", response?.message);
          }
        },
      );
    } catch (error) {
      console.log("Service--------Api--------Error", error);
    }
  };

  const GetClientData = () => {
    try {
      ApiServices.GetClients(token, ({ isSuccess, response, status }: any) => {
        if (status == 200) {
          setClientData(response?.message?.data);
          return;
        } else {
          console.log("Client--------Api--------Error", response?.message);
        }
      });
    } catch (error) {
      console.log("Client--------Api--------Error", error);
    }
  };

  const GetWorkerData = () => {
    try {
      ApiServices.GetStaff(token, ({ isSuccess, response, status }: any) => {
        if (status == 200) {
          setWorkerData(response?.message?.data);
          return;
        } else {
          console.log("Worker--------Api--------Error", response?.message);
        }
      });
    } catch (error) {
      console.log("Worker--------Api--------Error", error);
    }
  };

  const GetLocationData = () => {
    try {
      ApiServices.GetLocations(
        token,
        ({ isSuccess, response, status }: any) => {
          if (status == 200) {
            setLocationData(response?.message?.data);
            return;
          } else {
            console.log("Worker--------Api--------Error", response?.message);
          }
        },
      );
    } catch (error) {
      console.log("Worker--------Api--------Error", error);
    }
  };
  const OnCreate = () => {
    // Sequential Validation
    if (Object.keys(value?.client).length == 0) {
      setValue((prev) => ({
        ...prev,
        clientError: "Client is required",
      }));
      return;
    }

    if (Object.keys(value?.service).length == 0) {
      setValue((prev) => ({ ...prev, serviceError: "Service is required" }));
      return;
    }

    if (Object.keys(value?.worker).length == 0) {
      setValue((prev) => ({ ...prev, workerError: "Staff is required" }));
      return;
    }

    if (Object.keys(value?.location).length == 0) {
      setValue((prev) => ({ ...prev, locationError: "Location is required" }));
      return;
    }
    if (!value?.date) {
      setValue((prev) => ({ ...prev, dateError: "Date is required" }));
      return;
    }
    if (!value?.startTime) {
      setValue((prev) => ({
        ...prev,
        startTimeError: "Start time is required",
      }));
      return;
    }
    if (!value?.endTime) {
      setValue((prev) => ({ ...prev, endTimeError: "End time is required" }));
      return;
    }
    SheetVisible.current?.dismiss();

    setLoading(true);
    const param = {
      raw: JSON.stringify({
        dateStart: `${value.date} ${value.startTime}`,
        dateEnd: `${value.date} ${value.endTime}`,
        location: value?.location?.id,
        client: value?.client?.id,
        service: value?.service?.id,
        worker: value.worker?.id,
      }),
      token: token,
    };

    ApiServices.CreateAppointments(
      param,
      ({ isSuccess, response, status }: any) => {
        console.log("cdknvkndk", response, status);
        setLoading(false);

        if (!isSuccess) {
          setMessage("API Error");
          setToastColor(colors.red);
          setIsMessage(true);
          return;
        }

        if (response?.success) {
          // parent ko bhej do
          onGetAppointments?.();
          setToastColor(colors.primary);
          setMessage("Appointments Created Successfully");
          setIsMessage(true);
          setTimeout(() => {
            setIsMessage(false);
            setValue({} as ClientValue);
            SheetVisible.current?.dismiss();
          }, 1000);

          return;
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
      },
    );
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: sizeHelper.calWp(35),
          gap: sizeHelper.calHp(30),

          paddingBottom: sizeHelper.calHp(30),
        }}
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
        </View>
        <Dropdown
          leftSource={icons.clients}
          onActions={(item: any) => {
            setValue((prev) => ({
              ...prev,
              client: item,
              clientError: "",
            }));
          }}
          data={clientData?.map((item: any) => {
            return {
              ...item,
              name: `${item?.name} ${item?.lastName}`,
            };
          })}
          tintColor={colors.primary}
          placeholder="Select Client"
          label="Client"
          value={value?.client}
          error={value?.clientError}
        />

        <Dropdown
          leftSource={icons.service}
          onActions={(item: any) => {
            setValue((prev) => ({
              ...prev,
              service: item,
              serviceError: "",
            }));
          }}
          data={serviceGroup?.map((item: any) => {
            return {
              ...item,
              name: item?.groupName,
            };
          })}
          tintColor={colors.primary}
          placeholder="Select Service"
          label="Service"
          value={value?.service}
          error={value?.serviceError}
        />

        <Dropdown
          leftSource={icons.staff}
          onActions={(item: any) => {
            setValue((prev) => ({
              ...prev,
              worker: item,
              workerError: "",
            }));
          }}
          data={workerData?.map((item: any) => {
            return {
              ...item,
              name: `${item?.name} ${item?.lastName}`,
            };
          })}
          tintColor={colors.primary}
          placeholder="Select Staff"
          label="Staff"
          value={value?.worker}
          error={value?.workerError}
        />

        <Dropdown
          leftSource={icons.location}
          onActions={(item: any) => {
            setValue((prev) => ({
              ...prev,
              location: item,
              locationError: "",
            }));
          }}
          data={locationData?.map((item: any) => {
            return {
              ...item,
              name: `${item?.locationName}`,
            };
          })}
          tintColor={colors.primary}
          placeholder="Select Location"
          label="Location"
          value={value?.location}
          error={value?.locationError}
        />
        <CustomDateTimePicker
          leftSource={icons.calendar}
          setIsPickerVisible={setIsDatePickerVisible}
          isPickerVisible={isDatePickerVisible}
          tintColor={colors.primary}
          onConfirmed={(date: any) => {
            setValue({
              ...value,
              date: moment(date).format("YYYY-MM-DD"), // string format
              dateError: "",
            });
          }}
          placeholder="YYYY-MM-DD"
          label="Date"
          value={value?.date}
          error={value?.dateError}
          lablelfontWeight={"900"}
          textTransform="uppercase"
          fontFamily={fonts.InterTight_Bold}
          backgroundColor={colors?.background}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CustomDateTimePicker
            leftSource={icons.clock}
            mode={"time"}
            width={"48%"}
            setIsPickerVisible={setIsStartTimePickerVisible}
            isPickerVisible={isStartTimePickerVisible}
            tintColor={colors.primary}
            onConfirmed={(date: any) => {
              const formattedTime = moment(date).format("HH:mm:ss");

              setValue({
                ...value,
                startTime: formattedTime, // "10:00:00",
                startTimeError: "",
              });
            }}
            placeholder="00:00:00"
            label="Start Time"
            value={value?.startTime}
            error={value?.startTimeError}
            lablelfontWeight={"900"}
            textTransform="uppercase"
            fontFamily={fonts.InterTight_Bold}
            backgroundColor={colors?.background}
          />

          <CustomDateTimePicker
            leftSource={icons.clock}
            mode={"time"}
            width={"48%"}
            setIsPickerVisible={setIsEndTimePickerVisible}
            isPickerVisible={isEndTimePickerVisible}
            tintColor={colors.primary}
            onConfirmed={(date: any) => {
              const formattedTime = moment(date).format("HH:mm:ss");

              setValue({
                ...value,
                endTime: formattedTime, // "10:00:00",
                endTimeError: "",
              });
            }}
            placeholder="00:00:00"
            label="End Time"
            value={value?.endTime}
            error={value?.endTimeError}
            lablelfontWeight={"900"}
            textTransform="uppercase"
            fontFamily={fonts.InterTight_Bold}
            backgroundColor={colors?.background}
          />
        </View>
        <View style={appStyles.rowjustify}>
          <CustomButton
            text="Cancel"
            bgColor={colors.light_blue}
            textColor={colors.text_grey}
            onPress={() => SheetVisible.current.dismiss()}
            width={"48%"}
          />

          <CustomButton text="Create" onPress={OnCreate} width={"48%"} />
        </View>
      </View>
    </>
  );
};

export default CreateAppointmentSheet;

const styles = StyleSheet.create({
});
