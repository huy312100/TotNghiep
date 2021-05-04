import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthenStackNavigation} from './src/navigations/StackNavigation';

import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authenReducer from './store/reducers/Authen';
import profileReducer from './store/reducers/Profile';
import universityReducer from './store/reducers/University';

const rootReducer = combineReducers({
  authen:authenReducer,
  profile:profileReducer,
  university:universityReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthenStackNavigation/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;