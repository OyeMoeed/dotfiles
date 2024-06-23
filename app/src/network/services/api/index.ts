import constants from '@app/constants/constants';
import { ApiHeaderProps } from '@app/network/request-header-props.network';
import { EncryptionVariableProps } from '@utilities/encryption-helper.util';
import CryptoJS from 'crypto-js';

const encryptVariable = ({ variable, encryptionKey }: EncryptionVariableProps): string =>
  JSON.stringify(CryptoJS.HmacSHA512(variable, encryptionKey));

const queryParam = ({ url, method, body }: ApiHeaderProps): object => ({
  url: encryptVariable(url, constants?.ENCRYPTIONS_KEYS?.urlKey),
  method: encryptVariable(method, constants?.ENCRYPTIONS_KEYS?.methodKey),
  body: encryptVariable(body, constants?.ENCRYPTIONS_KEYS?.bodyKey),
});

export { encryptVariable, queryParam };
