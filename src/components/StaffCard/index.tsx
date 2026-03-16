import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import sizeHelper, { screenWidth, screentHeight } from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import CustomText from "../Text";
import { appStyles } from "../../utils/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../assets/images";
import { icons } from "../../assets/icons";
import { colors } from "../../utils/Themes";

const StaffCard = ({ item, isAway }: any) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          padding: sizeHelper.calWp(34),
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: sizeHelper.calWp(30),
          gap: sizeHelper.calHp(20),
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(30) }}>
            <View style={styles.circle}>
              <Image
                style={{
                  width: sizeHelper.calWp(50),
                  resizeMode: "contain",
                  height: sizeHelper.calWp(50),
                  tintColor: colors.primary,
                }}
                source={icons.client}
              />
            </View>
            {/* <View style={styles.onlineDot} /> */}
            <View>
              <CustomText
                text={`${item.name} ${item.lastName}`}
                fontWeight="700"
                fontFam={fonts.Inter_Bold}
                color={colors.black}
                size={28}
              />
{/* 
              <CustomText
                text={item?.profession}
                fontWeight="600"
                fontFam={fonts.Inter_Medium}
                color={colors.text_grey}
                size={25}
              /> */}
              {/* <View style={[appStyles.row, { gap: sizeHelper.calWp(8) }]}>
                <Image
                  style={{
                    width: sizeHelper.calWp(20),
                    height: sizeHelper.calWp(20),
                    resizeMode: "contain",
                  }}
                  source={icons.star}
                />
                <CustomText
                  text={item?.review}
                  fontWeight="700"
                  fontFam={fonts.Inter_Bold}
                  color={colors.black}
                  size={23}
                />
              </View> */}
            </View>
          </View>

          <View style={styles.calendarContainer}>
            <Image
              style={{
                width: sizeHelper.calWp(34),
                resizeMode: "contain",
                height: sizeHelper.calWp(34),
                tintColor: colors.primary,
              }}
              source={icons.calendar}
            />
          </View>
        </View>
        <View style={styles.line} />
        <View style={appStyles.rowjustify}>
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(25) }}>
            <CustomText
              text={item?.availity}
              fontWeight="600"
              fontFam={fonts.Inter_Medium}
              color={colors.text_grey}
              size={25}
            />
          </View>
          <View>
            <CustomText
              text={item?.time}
              style={{ textAlign: "right" }}
              fontWeight="600"
              fontFam={fonts.Inter_Bold}
              color={colors.primary}
              size={20}
            />
          </View>
        </View>
      </View>
      {isAway && (
        <View style={styles.awayBadge}>
          <CustomText
            text={"AWAY"}
            size={18}
            color={colors.primary}
            fontWeight="900"
            fontFam={fonts.InterTight_Bold}
          />
        </View>
      )}
    </>
  );
};
export default StaffCard;

const styles = StyleSheet.create({
  circle: {
    width: sizeHelper.calWp(100),
    height: sizeHelper.calWp(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_blue,
    borderRadius: sizeHelper.calWp(999),
  },
  calendarContainer: {
    width: sizeHelper.calWp(75),
    height: sizeHelper.calWp(75),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.light_blue,
    borderRadius: sizeHelper.calWp(30),
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
  },
  onlineDot: {
    backgroundColor: colors.green,
    width: sizeHelper.calWp(28),
    height: sizeHelper.calWp(28),
    borderRadius: 999,
    position: "absolute",
    borderWidth: 2,
    borderColor: colors.white,
    bottom: sizeHelper.calHp(12),
    left: sizeHelper.calHp(64),
  },
  awayBadge: {
    position: "absolute",
    top: sizeHelper.calHp(0),
    right: sizeHelper.calWp(0),
    backgroundColor: colors.light_blue,
    alignItems: "center",
    justifyContent: "center",
    width: sizeHelper.calWp(100),
    height: sizeHelper.calWp(50),
    borderTopRightRadius: sizeHelper.calWp(30),
    borderBottomLeftRadius: sizeHelper.calWp(50),
  },
});
