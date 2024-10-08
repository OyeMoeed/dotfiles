import { BillsProps } from '@app/components/organism/ipay-sadad-bill/ipay-sadad-bill.interface';

export interface NewSadadBillProps {
  billNickname: string;
  billerName: string;
  billerIcon: string;
  totalAmount: string;
  serviceType: string;
  billNumOrBillingAcct: string;
  dueDate: string;
  billerId: string;
  billIdType: string;
  serviceDescription: string;
  newBill?: boolean;
  billDetailsList: BillsProps[];
  saveBill?: boolean;
}
