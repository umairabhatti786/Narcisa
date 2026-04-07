import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../utils/Themes";
import sizeHelper from "../../../utils/Helpers";
import ScreenLayout from "../../../components/ScreenLayout";
import HomeHeader from "../../../components/HomeHeader";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { icons } from "../../../assets/icons";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CreateAppointmentSheet from "./CreateAppointmentSheet";
import ScreenLoader from "../../../components/ScreenLoader";
import CustomToast from "../../../components/CustomToast";
import { ApiServices } from "../../../api/ApiServices";
import { useSelector } from "react-redux";
import { getToken } from "../../../redux/reducers/authReducer";
import moment from "moment";

const { width } = Dimensions.get("window");

/* =========================
   CONFIG
========================= */

const START_HOUR = 0;
const END_HOUR = 24;
const HOUR_HEIGHT = sizeHelper.calHp(180);
const MIN_HEIGHT = sizeHelper.calHp(120); // ✅ ensures small events are visible

const timeToPosition = (time: any) => {
  const [hour, minute, second = 0] = time.split(":").map(Number);

  const totalMinutes = (hour - START_HOUR) * 60 + minute + second / 60;

  return (totalMinutes / 60) * HOUR_HEIGHT + sizeHelper.calHp(15);
};

// ✅ Calculate duration height
const getDurationHeight = (start: any, end: any) => {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  const duration = endMin - startMin;

  const height = (duration / 60) * HOUR_HEIGHT;

  return Math.max(height, MIN_HEIGHT); // ✅ fix for small durations
};

const getCurrentWeek = () => {
  const startOfWeek = moment().startOf("week"); // Sunday start

  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.clone().add(i, "days");

    days.push({
      label: day.format("ddd").toUpperCase(), // MON, TUE...
      date: day.date(), // 1, 2, 3...
      fullDate: day.format("YYYY-MM-DD"), // useful for API
      start: day.format("YYYY-MM-DD") + " 00:00:00",
      end: day.format("YYYY-MM-DD") + " 23:59:59",
      isToday: day.isSame(moment(), "day"),
    });
  }

  return days;
};

/* =========================
   MAIN COMPONENT
========================= */

export default function ScheduleScreen() {
  const totalHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
  const addScheduleSheetRef = useRef<any>(null);
  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const addScheduleSheetRefSnapPoints = useMemo(() => ["80%", "80%"], []);
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastColor, setToastColor] = useState(colors.red);
  const [isMessage, setIsMessage] = useState(false);
  const token = useSelector(getToken);
  const [appointments, setAppointments] = useState([]);
  const DAYS = getCurrentWeek();
  const scrollRef = useRef<any>(null);

  const [selectedDay, setSelectedDay] = useState(
    DAYS.find((day) => day.isToday) || DAYS[0],
  );
  console.log("DAYS", selectedDay);
  useEffect(() => {
    GetClientData();
  }, []);

  useEffect(() => {
    GetClientData();
  }, [selectedDay]);

  const GetClientData = () => {
    setLoading(true);
    let params = {
      token: token,
      dateStart: selectedDay?.start,
      dateEnd: selectedDay?.end,
    };

    try {
      ApiServices.GetAppointments(
        params,
        ({ isSuccess, response, status }: any) => {
          console.log("Appointment", response, status);
          setLoading(false);

          if (!isSuccess) {
            console.log("Client--------Api--------Error");
            return;
          }
          if (!response?.success) {
            setMessage(response?.message?.info || "Something went wrong");
            setToastColor(colors.red);
            return;
          }

          if (status == 200) {
            setAppointments(response?.message?.data);
            return;
          } else {
            setMessage(response?.message?.error);
            setToastColor(colors.red);
            setIsMessage(true);
          }
        },
      );
    } catch (error) {
      console.log("Client--------Api--------Error", error);
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

        {/* ================= DAYS HEADER ================= */}
        <View style={styles.daysContainer}>
          {DAYS.map((day, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: false,
                  });
                  setSelectedDay(day);
                }}
                key={index}
                style={[
                  styles.dayItem,
                  selectedDay?.label == day?.label && styles.selectedDay,
                ]}
              >
                <CustomText
                  text={day.label}
                  fontWeight="600"
                  fontFam={fonts.InterTight_Medium}
                  color={
                    selectedDay?.label == day?.label
                      ? colors.white
                      : colors.text_grey
                  }
                  // size={23}
                />

                <CustomText
                  text={day.date}
                  fontWeight="700"
                  fontFam={fonts.Inter_Bold}
                  color={
                    selectedDay?.label == day?.label
                      ? colors.white
                      : colors.text_grey
                  }
                  size={30}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.line} />

        {/* ================= TIMELINE ================= */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          contentContainerStyle={{ paddingBottom: sizeHelper.calHp(250) }}
        >
          <View style={[styles.timelineContainer, { height: totalHeight }]}>
            {/* Time Labels */}
            {Array.from(
              { length: END_HOUR - START_HOUR + 1 },
              (_, i) => START_HOUR + i,
            ).map((hour) => (
              <View
                key={hour}
                style={[
                  styles.hourRow,
                  { top: (hour - START_HOUR) * HOUR_HEIGHT },
                ]}
              >
                <Text style={styles.hourText}>
                  {hour.toString().padStart(2, "0")}:00
                </Text>
                <View style={styles.hourLine} />
              </View>
            ))}

            {/* Appointments */}
            {appointments?.map((item: any) => {
              const startTime = moment(
                item?.dateStart,
                "YYYY-MM-DD HH:mm:ss",
              ).format("HH:mm:ss");
              const endTime = moment(
                item?.dateEnd,
                "YYYY-MM-DD HH:mm:ss",
              ).format("HH:mm:ss");
              console.log("ckdncdkncd", startTime);
              const top = timeToPosition(startTime);
              const height = getDurationHeight(startTime, endTime);

              return (
                <View
                  key={item.id}
                  style={[
                    styles.appointmentCard,

                    {
                      top,
                      height,
                      backgroundColor: item?.workerColor,
                    },
                  ]}
                >
                  <View style={styles.cardContent}>
                    <View>
                      <CustomText
                        text={item?.clientName}
                        fontWeight="700"
                        fontFam={fonts.Inter_Bold}
                        color={colors.white}
                        size={30}
                      />

                      <CustomText
                        text={item?.serviceName}
                        fontWeight="600"
                        fontFam={fonts.InterTight_Medium}
                        color={colors.white}
                      />
                    </View>

                    <View style={styles.rightContent}>
                      <View style={styles.staffBadge}>
                        <CustomText
                          text={item?.workerName}
                          fontWeight="700"
                          fontFam={fonts.Inter_Bold}
                          color={colors.white}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.timeRow}>
                    <Image
                      style={{
                        width: sizeHelper.calWp(25),
                        height: sizeHelper.calWp(25),
                        tintColor: colors.white,
                      }}
                      source={icons.clock}
                    />

                    <CustomText
                      text={moment(
                        item?.dateStart,
                        "YYYY-MM-DD HH:mm:ss",
                      ).format("HH:mm")}
                      fontWeight="700"
                      fontFam={fonts.Inter_Bold}
                      color={colors.white}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ScreenLayout>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setIsSheetVisible(true);
          addScheduleSheetRef.current.present();
        }}
        style={{
          position: "absolute",
          right: sizeHelper.calWp(40),
          bottom: sizeHelper.calHp(120),
        }}
      >
        <View
          style={{
            height: sizeHelper.calHp(80),
            width: sizeHelper.calHp(80),
            borderRadius: sizeHelper.calWp(80),
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
              height: sizeHelper.calHp(30),
              width: sizeHelper.calHp(30),
              tintColor: colors.white,
            }}
          />
        </View>
        {/* </Shadow> */}
      </TouchableOpacity>

      <CustomBottomSheet
        snapPoints={addScheduleSheetRefSnapPoints}
        bottomSheetModalRef={addScheduleSheetRef}
      >
        <CreateAppointmentSheet
          SheetVisible={addScheduleSheetRef}
          setToastColor={setToastColor}
          setLoading={setLoading}
          isSheetVisible={isSheetVisible}
          loading={loading}
          setMessage={setMessage}
          setIsMessage={setIsMessage}
          onGetAppointments={(newService: any) => {}}
        />
      </CustomBottomSheet>

      {loading && <ScreenLoader />}
      <CustomToast
        isVisable={isMessage}
        setIsVisable={setIsMessage}
        message={message}
        backgroundColor={toastColor}
      />
    </>
  );
}

const styles = StyleSheet.create({
  /* DAYS */
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: sizeHelper.calWp(35),
    backgroundColor: colors.white,
  },

  dayItem: {
    alignItems: "center",
    paddingVertical: sizeHelper.calHp(15),
    width: "13%",
    borderRadius: sizeHelper.calWp(32),
    gap: sizeHelper.calHp(10),
  },

  selectedDay: {
    backgroundColor: "#6D28D9",
    elevation: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  /* TIMELINE */
  timelineContainer: {
    marginLeft: 70,
    marginRight: 15,
  },

  hourRow: {
    position: "absolute",
    left: -70,
    right: 0,
    height: HOUR_HEIGHT,
  },

  hourText: {
    position: "absolute",
    left: 10,
    top: 0,
    fontSize: 13,
    color: "#9CA3AF",
  },

  hourLine: {
    position: "absolute",
    top: sizeHelper.calHp(15),
    left: sizeHelper.calWp(90),
    right: 0,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  /* APPOINTMENT CARD */
  appointmentCard: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: sizeHelper.calWp(30),
    padding: sizeHelper.calWp(25),
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
  },

  rightContent: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  staffBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: sizeHelper.calWp(13),
    // paddingTop:sizeHelper.calHp(30)
  },
});
