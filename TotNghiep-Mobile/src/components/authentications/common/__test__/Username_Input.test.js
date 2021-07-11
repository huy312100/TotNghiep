import React from 'react';
import { render } from '@testing-library/react-native';

import { UsernameInput } from '../Username_Input';

test('forwards remaining props to the underlying UsernameInput',() => {
    const {getByTestId} = render(<UsernameInput passedProp="yes"/>);

    expect(getByTestId('Form.UsernameInput').props).toEqual(
        expect.objectContaining({
          passedProp: 'yes',
        })
    );
});
