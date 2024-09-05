import { CardTypes } from '@app/utilities/enums.util';

export interface IPayListDescriptionProps {
  leftIcon: string;
  rightIcon: string;
  title: string;
  subTitle: string;
  detailText?: string;
  onPress: () => void;
}

export interface IPayListToggleProps {
  leftIcon: string;
  title: string;
  onToggleChange: (isOn: boolean) => void;
  toggleState: boolean;
}

export interface ChangePinRefTypes {
  resetInterval: () => void;
}

export interface DeleteCardSheetRefTypes {
  hide: () => void;
  show: () => void;
}

export interface RouteParams {
  currentCard: {
    cardType: CardTypes;
    cardHeaderText: string;
    name: string;
    maskedCardNumber?: string
  };
}
