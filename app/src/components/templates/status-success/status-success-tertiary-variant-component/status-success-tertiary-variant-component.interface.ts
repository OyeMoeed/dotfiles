interface TertiaryProps {
  headingText: string;
  descriptionText?: string;
  onPressGoToCard?: () => void;
  onPressHome?: () => void;
}
export interface StatusSuccessTertiaryVariantProps {
  variantProps: TertiaryProps;
}
