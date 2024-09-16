import constants from '@app/constants/constants';
import requestType from '@app/network/request-types.network';
import { ApiResponseStatusType } from '@app/utilities/enums.util';
import apiCall from '@network/services/api-call.service';
import BILLS_MANAGEMENT_URLS from '../bills-management.urls';
import { GetDynamicFieldsPayloadTypes, GetDynamicFieldsResponseTypes } from './validate-moi-bill.interface';
import getDynamicFieldsMockResponse from './validate-moi-bill.mock';

const validateBill = async (
  billerId: string,
  serviceId: string,
  payload: GetDynamicFieldsPayloadTypes,
): Promise<GetDynamicFieldsResponseTypes | undefined> => {
  if (constants.MOCK_API_RESPONSE) {
    return getDynamicFieldsMockResponse;
  }
  try {
    const apiResponse = await apiCall({
      endpoint: BILLS_MANAGEMENT_URLS.validate_bill(billerId, serviceId),
      method: requestType.POST,
      payload,
    });

    if (apiResponse?.status?.type === ApiResponseStatusType.SUCCESS) {
      return apiResponse as GetDynamicFieldsResponseTypes;
    }

    return undefined;
  } catch (error: any) {
    console.error(error);
    return undefined;
  }
};

export default validateBill;
