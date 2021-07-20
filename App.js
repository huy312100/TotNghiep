import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigation } from "./src/navigations/StackNavigation";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authenReducer from './store/reducers/Authen';

const rootReducer = combineReducers({
  authen:authenReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
        <SafeAreaProvider>
        <NavigationContainer>
          <MainStackNavigation/>
        </NavigationContainer>
        </SafeAreaProvider>
        
    </Provider>

  );
}


