import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterGiftsProps {
  control?: Control<FieldValues> | undefined;
  giftOccasion: any[];
  giftStatus: any[];
}
