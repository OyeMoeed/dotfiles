import { BeneficiaryDetailsProps } from '@app/screens/international-transfer/international-transfer.interface';
import { Dispatch, SetStateAction } from 'react';

interface IPayInternationalBeneficiaryListProps {
  search: string;
  handleSearchChange: (text: string) => void;
  onClearInput: () => void;
  filteredBeneficiaryData: BeneficiaryDetailsProps[];
  handlePressSortButton: () => void;
  sortedByActive: string;
  setSelectedBeneficiary: Dispatch<SetStateAction<BeneficiaryDetailsProps | undefined>>;
  handleActivateBeneficiary: () => void;
  activeTab: string;
  onPressMenuOption: (item: BeneficiaryDetailsProps) => void;
  handleAddNewBeneficiary: () => void;
  isLoading: boolean;
}

export default IPayInternationalBeneficiaryListProps;
