import { constants } from '@utilities/index';
import { ApiHeaderProps, EncryptionVariableProps } from '@utilities/types-and-interfaces';
import CryptoJS from 'crypto-js';

export const queryParam = ({ url, method, body }: ApiHeaderProps): object => ({
  url: encryptVariable(url, constants?.ENCRYPTIONS_KEYS?.urlKey),
  method: encryptVariable(method, constants?.ENCRYPTIONS_KEYS?.methodKey),
  body: encryptVariable(body, constants?.ENCRYPTIONS_KEYS?.bodyKey)
});

export const encryptVariable = ({ variable, encryptionKey }: EncryptionVariableProps): string =>
  JSON.stringify(CryptoJS.HmacSHA512(variable, encryptionKey));
