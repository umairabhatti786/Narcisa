import React, { useMemo } from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import CustomText from "../Text";
import { ButtonProps } from "../../utils/Types";
import sizeHelper from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import { colors } from "../../utils/Themes";
const CustomButton = ({
  text,
  onPress,
  width,
  height,
  size,
  fontFam,
  borderRadius,
  style,
  bgColor,
  textColor,
  borderColor,
  disable = false,
  borderWidth,
  paddingHorizontal,
  fontWeight,
  children,
}: ButtonProps) => {
  const memoizedStyle = useMemo(() => {
    const baseStyle: ViewStyle = {
      width: width,
      height: sizeHelper.calHp(height || 85),
      backgroundColor: bgColor || colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: sizeHelper.calHp(borderRadius || 25),
      borderWidth: borderWidth || 0,
      borderColor: borderColor,
      paddingHorizontal: paddingHorizontal,
      flexDirection: "row",
      gap: sizeHelper.calWp(15),
    };

    return [baseStyle, style] as StyleProp<ViewStyle>;
  }, [
    width,
    height,
    bgColor,
    borderRadius,
    borderWidth,
    borderColor,
    paddingHorizontal,
    style,
  ]);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      activeOpacity={0.5}
      style={memoizedStyle}
    >
      {children}
      {text && (
        <CustomText
          text={text}
          color={textColor || colors.white}
          size={size || 27}
          fontWeight={fontWeight || "700"}
          fontFam={fontFam || fonts.Inter_Bold}
        />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton);
