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

const ClientCard = ({ item, onEdit,deleteClient,onCall,onMail }: any) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          padding: sizeHelper.calWp(30),
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: sizeHelper.calWp(30),
          gap: sizeHelper.calHp(20),
        elevation: 2,
          shadowColor: "#00000090",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(30) }}>
            <TouchableOpacity style={styles.circle}>
              <CustomText
                text={`${(item?.name).charAt(0).toUpperCase()} ${(item?.lastName).charAt(0).toUpperCase()}`}
                fontWeight="700"
                fontFam={fonts.Inter_Bold}
                color={colors.primary}
                size={26}
              />
            </TouchableOpacity>

            <View>
              <CustomText
                text={`${item?.name} ${item?.lastName}`}
                fontWeight="700"
                fontFam={fonts.Inter_Bold}
                color={colors.black}
                size={30}
              />

              <CustomText
                text={item?.email}
                fontWeight="600"
                fontFam={fonts.Inter_Medium}
                color={colors.text_grey}
                size={24}
              />
            </View>
          </View>

          <TouchableOpacity>
            <Image
              style={{
                width: sizeHelper.calWp(40),
                resizeMode: "contain",
                height: sizeHelper.calWp(40),
              }}
              source={icons.actions}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={appStyles.rowjustify}>
          <View style={{ ...appStyles.row, gap: sizeHelper.calWp(25) }}>
            <TouchableOpacity 
            onPress={onCall}
            style={styles.actionsBox}>
              <Image
                style={{
                  width: sizeHelper.calWp(35),
                  resizeMode: "contain",
                  height: sizeHelper.calWp(35),
                }}
                source={icons.call}
              />
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={onMail}
            style={styles.actionsBox}>
              <Image style={styles.actionIcon} source={icons.message} />
            </TouchableOpacity>

            <TouchableOpacity onPress={onEdit} style={styles.actionsBox}>
              <Image style={styles.actionIcon} source={icons.edit} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={deleteClient}
              style={{ ...styles.actionsBox, backgroundColor: "#FFF1F2" }}
            >
              <Image style={styles.actionIcon} source={icons.trash} />
            </TouchableOpacity>
          </View>

         
        </View>
      </View>
    </>
  );
};
export default ClientCard;

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
  actionIcon: {
    width: sizeHelper.calWp(32),
    resizeMode: "contain",
    height: sizeHelper.calWp(32),
  },

  actionsBox: {
    width: sizeHelper.calWp(70),
    height: sizeHelper.calWp(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F0FF",
    borderRadius: sizeHelper.calWp(70),
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: colors.border,
  },
});
