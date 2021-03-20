import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigation";
import LoginScreen from "../screens/authentications/Login";
import RegisterScreen  from "../screens/authentications/Register";
// import ProfileScreen from "../screens/profile/Profile";
import { MaterialCommunityIcons } from '@expo/vector-icons';



const AuthenStack = createStackNavigator();

export function AuthenStackNavigation() {
  return (
    <AuthenStack.Navigator initialRouteName="Login">
      <AuthenStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthenStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <AuthenStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
      />
    </AuthenStack.Navigator>
  );
};

// const Profile_Student_Stack = createStackNavigator();
// export function Profile_Student_StackNavigations(){
//   return(
//     <Profile_Student_Stack.Navigator>
//       <Profile_Student_Stack.Screen
//         name="Profile_Student"
//         component={ProfileScreen}
//         options={{
//           headerRight: ()=>(
//             <MaterialCommunityIcons.Button 
//               name="account-edit"/>
//           ),
//         }}/>


//     </Profile_Student_Stack.Navigator>
//   );
// }



