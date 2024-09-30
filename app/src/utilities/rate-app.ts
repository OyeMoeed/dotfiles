import { setRatingData } from '@app/store/slices/rating.slice';
import { store } from '@app/store/store';

const toggleAppRating = () => {
  store.dispatch(setRatingData({ shouldShowRate: true }));
};

export default toggleAppRating;
