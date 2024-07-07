import CardItemProps from "@app/components/molecules/ipay-card-selector/ipay-card.interface";
import { StyleProp, ViewStyle } from "react-native";

export interface IPayAddCardBottomsheetProps {
  testID?: string;
  isEditingMode?: boolean;
  expiryOnPress?: () => void;
  cvvPress?: () => void;
  selectedDate?: string;
  onPressAddCards?: () => void;
  openExpiredDateBottomSheet?: () => void;
  openPressExpired?: () => void;
  closeBottomSheet?: () => void;
  selectedCard?: CardItemProps;
  containerStyles?:StyleProp<ViewStyle>;
  savedScreen?:boolean
}
