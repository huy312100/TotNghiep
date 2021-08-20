
import React from 'react';
import ReactRouter  from './routes/routes';
import './App.css';
import { Provider } from 'react-redux';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import courseReducer from './store/reducers/courses';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
  course:courseReducer,
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


function App() {
  return (
   <div>
     <Provider store={store}>
        <ReactRouter/>
     </Provider>
   </div>
  );
}

export default App;
