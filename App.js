import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthenStackNavigation} from './src/navigations/StackNavigation';
import { MenuProvider } from 'react-native-popup-menu';

import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authenReducer from './store/reducers/Authen';
import profileReducer from './store/reducers/Profile';
import universityReducer from './store/reducers/University';
import homeReducer from './store/reducers/Home';
import courseReducer from './store/reducers/Course';
import calendarReducer from './store/reducers/Calendar';
import messageReducer from './store/reducers/Message';
import newsReducer from './store/reducers/News';

const rootReducer = combineReducers({
  authen:authenReducer,
  profile:profileReducer,
  university:universityReducer,
  home:homeReducer,
  course:courseReducer,
  calendar:calendarReducer,
  message:messageReducer,
  news:newsReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

function App() {
  return (
    <MenuProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AuthenStackNavigation/>
        </NavigationContainer>
     </Provider>
    </MenuProvider>
    
  );
}

export default App;
