import React, { useMemo } from "react";
import { Text, StyleProp, TextStyle ,useColorScheme} from "react-native";
import sizeHelper from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import { TextType } from "../../utils/Types";
import { colors } from "../../utils/Themes";


const CustomText = ({
  color,
  size,
  fontFam,
  text,
  style,
  lineHeight,
  numberOfLines,
  fontWeight,
  textDecorationLine,
  label,
  textTransform,
}: TextType) => {
  const memoizedStyle = useMemo(() => {
    const baseStyle = {
      color: color || colors?.text_grey,
      fontSize: sizeHelper.calHp(size || 20),
      fontWeight: fontWeight ||   "500",
      //       fontWeight: fontWeight ||  Platform.OS=="ios"?"400": "500",
      // fontFamily: fontFam || Platform.OS=="ios"?  (current_lag === "ar" ? fonts.Tajawal_Light : fonts.Oswald_Light): (current_lag === "ar" ? fonts.Tajawal_Regular : fonts.Oswald_Regular),
      fontFamily: fontFam  ||fonts.Inter_Regular,
      textTransform,
      textDecorationLine,
      ...(lineHeight ? { lineHeight } : {}),
    };

    return [baseStyle, style] as StyleProp<TextStyle>;
  }, [
    color,
    size,
    fontFam,
    fontWeight,
    textTransform,
    textDecorationLine,
    lineHeight,
    style,
  ]);

  return (
    <Text numberOfLines={numberOfLines} allowFontScaling={false} style={memoizedStyle}>
      {text}
      {label}
    </Text>
  );
};

export default React.memo(CustomText);
