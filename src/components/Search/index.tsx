import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import sizeHelper from '../../utils/Helpers';
import {fonts} from '../../utils/Themes/fonts';
import { colors } from '../../utils/Themes';
import { icons } from '../../assets/icons';

type Props = {
  placeholder?: string;
  navigation?: any;
  value?: any;
  onPressClose?: any;
  backgroundColor?: string;
  width?: any;
  onChangeText?: (text: any) => void;
  onFocus?: () => void;
  onFilter?: () => void;
  onSubmitEditing?: () => void;
  isfilter?: any;
  isAdd?: any;
  onAdd?: any;
  ContainerStyle?: StyleProp<ViewStyle>;
  inputRef?: any;
};

const CustomSearch = ({
  placeholder,
  onChangeText,
  value,
  backgroundColor,
  width,
  onFocus,
  onSubmitEditing,
  ContainerStyle,
  inputRef,
}: Props) => {
  return (
    <>
      <View
        style={[
          {
            ...styles.searchContainer,
            width: width || '100%',
            backgroundColor: backgroundColor || "#F3F0FF30",
            height: sizeHelper.calHp(85),
            gap: sizeHelper.calWp(20),
            borderWidth: 1,
            borderColor: colors.border,
          },
          ContainerStyle as StyleProp<ViewStyle>,
        ]}>
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{
            width: sizeHelper.calWp(43),
            height:sizeHelper.calWp(43),
          }}
        />
        <TextInput
          allowFontScaling={false} // Disable font scaling
          style={{...styles.inputContainer, color: colors.black}}
          placeholder={placeholder}
          value={value}
          ref={inputRef}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          onFocus={onFocus}
          placeholderTextColor={colors.black+"50"}
        />
      </View>
    </>
  );
};
export default CustomSearch;

const styles = StyleSheet.create({
  img: {width: 23, height: 23},

  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(25),
    borderRadius: sizeHelper.calWp(25),
  },
  inputContainer: {
    height: '100%',
    flex: 1,
    fontSize: sizeHelper.calHp(25),
    fontFamily: fonts.Inter_Regular,
    padding: 0,
    fontWeight:"500"
    // backgroundColor: 'red',
  },
});
