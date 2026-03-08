import {
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

//  Custom text props
export type TextType = {
  color?: string;
  size?: number;
  fontFam?: string;
  text?: any;
  style?: StyleProp<TextStyle>;
  lineHeight?: number;
  numberOfLines?: number;
  fontWeight?: string;
  textDecorationLine?: string;
  label?: any;
  textTransform?: any;
  textAlign?: any;
};
//  Custom button props

export type ButtonProps = {
  text?: string;
  onPress?: () => void;
  width?: any;
  height?: number;
  size?: number;
  fontFam?: any;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>; // Style for the screen container
  bgColor?: any;
  textColor?: any;
  borderColor?: any;
  disable?: boolean;
  borderWidth?: number;
  paddingHorizontal?: number;
  isLoading?: any;
  fontWeight?: string;
  colors?: any;
  children?: any;
};
//  Custom input props

export type InputProps = {
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboard?: any;
  value?: any;
  onChangeText?: any;
  onBlur?: any;
  editable?: boolean;
  color?: string;
  maxLength?: number;
  fontWeight?: any;
  multiline?: boolean;
  height?: any;
  width?: any;
  fontSize?: any;
  placeholderTextColor?: any;
  borderWidth?: any;
  borderRadius?: any;
  backgroundColor?: any;
  borderColor?: any;
  textAlign?: any;
  textAlignVertical?: any;
  paddingTop?: any;
  onSubmitEditing?: () => void;
  label?: string;
  onFocus?: any;
  disable?: boolean;
  fontFamily?: any;
  rightSource?: any
  onRightSource?: any
  leftSource?: any
  rightSourceSize?: any
  tintColor?: any
  textTransform?: any
  lablelfontWeight?: any
};


