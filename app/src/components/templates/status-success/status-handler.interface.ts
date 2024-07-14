interface StatusProps {
  headingText: string;
  descriptionText?: string;
  atmCard?: boolean;
  onPressGoToCard?: () => void;
  onPressHome?: () => void;
  onPressDone?: () => void;
}
export interface StatusSuccessComponentHandlerProps {
  statusVariant: string;
  variantProps: StatusProps;
}
