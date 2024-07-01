import { PrePareLoginApiResponseProps } from './prepare-login.interface';

const prepareLoginMock: PrePareLoginApiResponseProps = {
  data: {
    status: {
      code: 'I000000',
      type: 'SUCCESS',
      desc: 'authentication.authenticationService.generateEncryptionKey.messege.success',
      requestReference: '07631609194089878858',
    },
    authentication: {
      transactionId: 'TRPAYC2f172ebab23c434aa8989cf0959bcbf1',
    },
    response: {
      encryptionPrefix: '42987',
      currentDate: '2024-05-27',
      inactiveTimeoutPeriodInMins: '10',
      isEncryptionRequired: true,
      passwordEncryptionKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4QEzNVOb+3JHo1dXCUaPFzzPNmfzZNNM+a0fv1KtYJeUHrV0F0umYj5EOXiJ0Y+Yc9TpltrApOVJ9/Iq0sEdmH68ifOAo1h/cOHVu8szh3PlfqmGr/E0RqnQBWnXXZPEF1FAQtt0qKKUfwYRZTt4QfoTS1JQPq21JF5PigzWprbDE+L1oK0LzwLQJRQM4NLYkwRP/KmxsoL4cPxdTxB4rQ9sfueS9vuXvhoGVwzqbvWuSXODH6CGVongvqrjryJvvjIIn2Xkv5lyFtM8UIYfFVCyLd3eoWlszbwLqdwN1sMnSRIhOCQslriQsuUx8bwb+CFDrQwuK1w9/kTVkWEE7QIDAQAB',
      passwordEncryptionPrefix: '3053769337',
    },
    successfulResponse: true,
  },
  ok: true,
};

export default prepareLoginMock;
