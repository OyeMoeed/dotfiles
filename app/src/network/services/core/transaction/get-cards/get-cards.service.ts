import constants from '@app/constants/constants';
import apiCall from '@app/network/services/api-call.service';
import requestType from '@app/network/request-types.network';

import cardsListMock from '../cards-list.mock';
import { CardsProp } from '../transaction.interface';
import CORE_URLS from '../../core.urls';

const getCards = async (payload: CardsProp): Promise<any> => {
  if (constants.MOCK_API_RESPONSE) {
    return cardsListMock;
  }

  const header = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'api-version': 'v2',
    hide_error_response: payload.hideError ?? false,
    hide_spinner_loading: payload.hideSpinner ?? false,
  };

  const apiResponse = await apiCall({
    endpoint: CORE_URLS.GET_CARDS(payload?.walletNumber),
    method: requestType.GET,
    headers: header,
  });
  return apiResponse;
};

export default getCards;
