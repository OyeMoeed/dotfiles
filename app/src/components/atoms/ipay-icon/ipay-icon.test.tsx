// IPaySVGIcon.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import IPayIcon from './ipay-icon.component';
import iconSet from '@app/assets/icons/ipay-icons-collection.json';

// Mock Svg and Path components from react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const MockSvg = props => <svg {...props} />;
  const MockPath = props => <path {...props} />;
  return { Svg: MockSvg, Path: MockPath };
});

// Mock IPayIcon component
jest.mock('@app/assets/icons/ipay-svg-icon', () => {
  return props => <div {...props} />;
});

describe('IPayIcon', () => {
  it('renders correctly with given props', () => {
    const { getByTestId } = render(
      <IPayIcon icon="some-icon" color="#000" size={24} testID="svg-icon" />
    );

    // Check if the IPayIcon component is rendered with the correct props
    const iconComponent = getByTestId('svg-icon');
    expect(iconComponent).toBeTruthy();
    expect(iconComponent.props.native).toBe(true);
    expect(iconComponent.props.SvgComponent).toBeDefined();
    expect(iconComponent.props.PathComponent).toBeDefined();
    expect(iconComponent.props.iconSet).toEqual(iconSet);
    expect(iconComponent.props.icon).toBe('some-icon');
    expect(iconComponent.props.color).toBe('#000');
    expect(iconComponent.props.size).toBe(24);
  });
});