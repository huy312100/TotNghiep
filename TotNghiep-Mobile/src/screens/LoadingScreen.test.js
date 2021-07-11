import React from 'react';
import {render} from '@testing-library/react-native';

import LoadingScreen from './LoadingScreen';

test('it render as i expect',()=>{
    const { toJSON } = render(<LoadingScreen />);

    expect(toJSON()).toMatchSnapshot();
})