import { MotiSkeletonProps } from 'moti/build/skeleton/types';

export enum SkeletonLoaderTypes {
  'IMAGE',
  'TITLE',
  'TEXT',
}
export interface IPaySkeletonViewProps extends Omit<MotiSkeletonProps, 'Gradient'> {
  isLoading?: boolean;
  /**
   * testID for the component to test the element.
   */
  type: SkeletonLoaderTypes;
}
