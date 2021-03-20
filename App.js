import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {AuthenStackNavigation} from './src/navigations/StackNavigation';

import{HomeScreen} from './src/screens/home/Home'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AuthenStackNavigation/>
    </NavigationContainer>

    
  );
}
export default App;