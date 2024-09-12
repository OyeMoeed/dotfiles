import LocalBeneficiaryMetaMockProps from './local-beneficiary-metadata.interface';

const localBeneficiaryMetaDataMock: LocalBeneficiaryMetaMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC2ce26d514d12411bae0b16b342da0bf6',
    requestReference: '08432016497290053097',
  },
  response: {
    localBanks: [
      { code: '999999', desc: 'Alinma Bank' },
      {
        addtionalAttribute1: 'مصرف الراجحي',
        addtionalAttribute2: '1497',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '080',
        code: '20',
        desc: 'Alrajhi Bank',
      },
      {
        addtionalAttribute1: 'بنك الجزيرة',
        addtionalAttribute2: '1430',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '060',
        code: '15',
        desc: 'Bank Aljazira',
      },
      {
        addtionalAttribute1: 'البنك العربي الوطني',
        addtionalAttribute2: '1486',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '030',
        code: '19',
        desc: 'Arab National Bank',
      },
      {
        addtionalAttribute1: 'البنك الأهلي السعودي',
        addtionalAttribute2: '1564',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '010',
        code: '2712',
        desc: 'Saudi National Bank',
      },

      {
        addtionalAttribute1: 'بنك الرياض',
        addtionalAttribute2: '1567',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '020',
        code: '2713',
        desc: 'Riyad Bank',
      },
      {
        addtionalAttribute1: 'البنك السعودي للاستثمار',
        addtionalAttribute2: '313534',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '065',
        code: '21',
        desc: 'Saudi Investment Bank',
      },
      {
        addtionalAttribute1: 'بنك اس تي سي',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '012',
        code: '91247',
        desc: 'STC Bank',
      },

      {
        addtionalAttribute1: 'بنك الخليج الدولي',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '015',
        code: '100030',
        desc: 'Gulf International Bank',
      },

      { addtionalAttribute2: '19279', code: '13238', desc: 'ABDULRAHMAN HASSAN RIYADH' },
      { addtionalAttribute2: '57966', code: '25147', desc: 'AHBINHOMAIDEEN' },
      { code: '23', desc: 'ARAB BANKING COPORATION BAHRAIN H.O' },
      {
        addtionalAttribute1: 'بنك البلاد',
        addtionalAttribute2: '1477',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '015',
        code: '9',
        desc: 'Albilad Bank',
      },

      { addtionalAttribute2: '30526', code: '13828', desc: 'Axis Bank' },
      {
        addtionalAttribute1: 'بنك مسقط',
        addtionalAttribute2: '1455',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '076',
        code: '22',
        desc: 'BANK MUSCAT',
      },
      { addtionalAttribute2: '1568', code: '2716', desc: 'BANK OF NEW ZEALAND' },

      {
        addtionalAttribute1: 'البنك السعودي الفرنسي',
        addtionalAttribute2: '1403',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '055',
        code: '10',
        desc: 'Banque Saudi Fransi',
      },
      { addtionalAttribute2: '19220', code: '11305', desc: 'DI Cust 1' },
      {
        addtionalAttribute1: 'بنك الإمارات الدولي',
        addtionalAttribute3: 'N',
        addtionalAttribute4: '095',
        code: '2399',
        desc: 'EMIRATES BANK INTERNATIONAL',
      },
      { code: '14380', desc: 'GOPI' },

      { code: '3030', desc: 'HSBC London' },
      { addtionalAttribute2: '19254', code: '12108', desc: 'MUSTAFA BANK' },
      { addtionalAttribute1: 'بنك الكويت الوطني جدة', code: '28', desc: 'NATIONAL BANK OF KIWAIT JEDDAH H.O' },
      { addtionalAttribute2: '1522', code: '2669', desc: 'NOSTRO TEST' },
      { code: '6060', desc: 'National Bank of Pakistan' },
      { addtionalAttribute2: '37725', code: '18964', desc: 'RAMZI COUNTER PARTY' },

      { addtionalAttribute2: '37759', code: '14379', desc: 'SAMA Broker' },
      { addtionalAttribute2: '37740', code: '18821', desc: 'SAMA CIF ATFAIHAN' },
      { code: '13168', desc: 'SM BANK' },
      { addtionalAttribute1: 'حزب', addtionalAttribute2: '19275', code: '13169', desc: 'SM CPARTY' },

      { addtionalAttribute2: '19262', code: '12409', desc: 'SUQ SILA CUSTOMER NAH' },
      { addtionalAttribute2: '10942', code: '11269', desc: 'Saad AlSayari Bank' },
      { addtionalAttribute2: '19278', code: '13237', desc: 'Sameh Bank Riyadh' },

      {
        addtionalAttribute1: 'البنك المركزي السعودي',
        addtionalAttribute2: '8433',
        code: '1001',
        desc: 'Saudi Central Bank',
      },

      { addtionalAttribute1: 'بنك التميمي المتحد', addtionalAttribute2: '10276', code: '11211', desc: 'TAMIMI BANK' },
      { addtionalAttribute2: '37770', code: '14798', desc: 'USSR' },
      { addtionalAttribute2: '67643', code: '26220', desc: 'WAKALA BANK' },
      {
        addtionalAttribute1: 'البنك السعودي الأول',
        addtionalAttribute3: 'Y',
        addtionalAttribute4: '045',
        code: '16',
        desc: 'Saudi Awwal Bank',
      },
    ],
  },

  successfulResponse: true,
};

export default localBeneficiaryMetaDataMock;
