interface IPayCardDetailsSectionProps {
  testID?: string;
  isCardPrinted?: boolean;
  onOpenOTPSheet?: () => void;
}

interface Option {
  icon: string;
  text: string;
  key: string;
  /**
   * Callback function called when the Pressable is pressed.
   */
  onPress?: () => void;
  hidden?: boolean;
}

interface SheetOptions {
  title: string;
  subtitle?: string;
  option: string;
  icon?: string;
  status: string;
  toastType?: string;
}

type ModifiedSheetOptions = Omit<SheetOptions, 'option' | 'status'>;

type SheetVariants = {
  freeze: SheetOptions;
  unfreeze: SheetOptions;
};

type ToastVariants = {
  freeze: ModifiedSheetOptions;
  unfreeze: ModifiedSheetOptions;
};

export { IPayCardDetailsSectionProps, Option, SheetVariants, ToastVariants };
