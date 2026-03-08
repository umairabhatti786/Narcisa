import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import CustomText from "../Text";
import { InputProps } from "../../utils/Types";
import { fonts } from "../../utils/Themes/fonts";
import sizeHelper from "../../utils/Helpers";
import { useTheme } from "@react-navigation/native";
import { colors } from "../../utils/Themes";

const CustomInput = ({
  placeholder,
  keyboard,
  secureTextEntry,
  fontWeight,
  multiline,
  fontSize,
  value,
  onChangeText,
  onBlur,
  error,
  color,
  maxLength,
  placeholderTextColor,
  borderRadius,
  backgroundColor,
  textAlign,
  textAlignVertical,
  paddingTop,
  onSubmitEditing,
  label,
  borderColor,
  fontFamily,
  width,
  rightSource,
  height,
  onRightSource,
  leftSource,
  rightSourceSize,
  editable,
  tintColor,
  textTransform,
  lablelfontWeight
}: InputProps) => {

  
  return (
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
            fontWeight={lablelfontWeight || "700"}
            size={21}
            color={colors.text_grey}
            fontFam={fonts.Inter_Bold}
            style={{
            textTransform:textTransform
            }}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent:  "space-between",
          paddingHorizontal: sizeHelper.calWp(20),
          height: sizeHelper.calHp(height || 85),
          alignItems: "center",
          borderRadius: borderRadius || sizeHelper.calWp(25),
          backgroundColor: backgroundColor || colors.white,
          borderWidth:1,
          borderColor: borderColor || colors.border,
          gap:sizeHelper.calWp(20)
        }}
      >
        {leftSource && (
          <Image
            source={leftSource}
            style={{
              width: sizeHelper.calWp(35),
              height: sizeHelper.calWp(35),
              tintColor:tintColor||  colors.black
            }}
            resizeMode={"contain"}
          />
        )}

        <TextInput
          value={value}
          editable={editable}
          onSubmitEditing={onSubmitEditing}
          allowFontScaling={false} // Disable font scaling
          style={{
            fontSize: sizeHelper.calHp(fontSize || 22),
            width: rightSource ? "81%" : "98%",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            textAlign:  textAlign,
            textAlignVertical: textAlignVertical,
            paddingTop: paddingTop || 0,
            paddingVertical: 0, // Adjust as needed for centering
            fontFamily: fontFamily ||fonts.Inter_Regular,
            fontWeight: fontWeight || "500",
            color: color || colors.black,
            // paddingRight: sizeHelper.calWp(rightSource ? 10 : 0),
          }}
          placeholder={placeholder}
          multiline={multiline}
          placeholderTextColor={placeholderTextColor || colors.text_grey}
          keyboardType={keyboard}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry || false}
          onChangeText={onChangeText}
          onBlur={onBlur}
          autoCapitalize="none"
        />
        {rightSource && (
          <TouchableOpacity
            onPress={onRightSource}
            disabled={!onRightSource}
            activeOpacity={0.3}
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100%",
              width: sizeHelper.calWp(50),
              paddingLeft:sizeHelper.calWp(5)
            }}
          >
            <Image
              source={rightSource}
              style={{
                width: sizeHelper.calWp(rightSourceSize || 40),
                height: sizeHelper.calWp(rightSourceSize || 40),
                tintColor: colors?.text_grey
              }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* {error && (
        <View
          style={{
            marginTop: sizeHelper.calHp(10),
            alignItems:"flex-end"
          }}>
          <CustomText size={20} text={error} color={theme.colors.red} />
        </View>
      )} */}
    </View>
  );
};
export default CustomInput;
