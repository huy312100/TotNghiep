import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/authentications/Login';
import { NavigationContainer } from '@react-navigation/native';
import{BottomTabNavigator} from './src/navigations/BottomTabNavigation';
import {RegisterNavigation,MainStackNavigation} from './src/navigations/StackNavigation';

import{HomeScreen} from './src/screens/home/Home'

function App() {
  return (
    <NavigationContainer>
      <MainStackNavigation/>
    </NavigationContainer>

    
  );
}
export default App;