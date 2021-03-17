import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigation";
import LoginScreen from "../screens/authentications/Login";
import { HomeScreen } from "../screens/home/Home";
import  RegisterScreen  from "../screens/authentications/Register";

const MainStack = createStackNavigator();

export function MainStackNavigation() {
  return (
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
      name="Register"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

// const RegisterStack = createStackNavigator();

// export function RegisterNavigation() {
//   return (
//     <RegisterStack.Navigator initialRouteName="Login">
//       <RegisterStack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <RegisterStack.Screen
//         name="Register"
//         component={RegisterScreen}
//         options={{ headerShown: false }}
//       />
//     </RegisterStack.Navigator>
//   );
// }


