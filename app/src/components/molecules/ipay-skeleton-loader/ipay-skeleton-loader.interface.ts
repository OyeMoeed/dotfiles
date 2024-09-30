import { IPaySkeletonViewProps } from '@app/components/atoms/ipay-skeletonview/ipay-skeletonview.interface';
import { StyleProp, ViewStyle } from 'react-native';

export interface IPaySkeletonLoaderConfig extends IPaySkeletonViewProps {
  repeat?: number;
  space?: number;
}

export interface IPaySKeletonBuilderTypes {
  repeat?: number;
  space?: number;
  left?: Array<IPaySkeletonLoaderConfig>;
  center?: Array<IPaySkeletonLoaderConfig>;
  right?: Array<IPaySkeletonLoaderConfig>;
  overrideStyle?: StyleProp<ViewStyle>;
}

export interface IPaySkeletonBuilderProps {
  variation: IPaySkeletonEnums;
  isLoading: boolean;
}

export enum IPaySkeletonEnums {
  TRANSACTION_LIST = 'TRANSACTION_LIST',
  CARD_WITH_TITLE = 'CARD_WITH_TITLE',
  CARD = 'CARD',
  TEXT = 'TEXT',
}
