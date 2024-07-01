import constants from '@app/constants/constants';
import { ApiHeaderProps } from '@app/network/request-header-props.network';
import CryptoJS from 'crypto-js';
import { EncryptionVariableProps } from './utilities.interface';

// Encrypting a veriable
const encryptVariable = ({ veriable, encryptionKey, encryptionPrefix }: EncryptionVariableProps) => {
  const encrypted = CryptoJS.AES.encrypt(veriable, encryptionKey).toString();
  return encryptionPrefix + encrypted; // Prefix the encrypted data
};

const queryParam = ({ url, method, body }: ApiHeaderProps): object => ({
  url: encryptVariable(url, constants?.ENCRYPTIONS_KEYS?.urlKey),
  method: encryptVariable(method, constants?.ENCRYPTIONS_KEYS?.methodKey),
  body: encryptVariable(body, constants?.ENCRYPTIONS_KEYS?.bodyKey),
});

export { encryptVariable, queryParam };
