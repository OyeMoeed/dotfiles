import constants from '@app/constants/constants';
import { ApiHeaderProps } from '@app/network/request-header-props.network';
import JSEncrypt from 'jsencrypt';

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
