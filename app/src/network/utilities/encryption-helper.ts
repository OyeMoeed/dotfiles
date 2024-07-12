import constants from '@app/constants/constants';
import { ApiHeaderProps } from '@app/network/request-header-props.network';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';
import { EncryptionVariableProps } from './utilities.interface';

const encryptData = (msg: string, secret: string) => {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(secret);
 
  return jsEncrypt.encrypt(msg);
};

const queryParam = ({ url, method, body }: ApiHeaderProps): object => ({
  url: encryptData(url, constants?.ENCRYPTIONS_KEYS?.urlKey),
  method: encryptData(method, constants?.ENCRYPTIONS_KEYS?.methodKey),
  body: encryptData(body, constants?.ENCRYPTIONS_KEYS?.bodyKey),
});

export { encryptData, queryParam };
