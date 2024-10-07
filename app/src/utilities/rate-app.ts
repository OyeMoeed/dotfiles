import { setRatingData } from '@app/store/slices/rating.slice';
import { store } from '@app/store/store';
import moment from 'moment';

const toggleAppRating = () => {
  const now = moment();

  const diffDays = now.diff(store.getState().ratingReducer.savedDate, 'days');
  if (diffDays / 120 > 1 || store.getState().ratingReducer.isFirstLogin) {
    store.dispatch(setRatingData({ shouldShowRate: true }));
  }
};

export default toggleAppRating;
