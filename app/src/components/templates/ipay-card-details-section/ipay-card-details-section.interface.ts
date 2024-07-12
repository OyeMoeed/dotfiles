interface IPayCardDetailsSectionProps {
  testID?: string;
}

interface Option {
  icon: string;
  text: string;
  key: string;
}

interface SheetOptions {
  title: string;
  subtitle?: string;
  option: string;
  icon?: string;
  toastType?: string;
}

type ModifiedSheetOptions = Omit<SheetOptions, 'option'>;

type SheetVariants = {
  freeze: SheetOptions;
  unfreeze: SheetOptions;
};

type ToastVariants = {
  freeze: ModifiedSheetOptions;
  unfreeze: ModifiedSheetOptions;
};

export { IPayCardDetailsSectionProps, Option, SheetVariants, ToastVariants };
