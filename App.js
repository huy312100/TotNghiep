import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {AuthenStackNavigation} from './src/navigations/StackNavigation';

import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import authenReducer from './store/reducers/Authen';

const rootReducer = combineReducers({
  authen:authenReducer,
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