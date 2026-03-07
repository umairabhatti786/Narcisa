import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoryScreen from "../../screens/Main/History";
import Profile from "../../screens/Main/Profile";
import EditProfile from "../../screens/Main/EditProfile";
import HistoryDetailScreen from "../../screens/Main/HistoryDetail";
import MyCreditsScreen from "../../screens/Main/MyCredits";
import BuyMoreCreditsScreen from "../../screens/Main/BuyMoreCredits";

const Stack = createNativeStackNavigator();
const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="HistoryDetailScreen"
        component={HistoryDetailScreen}
      />
      <Stack.Screen name="MyCreditsScreen" component={MyCreditsScreen} />
      <Stack.Screen
        name="BuyMoreCreditsScreen"
        component={BuyMoreCreditsScreen}
      />
    </Stack.Navigator>
  );
};
export default HistoryStack;
