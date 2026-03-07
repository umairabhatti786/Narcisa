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

const HomeHeader = ({ title }: any) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          ...appStyles.rowjustify,
        }}
      >
        <Image
          style={{
            width: "30%",
            resizeMode: "contain",
            height: sizeHelper.calWp(80),
          }}
          source={images.logo}
        />

        <View style={{ ...appStyles.row, gap: sizeHelper.calWp(40) }}>
          <TouchableOpacity>
            <Image
              style={{
                width: sizeHelper.calWp(40),
                resizeMode: "contain",
                height: sizeHelper.calWp(40),
              }}
              source={icons.notification}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.circle}>
            <CustomText
              text={"A"}
              fontWeight="700"
              fontFam={fonts.Inter_Bold}
              color={colors.primary}
              size={27}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={{flex: 1, alignItems: 'center'}}>
          <CustomText
            text={title}
            fontWeight="600"
            fontFam={fonts.Poppins_SemiBold}
            color={theme.colors.secondry}
            size={25}
          />
        </View> */}
        {/* <View style={{width: 60}} /> */}
      </View>
    </>
  );
};
export default HomeHeader;

const styles = StyleSheet.create({
  circle: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calWp(80),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primary + "20",
    backgroundColor: colors.primary + "10",
    borderRadius: sizeHelper.calWp(80),
  },
});
