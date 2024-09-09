import JSEncrypt from 'jsencrypt';

const encryptData = (msg: string, secret: string) => {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(secret);

  return jsEncrypt.encrypt(msg);
};

export { encryptData };
