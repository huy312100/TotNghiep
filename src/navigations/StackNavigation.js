import "react-native-gesture-handler";
import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigation";
import LoginScreen from "../screens/authentications/Login";
import RegisterScreen  from "../screens/authentications/Register";
import {HomeScreen} from "../screens/home/Home";
import {CalendarScreen} from "../screens/home/Calendar";


// import ProfileScreen from "../screens/profile/Profile";



const Stack = createStackNavigator();

export function AuthenStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export function HomeStackNavigation({navigation}) { 
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "Lịch hoạt động" }}
      />

    </Stack.Navigator>
  )
}



function handleBottomTab({navigation}){
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
}





