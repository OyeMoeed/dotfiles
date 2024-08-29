import { LocalTransferEditBeneficiaryMockProps } from './edit-beneficiary.interface';

const localTransferEditBeneficiaryMock: LocalTransferEditBeneficiaryMockProps = {
  data: {
    response: {
      fullName: 'John Doe',
      beneficiaryType: 'INTERNATIONAL',
      bankCode: '001',
      branchCode: '002',
      accountNumber: '1234567890',
      currencyCode: 'USD',
      countryCode: 'SA',
      cityCode: 'Riyadh',
      phoneNumber: '1234567890',
      email: 'johndoe@example.com',
      remittanceType: 'SWIFT',
      dynamicFields: [
        {
          fieldCode: 'field1',
          fieldValue: 'value1',
        },
      ],
    },
  },
  successfulResponse: true,
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'Dear Partner .. The beneficiary has been added, please activate the beneficiary to be able to do a transfer transaction.',
    sessionReference: 'SSPAYC8cfc4056e31948f0ac43b4d301602b58',
    requestReference: '08432016497290053143',
  },
  ok: false,
};

export default localTransferEditBeneficiaryMock;
