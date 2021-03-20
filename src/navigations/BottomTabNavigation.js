import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {HomeScreen} from '../screens/home/Home';
import {ProfileScreen} from '../screens/profile/Profile';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#6666FF',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Forum"
        component={HomeScreen}
        options={{ 
            tabBarLabel:'Diễn đàn',
            tabBarIcon:({ color,size }) => (
                <MaterialCommunityIcons name="forum" color={color} size={size} />
            ),
        }}      
      />
 
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
            // headerRight:() =>(
            //   <MaterialCommunityIcons 
            //   name="account-edit"
            //   size={25}
            //   backgroundColor="#fff"
            //   color="#000"/>
            // ),   
        }}
      />
    </Tab.Navigator>
  );
}

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

export function BottomTabNavigator() {
  return (
      <MyTabs />
  );
}