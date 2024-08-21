import { Ref } from 'react';

export interface IPayAddressInfoSheetRefTypes {
  showAddressInfoSheet: () => void;
}

export interface IPayAddressInfoSheetProps {
  ref?: Ref<IPayAddressInfoSheetRefTypes>;
}
