import React from 'react';

interface CircularProgressProps {
  size?: number;
  width?: number;
  fill?: number;
  arcSweepAngle?: number;
  gradientColors?: string[]; // Adjust this based on your gradient library
  backgroundColor?: string;
  padding?: number;
  lineCap?: string; // Adjust lineCap values as needed
  children?: React.ReactNode;
}
export default CircularProgressProps;
