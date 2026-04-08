import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import CustomText from "../Text";
import sizeHelper from "../../utils/Helpers";
import { useState } from "react";
import { appStyles } from "../../utils/GlobalStyles";
import { fonts } from "../../utils/Themes/fonts";
import { colors } from "../../utils/Themes";
import { icons } from "../../assets/icons";
import DatePicker from "react-native-date-picker";

const CustomDateTimePicker = ({
  height,
  width,
  borderRadius,
  backgroundColor,
  onRightSource,
  placeholder,
  value,
  top,
  label,
  onActions,
  leftSource,
  tintColor,
  error,
  setIsPickerVisible,
  isPickerVisible,
  onConfirmed,
  mode
}: any) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <View
        style={{
          width: width || "100%",
        }}
      >
        {label && (
          <View
            style={{
              marginBottom: sizeHelper.calHp(10),
            }}
          >
            <CustomText
              text={label}
              fontWeight={"700"}
              size={21}
              color={colors.text_grey}
              fontFam={fonts.Inter_Bold}
            />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsPickerVisible(!isPickerVisible)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: sizeHelper.calWp(20),
            height: sizeHelper.calHp(height || 85),
            alignItems: "center",
            borderWidth: 1,
            borderRadius: borderRadius || sizeHelper.calWp(25),
            borderColor: colors.border,

            gap: sizeHelper.calWp(10),
            backgroundColor: backgroundColor || colors.background,
          }}
        >
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(20) }}>
            {leftSource && (
              <Image
                source={leftSource}
                style={{
                  width: sizeHelper.calWp(35),
                  height: sizeHelper.calWp(35),
                  tintColor: tintColor || colors.black,
                }}
                resizeMode={"contain"}
              />
            )}
            {value ? (
              <View style={{ ...appStyles.row }}>
                <CustomText text={value} color={colors.black} size={24} />
              </View>
            ) : (
              <CustomText
                text={placeholder}
                color={colors.text_grey}
                size={22}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={() => setIsPickerVisible(!isPickerVisible)}
            activeOpacity={0.3}
          >
            <Image
              source={isPickerVisible ? icons.drop_up : icons?.down_arrow}
              style={{
                width: sizeHelper.calWp(27),
                height: sizeHelper.calWp(27),
                tintColor: colors.primary,
              }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {error && (
          <View
            style={{
              marginTop: sizeHelper.calHp(10),
            }}
          >
            <CustomText size={20} text={error} color={colors.red} />
          </View>
        )}
      </View>

      <DatePicker
        modal={true}
        mode={mode ||"date"}
        title={"cdcdc"}
        theme="dark"
        confirmText="Done"
        cancelText="Cancel"
        onCancel={() => setIsPickerVisible(false)} // Reset state on dismiss
        style={{
          width: 300, // Adjust the width as per your requirement
          height: 180,
          alignSelf: "center",
        }}
        open={isPickerVisible}
        date={date} // Ensure it always shows a valid date
        onDateChange={(date) => {
        }}
        onConfirm={(selectedDate) => {
          setIsPickerVisible(false);
          setDate(selectedDate); // update state
          onConfirmed?.(selectedDate);
        }}
      />
    </>
  );
};
export default CustomDateTimePicker;
