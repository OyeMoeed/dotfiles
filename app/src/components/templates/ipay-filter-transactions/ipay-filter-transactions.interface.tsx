import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';

export interface IPayFilterTransactionsProps {
  /**
   * props for showing heading text
   */
  heading: string;
  /**
   * props for test id
   */
  testID?: string;
  /**
   * OnSubmit callback
   */
  onClearFilters?: () => void;

  onSubmit: (data: any, filtersArray: Map<any, any>) => void;
  /**
   * prop for showing amount filter
   */
  showAmountFilter?: boolean;
  /**
   * props for showing date filter
   */
  showTypeFilter?: boolean;

  showBeneficiaryFilter?: boolean;

  showGiftFilters?: boolean;

  transactionTypes?: any[] | undefined;

  currentCard?: CardInterface;

  cards?: any[] | undefined;

  contacts?: any[] | undefined;

  showDateFilter?: boolean;

  showCardFilter?: boolean;

  showContactsFilter?: boolean;

  isVisible: boolean;

  onCloseFilterSheet: () => void;

  setSelectedCard?: (card: any) => void;

  // filters: FilterTypes[];

  // bottomFilters?: FilterTypes[] | undefined;

  // isBottomDropdowns?: boolean;

  defaultValues: any;
  doneText?: string;
}
