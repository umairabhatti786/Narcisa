import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import sizeHelper, { screenWidth, screentHeight } from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import CustomText from "../Text";
import { appStyles } from "../../utils/GlobalStyles";
import { icons } from "../../assets/icons";
import { colors } from "../../utils/Themes";

const ServiceCard = ({ item, deleteService, onEdit }: any) => {
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              ...appStyles.row,
              gap: sizeHelper.calWp(20),
              width: "55%",
            }}
          >
            <View style={styles.circle}>
              <Image
                style={{
                  width: sizeHelper.calWp(40),
                  resizeMode: "contain",
                  height: sizeHelper.calWp(40),
                  tintColor: colors.primary,
                }}
                source={icons.service}
              />
            </View>
            <View style={{ gap: sizeHelper.calHp(10) }}>
              <CustomText
                text={item?.name}
                fontWeight="700"
                numberOfLines={2}
                fontFam={fonts.Inter_Bold}
                color={colors.black}
                size={27}
              />
              <View style={[appStyles.row, { gap: sizeHelper.calWp(15) }]}>
                <View style={[appStyles.row, { gap: sizeHelper.calWp(8) }]}>
                  <Image
                    style={{
                      width: sizeHelper.calWp(23),
                      height: sizeHelper.calWp(23),
                      resizeMode: "contain",
                      tintColor: colors.text_grey,
                    }}
                    source={icons.duration}
                  />
                  <CustomText
                    text={`${item?.duration} mint`}
                    fontWeight="700"
                    fontFam={fonts.Inter_Bold}
                    color={colors.text_grey}
                    size={20}
                  />
                </View>
                <View
                  style={[
                    appStyles.row,
                    { gap: sizeHelper.calWp(8), width: "60%" },
                  ]}
                >
                  <Image
                    style={{
                      width: sizeHelper.calWp(23),
                      height: sizeHelper.calWp(23),
                      resizeMode: "contain",
                      tintColor: colors.text_grey,
                    }}
                    source={icons.tags}
                  />
                  <CustomText
                    text={item?.groupName}
                    fontWeight="700"
                    numberOfLines={1}
                    fontFam={fonts.Inter_Bold}
                    color={colors.text_grey}
                    size={20}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{ width: "30%", alignItems: "flex-end", paddingLeft: 8 }}
          >
            <CustomText
              text={`$${item?.price}`}
              fontWeight="700"
              style={{ textAlign: "right" }}
              fontFam={fonts.Inter_Bold}
              color={colors.primary}
              size={27}
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
          <View style={[appStyles.rowjustify, { gap: sizeHelper.calWp(30) }]}>
            <TouchableOpacity
              onPress={onEdit}
              style={[
                appStyles.row,
                styles.buttons,
                { backgroundColor: colors.light_blue },
              ]}
            >
              <Image
                style={{
                  width: sizeHelper.calWp(30),
                  height: sizeHelper.calWp(30),
                  resizeMode: "contain",
                }}
                source={icons.edit}
              />
              <CustomText
                text={"Edit"}
                size={25}
                color={colors.primary}
                fontWeight="700"
                textAlign={"center"}
                fontFam={fonts.InterTight_Bold}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteService}
              style={[
                appStyles.row,
                styles.buttons,
                { backgroundColor: colors.rare },
              ]}
            >
              <Image
                style={{
                  width: sizeHelper.calWp(30),
                  height: sizeHelper.calWp(30),
                  resizeMode: "contain",
                }}
                source={icons.trash}
              />
              <CustomText
                text={"Delete"}
                size={25}
                color={colors.red}
                fontWeight="700"
                fontFam={fonts.InterTight_Bold}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
export default ServiceCard;

const styles = StyleSheet.create({
  circle: {
    width: sizeHelper.calWp(90),
    height: sizeHelper.calWp(90),
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
  buttons: {
    borderRadius: sizeHelper.calWp(26),
    gap: sizeHelper.calWp(15),
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical: sizeHelper.calWp(16),
  },
});
