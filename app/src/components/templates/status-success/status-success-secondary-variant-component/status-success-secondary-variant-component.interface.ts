interface SecondaryProps {
  headingText: string;
  descriptionText?: string;
  atmCard?: boolean;
  onPressGoToCard?: () => void;
  onPressHome?: () => void;
}

export interface StatusSuccessSecondaryVariantProps {
  variantProps: SecondaryProps;
}
