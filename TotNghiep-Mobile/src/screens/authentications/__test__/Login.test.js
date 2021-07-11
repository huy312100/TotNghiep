import React from 'react'
import {render,fireEvent} from '@testing-library/react-native';

import LoginScreen from '../Login';

test('it render as i expect',()=>{
    const { toJSON } = render(<LoginScreen />);

  expect(toJSON()).toMatchSnapshot();
})

// test('display error message if all field not completed',()=>{
//     const {getByTestId} =render(<LoginScreen/>);

//     console.log(getByTestId("Button.Login").props);
// })