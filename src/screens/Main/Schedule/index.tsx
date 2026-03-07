import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../utils/Themes";
import sizeHelper from "../../../utils/Helpers";
import ScreenLayout from "../../../components/ScreenLayout";
import HomeHeader from "../../../components/HomeHeader";
import CustomText from "../../../components/Text";
import { fonts } from "../../../utils/Themes/fonts";
import { icons } from "../../../assets/icons";
import { Shadow } from "react-native-shadow-2";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
import { appStyles } from "../../../utils/GlobalStyles";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

/* =========================
   CONFIG
========================= */

const START_HOUR = 8;
const END_HOUR = 16;
const HOUR_HEIGHT = sizeHelper.calHp(140);

/* =========================
   MOCK DATA
========================= */

const DAYS = [
  { label: "THU", date: 5 },
  { label: "FRI", date: 6 },
  { label: "SAT", date: 7 },
  { label: "SUN", date: 8 },
  { label: "MON", date: 9 },
  { label: "TUE", date: 10 },
  { label: "WED", date: 11 },
];

const APPOINTMENTS = [
  {
    id: 1,
    client: "Mary P.",
    service: "Blowout",
    start: "09:00",
    end: "10:00",
    colors: "#AD46FF",
    staff: "ANNA",
  },
  {
    id: 2,
    client: "Nicholas K.",
    service: "Men's Haircut",
    start: "10:30",
    end: "12:00",
    colors: "#2B7FFF",
    staff: "MARK",
  },
  {
    id: 3,
    client: "Helen S.",
    service: "Manicure",
    start: "13:00",
    end: "14:00",
    colors: "#FF2056",
    staff: "JANE",
  },
];

/* =========================
   HELPERS
========================= */

const timeToPosition = (time: any) => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = (hour - START_HOUR) * 60 + minute;
  return (totalMinutes / 60) * HOUR_HEIGHT;
};

const getDurationHeight = (start, end) => {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;

  const duration = endMin - startMin;

  return (duration / 60) * HOUR_HEIGHT;
};

/* =========================
   MAIN COMPONENT
========================= */

export default function ScheduleScreen() {
  const totalHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
  const addScheduleSheetRef = useRef<any>(null);
  const addScheduleSheetRefSnapPoints = useMemo(() => ["80%", "80%"], []);
  const insets = useSafeAreaInsets();
  const [selected,setSelected]=useState(0)

  return (
    <>
      <ScreenLayout  style={{ paddingHorizontal: -1, gap: 0 }}>
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
              onPress={()=>setSelected(index)}
                key={index}
                style={[styles.dayItem, selected==index && styles.selectedDay]}
              >
                <CustomText
                  text={day.label}
                  fontWeight="600"
                  fontFam={fonts.InterTight_Medium}
                  color={selected==index  ? colors.white : colors.text_grey}
                  // size={23}
                />

                <CustomText
                  text={day.date}
                  fontWeight="700"
                  fontFam={fonts.Inter_Bold}
                  color={selected==index  ? colors.white : colors.text_grey}
                  size={30}
                />
                {/* <Text style={[styles.dayLabel, selected && { color: "#fff" }]}>
                {day.label}
              </Text> */}
                {/* <Text style={[styles.dayDate, selected && { color: "#fff" }]}>
                {day.date}
              </Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.line} />

        {/* ================= TIMELINE ================= */}
        <ScrollView showsVerticalScrollIndicator={false}>
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
            {APPOINTMENTS.map((item) => {
              const top = timeToPosition(item.start);
              const height = getDurationHeight(item.start, item.end);

              return (
                <View
                  key={item.id}
                  style={[
                    styles.appointmentCard,

                    {
                      top,
                      height,
                      backgroundColor: item?.colors,
                    },
                  ]}
                >
                  <View style={styles.cardContent}>
                    <View>
                      <CustomText
                        text={item.client}
                        fontWeight="700"
                        fontFam={fonts.Inter_Bold}
                        color={colors.white}
                        size={30}
                      />

                      <CustomText
                        text={item.service}
                        fontWeight="600"
                        fontFam={fonts.InterTight_Medium}
                        color={colors.white}
                        // size={25}
                      />
                      {/* <Text style={styles.clientText}>{item.client}</Text>
                    <Text style={styles.serviceText}>{item.service}</Text> */}
                    </View>

                    <View style={styles.rightContent}>
                      <View style={styles.staffBadge}>
                        <CustomText
                          text={item.staff}
                          fontWeight="700"
                          fontFam={fonts.Inter_Bold}
                          color={colors.white}
                          // size={30}
                        />
                        {/* <Text style={styles.staffText}>{item.staff}</Text> */}
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
                    {/* <Icon
                        name="clock"
                        size={14}
                        color="#fff"
                      /> */}
                    <CustomText
                      text={item.start}
                      fontWeight="700"
                      fontFam={fonts.Inter_Bold}
                      color={colors.white}
                      // size={30}
                    />
                    {/* <Text style={styles.timeText}> {item.start}</Text> */}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </ScreenLayout>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => addScheduleSheetRef.current.present()}
        style={{
          position: "absolute",
          right: sizeHelper.calWp(40),

          bottom: sizeHelper.calHp(120),
          // backgroundColor:'red'
        }}
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
        <View
          style={{
            paddingHorizontal: sizeHelper.calWp(35),
            gap: sizeHelper.calHp(30),

            paddingBottom:   Platform.OS == "ios"
                          ? sizeHelper.calHp(30)
                          : insets.bottom <= 16
                          ? (insets.bottom - insets.bottom)+sizeHelper.calHp(30)
                          : insets.bottom
            
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
           <CustomButton
           height={64}
            //   textColor={theme.colors.white}
              onPress={() => {
                addScheduleSheetRef.current.dismiss()
              
              }}
              bgColor={colors.primary+"20"}
              borderWidth={1}
              borderColor={colors.primary+"10"}
              paddingHorizontal={12}
         
          >
            <View style={{ ...appStyles.row, gap: sizeHelper.calWp(10) }}>
            

              <Image
                source={icons.clock}
                style={{
                  width: sizeHelper.calWp(28),
                  height: sizeHelper.calWp(28),
                  // marginTop:sizeHelper.calHp(8),
                  tintColor:colors.primary
                }}
                resizeMode={"contain"}
              />
                <CustomText
                text={"10:46"}
                color={colors.primary}
                size={27}
                fontWeight={"700"}
                fontFam={fonts.Inter_Bold}
              />
            </View>
          </CustomButton>
          </View>

          <CustomInput
            leftSource={icons.client}
            placeholder=""
            label="Client"
            backgroundColor={colors?.background}
          />

          <CustomInput
            leftSource={icons.service}
            placeholder=""
            label="Service"
            backgroundColor={colors?.background}
          />
          <View style={appStyles.rowjustify}>
            <CustomButton
              text="Cancel"
              bgColor={colors.light_blue}
              textColor={colors.text_grey}
               onPress={()=>addScheduleSheetRef.current.dismiss()}
              width={"48%"}
            />

            <CustomButton
              text="Create"
               onPress={()=>addScheduleSheetRef.current.dismiss()}
              width={"48%"}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: 50,
  },

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

  dayLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
  },

  dayDate: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6B7280",
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
    top: 10,
    left: 70,
    right: 0,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  /* APPOINTMENT CARD */
  appointmentCard: {
    position: "absolute",
    left: 0,
    right: 0,
    borderRadius: sizeHelper.calWp(40),
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

  clientText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  serviceText: {
    color: "#fff",
    opacity: 0.9,
    marginTop: 4,
    fontSize: 14,
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

  staffText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: sizeHelper.calWp(13),
    // paddingTop:sizeHelper.calHp(30)
  },

  timeText: {
    color: "#fff",
    fontSize: 13,
  },
});
