import { CardInterface } from '@app/components/molecules/ipay-atm-card/ipay-atm-card.interface';
import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAMES } from '../constants.store';

interface CardsInitialState {
  cards: CardInterface[];
  currentCard?: CardInterface;
}

const initialState: CardsInitialState = {
  cards: [],
  currentCard: undefined,
};

const cardsSlice = createSlice({
  name: SLICE_NAMES.CARDS_SLICE,
  initialState,
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    resetCards(state) {
      state.cards = initialState.cards;
    },
    setCurrentCard(state, action) {
      state.currentCard = action.payload;
    },
    setCardAtmWithdrawal(state, action) {
      state.cards = state.cards.map((card) => {
        if (card.cardIndex === action.payload.cardIndex) {
          return {
            ...card,
            isAtmWithdrawalEnabled: action.payload.atmWithdrawal,
          };
        }
        return card;
      });
    },
    setCardFrozen(state, action) {
      state.cards = state.cards.map((card) => {
        if (card.cardIndex === action.payload.cardIndex) {
          return {
            ...card,
            frozen: action.payload.frozen,
          };
        }
        return card;
      });
    },
  },
});

export const { setCards, resetCards, setCardAtmWithdrawal, setCardFrozen, setCurrentCard } = cardsSlice.actions;

export default cardsSlice.reducer;