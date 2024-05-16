/**
 * @format
 */

import React from 'react';
import 'react-native';

// Note: import explicitly to use the types shipped with jest.
import { it } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../app/App';
import '@testing-library/jest-native/extend-expect';


it('renders correctly', () => {
  renderer.create(<App />);
});
