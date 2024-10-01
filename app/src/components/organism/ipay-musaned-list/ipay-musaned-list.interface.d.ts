import { MusanedStatus } from '@app/utilities';

export interface IPayMusanedListProps {
  date: string;
  titleText: string;
  status: MusanedStatus;
  amount: number;
  onPress?: () => void;
  testID?: string;
  shouldTranslateTitle?: boolean;
  withArrow?: boolean;
  details: string;
}
