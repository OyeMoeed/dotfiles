import { SadadBillItemProps } from '@app/components/organism/ipay-sadad-bill-details-box/ipay-sadad-bill-details-box.interface';

interface CompanyProps {
  name: string;
  image: string;
}

export interface SelectedValues {
  service: string;
  company: CompanyProps;
}

export interface FormValues {
  companyName: string;
  serviceType: string;
}

export interface NewSadadBillProps {
  route: {
    params?: {
      selectedBills: SadadBillItemProps[];
    };
  };
  testID?: string;
}
