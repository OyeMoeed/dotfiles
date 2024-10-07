import { Control, FieldValues } from 'react-hook-form';

export interface IPayFilterCardsProps {
  control?: Control<FieldValues> | undefined;
  cards: any[];
  label: string;
}
