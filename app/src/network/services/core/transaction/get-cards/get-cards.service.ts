import constants from '@app/constants/constants';
import apiCall from '@app/network/services/api-call.service';
import requestType from '@app/network/request-types.network';

import constantsNetwork from '@app/network/constants';
import { ApiResponse } from '@app/network/services/services.interface';
import cardsListMock from '../cards-list.mock';
import { CardResponseInterface, CardsProp } from '../transaction.interface';
import CORE_URLS from '../../core.urls';

const getCards = async (payload: CardsProp): Promise<ApiResponse<{ cards: CardResponseInterface[] }> | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return cardsListMock;
  }

  const header = {
    [constantsNetwork.API_VERSION_NAME]: 'v2',
    hide_error_response: payload.hideError ?? false,
    hide_spinner_loading: payload.hideSpinner ?? false,
  };

  const apiResponse: ApiResponse<{ cards: CardResponseInterface[] }> | undefined = await apiCall({
    endpoint: CORE_URLS.GET_CARDS(payload?.walletNumber),
    method: requestType.GET,
    headers: header,
  });
  return apiResponse;
};

export default getCards;
