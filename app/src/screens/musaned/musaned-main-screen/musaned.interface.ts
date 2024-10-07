import { MusnaedInqueryRecords } from '@app/network/services/musaned';

export interface MusanedProps {}

export interface NonAlinmaUserProps {
  index: number;
  name: string;
  payrollAmount: string;
  item: MusnaedInqueryRecords;
  detailsTranslated: string;
}
