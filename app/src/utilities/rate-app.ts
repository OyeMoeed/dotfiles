import { setAppData } from '@app/store/slices/app-data-slice';
import { store } from '@app/store/store';

const toggleAppRating = () => {
  store.dispatch(setAppData({ shouldShowRate: true }));
};

export default toggleAppRating;
