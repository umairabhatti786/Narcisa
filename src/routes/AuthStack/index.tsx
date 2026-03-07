import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/Auth/Login";
import SplashScreen from "../../screens/Auth/Splash";


const Stack = createNativeStackNavigator<any>();
const AuthStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />

        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

        {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name="SetupPasswordScreen"
          component={SetupPasswordScreen}
        /> */}
      </Stack.Navigator>
    </>
  );
};
export default AuthStack;
