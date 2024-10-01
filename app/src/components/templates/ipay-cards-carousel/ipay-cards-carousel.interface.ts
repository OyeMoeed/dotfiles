import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import CardScreenCurrentState from '@app/screens/cards/cards.screen.interface';
import { Dispatch, SetStateAction } from 'react';

interface IPayCardsCarouselProps {
  cardsCurrentState: CardScreenCurrentState;
  cardsData: CardInterface[];
  styles: any;
  onChangeIndex: (index: number) => void;
  openCardSheet: () => void;
  boxHeight: number;
  setBoxHeight: Dispatch<SetStateAction<number>>;
  onATMLongPress: () => void;
  onPinCodeSheet: () => void;
  isLoadingCards: boolean;
  resetOnDataChange?: boolean;
}

export default IPayCardsCarouselProps;
