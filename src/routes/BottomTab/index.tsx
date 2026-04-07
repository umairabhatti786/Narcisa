import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, StyleSheet, View } from "react-native";
import CustomText from "../../components/Text";
import sizeHelper from "../../utils/Helpers";
import { fonts } from "../../utils/Themes/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../utils/Themes";
import ClientsScreen from "../../screens/Main/Clients";
import { icons } from "../../assets/icons";
import ServicesScreen from "../../screens/Main/Services";
import ScheduleScreen from "../../screens/Main/Schedule";
import StaffScreen from "../../screens/Main/Staff";
import MenuScreen from "../../screens/Main/Menu";
const BottomTab = ({ navigation }: any) => {
  const Bottom = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  const TabItem = ({ focused, title, img }: any) => {
    return (
      <View style={[style.itemStyle]}>
        <Image
          resizeMode="contain"
          source={img}
          style={{
            ...style.img,
            tintColor: focused ? colors.primary : colors.text_grey,
          }}
        />
        <CustomText
          text={title}
          fontFam={fonts.Inter_Bold}
          fontWeight="700"
          size={18}
          color={focused ? colors.primary : colors.text_grey}
        />
      </View>
    );
  };

  return (
    <Bottom.Navigator
      initialRouteName="ClientsScreen"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: false,
        tabBarShowLabel: false,
        animationEnabled: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({ current, next, layouts }: any) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          justifyContent: "center",
          alignItems: "center",
          height: sizeHelper.calHp(110),
          borderTopWidth: -1,
          bottom:
            Platform.OS == "ios"
              ? 0
              : insets.bottom <= 16
              ? insets.bottom - insets.bottom
              : insets.bottom,

          paddingTop: sizeHelper.calHp(Platform.OS == "ios" ? 20 : 30),
        },

        headerShown: false,
      })}
    >
      {/* Home Tab */}
      <Bottom.Screen
        name="ClientsScreen"
        component={ClientsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem
                title={"CLIENTS"}
                img={icons.clients}
                focused={focused}
              />
            );
          },
        }}
      />
      {/* Calendar Tab */}
      <Bottom.Screen
        name="ServicesScreen"
        component={ServicesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem
                title={"SERVICES"}
                img={icons.service}
                focused={focused}
              />
            );
          },
        }}
      />
      {/* AddEvent Tab */}

      <Bottom.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  position: "absolute",
                  top: sizeHelper.calHp(Platform.OS == "ios" ? -50 : -80),
                  gap: sizeHelper.calHp(15),
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: sizeHelper.calHp(95),
                    width: sizeHelper.calHp(95),
                    borderRadius: sizeHelper.calWp(95),
                    backgroundColor: colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 8,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 1,
                    shadowRadius: 5,
                  }}
                 
                >
                  <Image
                    resizeMode="contain"
                    source={icons.schedule}
                    style={{
                      height: sizeHelper.calHp(40),
                      width: sizeHelper.calHp(40),
                    }}
                  />
                </View>

                <CustomText
                  text={"Scheduler"}
                  fontFam={fonts.Inter_Bold}
                  fontWeight="700"
                  size={18}
                  color={focused ? colors.primary : colors.text_grey}
                />
              </View>
            );
          },
        }}
      />
      {/* Contacts Tab */}
      <Bottom.Screen
        name="StaffScreen"
        component={StaffScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem title={"STAFF"} img={icons.staff} focused={focused} />
            );
          },
        }}
      />
      {/* profile Tab */}
      <Bottom.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabItem title={"MORE"} img={icons.menu} focused={focused} />
            );
          },
        }}
      />
    </Bottom.Navigator>
  );
};
export default BottomTab;

const style = StyleSheet.create({
  itemStyle: {
    width: sizeHelper.calWp(130),
    backgroundColor: "transparent", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: sizeHelper.calHp(7),
  },
  img: {
    height: sizeHelper.calHp(33),
    width: sizeHelper.calHp(33),
  },
  tabBarStyle: {},
});
