interface PrimaryProps {
  headingText: string;
  descriptionText?: string;
  atmCard?: boolean;
  onPressDone?: () => void;
}
export interface StatusSuccessPrimaryVariantProps {
  variantProps: PrimaryProps;
}
