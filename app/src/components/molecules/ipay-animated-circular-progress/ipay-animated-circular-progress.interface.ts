// Define the props interface
export interface IPayAnimatedCircularProgressProps {
  size?: number;
  width?: number;
  fill?: number;
  rotation?: number;
  arcSweepAngle?: number;
  gradientColors?: string[];
  backgroundColor?: string;
  padding?: number;
  lineCap?: 'butt' | 'round' | 'square';
  children?: React.ReactNode;
}
