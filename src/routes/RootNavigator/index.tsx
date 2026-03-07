import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "../AuthStack";
import AppStack from "../AppStack";

const RootNavigator = () => {
  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}

      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="AppStack" component={AppStack} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
