import React from 'react'
import {render,fireEvent} from '@testing-library/react-native';

import LoginScreen from '../Login';

test('it render as i expect',()=>{
    const { toJSON } = render(<LoginScreen />);

  expect(toJSON()).toMatchSnapshot();
})
