import React from 'react';
import { render } from '@testing-library/react-native';

import { Heading } from '../Heading';

test('render the heading label text',() => {
    const {getByText , queryByText} = render(<Heading>Test</Heading>);
    expect(getByText("Test")).not.toBeNull();
});

test('forwards remaining props to Heading Login',() => {
    const {getByTestId} = render(<Heading passedProp="yes"/>);

    expect(getByTestId('Form.Heading').props).toEqual(
        expect.objectContaining({
          passedProp: 'yes',
        })
    );
});