import { StyleSheet } from "react-native";
import sizeHelper from "../Helpers";
import { colors } from "../Themes";
export const appStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowjustify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo_img: {
    width: sizeHelper.calWp(120),
    height: sizeHelper.calWp(120),
    alignSelf: "center",
  },

  back_container: {
    height: sizeHelper.calWp(40),
    width: sizeHelper.calWp(40),
  },
  back_icon: {
    height: sizeHelper.calWp(25),
    width: sizeHelper.calWp(25),
  },
  inner_container: {
    flex: 1,
    gap: sizeHelper.calHp(50),
  },
   standard_circle: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calWp(80),
    borderRadius: sizeHelper.calWp(80),
    alignItems: "center",
    justifyContent: "center",
  },

    circle: {
    width: sizeHelper.calWp(80),
    height: sizeHelper.calWp(80),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeHelper.calWp(80),
    backgroundColor:colors?.light_blue
  },
});
