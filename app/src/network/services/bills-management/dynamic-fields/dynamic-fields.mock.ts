import { DYNAMIC_FIELDS_TYPES } from '@app/constants/constants';

const getDynamicFieldsMockResponse = {
  response: {
    billNumberLabel: 'Iqama ID',
    billNumberMinimumWidth: 10,
    customerIdNumber: { fieldIndex: 'BeneficiaryId.OfficialId', value: '1092103737' },
    customerIdType: { fieldIndex: 'BeneficiaryId.OfficialIdType', value: '1' },
    dynamicFields: [
      {
        index: 'BeneficiaryId.OfficialId',
        integrationTagName: 'BeneficiaryId.OfficialId',
        label: 'Iqama ID',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '1',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'NUMBER',
        value: '1092103737',
      },
      {
        index: 'BeneficiaryId.OfficialIdType',
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        lOVType: '315',
        label: 'ID Type',
        lovList: [
          { addtionalAttribute1: 'رقم المنشأة', code: 'BIS', desc: 'Business ID' },
          { addtionalAttribute1: 'رقم الإقامة', code: 'IQA', desc: 'Iqama ID' },
          { addtionalAttribute1: 'رقم الهوية الوطنية', code: 'NAT', desc: 'National ID' },
          { addtionalAttribute1: 'رقم جواز خليجي', code: 'PAS', desc: 'GCC Passport' },
        ],
        maxWidth: 32,
        minWidth: 1,
        orderIndex: '2',
        required: true,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: 'LIST_OF_VALUE',
        value: '1',
      },
      {
        dateCompareOperation: 'any',
        hijriType: false,
        index: 'PayAllAssociateFees.FeeDurationEndDate',
        integrationTagName: 'PayAllAssociateFees.FeeDurationEndDate',
        label: 'Fees Duration End Date (Hijri)',
        maxWidth: 10,
        minWidth: 10,
        onlyHijri: false,
        orderIndex: '3',
        required: false,
        requiredInPaymentOrRefund: 'BOTH',
        type: 'DATE',
      },
      {
        index: 'BeneficiaryId.OfficialId',
        integrationTagName: 'BeneficiaryId.OfficialId',
        label: 'Iqama ID',
        maxWidth: 10,
        minWidth: 10,
        orderIndex: '4',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'NUMBER',
        value: '1092103737',
      },
      {
        index: 'BeneficiaryId.OfficialIdType',
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        lOVType: '315',
        label: 'ID Type',
        lovList: [
          { addtionalAttribute1: 'رقم المنشأة', code: 'BIS', desc: 'Business ID' },
          { addtionalAttribute1: 'رقم الإقامة', code: 'IQA', desc: 'Iqama ID' },
          { addtionalAttribute1: 'رقم الهوية الوطنية', code: 'NAT', desc: 'National ID' },
          { addtionalAttribute1: 'رقم جواز خليجي', code: 'PAS', desc: 'GCC Passport' },
        ],
        maxWidth: 32,
        minWidth: 1,
        orderIndex: '5',
        required: true,
        requiredInPaymentOrRefund: 'REFUND',
        type: 'LIST_OF_VALUE',
        value: '1',
      },
      {
        index: 'TermsAndConditions',
        integrationTagName: 'TermsAndConditions',
        label: 'Accept Terms and Conditions',
        maxWidth: 10,
        minWidth: 1,
        orderIndex: '1',
        required: false,
        requiredInPaymentOrRefund: 'PAYMENT',
        type: DYNAMIC_FIELDS_TYPES.BOOLEAN_TYPE,
        value: false,
      },
    ],
    showbillNumbertHint: false,
  },
  successfulResponse: true,
  status: {
    sessionReference: 'SSPAYC0f6c1165e9fb4c70b39530f8137b509f',
    code: 'I000000',
    requestReference: '02461994742498236274',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
  },
};

const getDynamicFieldsMockResponse2 = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYC826926d8653d482dbb9b73b8b1d2d826',
    requestReference: '07651196661975283532',
  },
  response: {
    dynamicFields: [
      {
        orderIndex: '1',
        index: 'BeneficiaryId.OfficialId',
        value: '1092103737',
        type: DYNAMIC_FIELDS_TYPES.NUMBER,
        allowedValues: null,
        minWidth: 10,
        maxWidth: 10,
        required: true,
        label: 'Violator ID',
        lOVType: null,
        parentIndex: null,
        childIndex: null,
        lovFilter1: null,
        lovFilter2: null,
        lovFilter3: null,
        lovList: null,
        dateCompareOperation: null,
        hijriType: null,
        onlyHijri: null,
        billIdType: null,
        integrationTagName: 'BeneficiaryId.OfficialId',
        requiredInPaymentOrRefund: 'payment',
        minAmount: null,
        maxAmount: null,
        hintAr: 'رقم هوية المخالف',
        hintEn: 'Violator ID',
      },
      {
        orderIndex: '2',
        index: 'BeneficiaryId.OfficialIdType',
        value: '1',
        type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
        allowedValues: null,
        minWidth: 1,
        maxWidth: 32,
        required: true,
        label: 'ID Type',
        lOVType: '315',
        parentIndex: null,
        childIndex: null,
        lovFilter1: null,
        lovFilter2: null,
        lovFilter3: null,
        lovList: [
          {
            code: 'BIS',
            desc: 'Business ID',
            addtionalAttribute1: 'رقم المنشأة',
          },
          {
            code: 'IQA',
            desc: 'Iqama ID',
            addtionalAttribute1: 'رقم الإقامة',
          },
          {
            code: 'NAT',
            desc: 'National ID',
            addtionalAttribute1: 'رقم الهوية الوطنية',
          },
          {
            code: 'PAS',
            desc: 'GCC Passport',
            addtionalAttribute1: 'رقم جواز خليجي',
          },
        ],
        dateCompareOperation: null,
        hijriType: null,
        onlyHijri: null,
        billIdType: null,
        integrationTagName: 'BeneficiaryId.OfficialIdType',
        requiredInPaymentOrRefund: 'payment',
        minAmount: null,
        maxAmount: null,
        hintAr: 'رقم هوية المخالف',
        hintEn: 'Violator ID',
      },
      {
        orderIndex: '3',
        index: 'ViolationsByCategory.IssuingEntityID',
        value: null,
        type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
        allowedValues: null,
        minWidth: 8,
        maxWidth: 8,
        required: true,
        label: 'Issuing Entity',
        lOVType: '264',
        parentIndex: null,
        childIndex: 'ViolationsByCategory.ViolationCategoryId',
        lovFilter1: null,
        lovFilter2: null,
        lovFilter3: null,
        lovList: [
          {
            code: '00000002',
            desc: 'Ministry of Interior',
            addtionalAttribute1: 'وزارة الداخلية',
          },
          {
            code: '00000004',
            desc: 'Ministry of Tourism',
            addtionalAttribute1: 'وزارة السياحة',
          },
          {
            code: '00000007',
            desc: 'Saudi Food and Drug Authority',
            addtionalAttribute1: 'الهيئة العامة للغذاء والدواء',
          },
          {
            code: '00000008',
            desc: 'General Organization for Social Insurance',
            addtionalAttribute1: 'المؤسسة العامة للتأمينات الاجتماعية',
          },
          {
            code: '00000010',
            desc: 'Zakat, Tax and Customs Authority',
            addtionalAttribute1: 'هيئة الزكاة والضريبة والجمارك',
          },
          {
            code: '00000011',
            desc: 'Ministry of Environment Water and Agriculture',
            addtionalAttribute1: 'وزارة البيئة والمياه والزراعة',
          },
          {
            code: '00000014',
            desc: 'Ministry of Investment',
            addtionalAttribute1: 'وزارة الإستثمار',
          },
          {
            code: '00000015',
            desc: 'Ministry of Health',
            addtionalAttribute1: 'وزارة الصحة',
          },
          {
            code: '00000016',
            desc: 'Ministry of Media',
            addtionalAttribute1: 'وزارة الإعلام',
          },
          {
            code: '00000017',
            desc: 'Ministry of National Guards',
            addtionalAttribute1: 'وزارة الحرس الوطني',
          },
          {
            code: '00000020',
            desc: 'Ministry of Education',
            addtionalAttribute1: 'وزارة التعليم',
          },
          {
            code: '00000026',
            desc: 'Saudi Post',
            addtionalAttribute1: 'مؤسسة البريد السعودي',
          },
          {
            code: '00000031',
            desc: 'General Entertainment Authority',
            addtionalAttribute1: 'الهيئة العامة للترفيه',
          },
          {
            code: '00000032',
            desc: 'Public Transport Authority',
            addtionalAttribute1: 'الهيئة العامة للنقل',
          },
          {
            code: '00000033',
            desc: 'Ministry of Energy',
            addtionalAttribute1: 'وزارة الطاقة',
          },
          {
            code: '00000034',
            desc: 'Saudi Council of Engineers',
            addtionalAttribute1: 'الهيئة السعودية للمهندسين',
          },

          {
            code: '00000036',
            desc: 'Communications and Information Technology Commission (CITC)',
            addtionalAttribute1: 'هيئة الاتصالات وتقنية المعلومات',
          },
          {
            code: '00000038',
            desc: 'Ministry of Transport and Logistic Services',
            addtionalAttribute1: 'وزارة النقل والخدمات اللوجستية',
          },
          {
            code: '00000043',
            desc: 'Economic Cities and Special Zones Authority',
            addtionalAttribute1: 'هيئة المدن والمناطق الاقتصادية الخاصة',
          },
          {
            code: '00000045',
            desc: 'Water and Electricity Regulatory Authority',
            addtionalAttribute1: 'هيئة تنظيم المياه والكهرباء',
          },
          {
            code: '00000047',
            desc: 'General Commission for Audiovisual Media',
            addtionalAttribute1: 'الهيئة العامة للإعلام المرئي والمسموع',
          },
          {
            code: '00000048',
            desc: 'Ministry of Sport',
            addtionalAttribute1: 'وزارة الرياضة',
          },
          {
            code: '00000049',
            desc: 'Ministry of Industry and Mineral Resources',
            addtionalAttribute1: 'وزارة الصناعة والثروة المعدنية',
          },
          {
            code: '00000051',
            desc: 'Ministry of Communications and Information Technology (MCIT)',
            addtionalAttribute1: 'وزارة الإتصالات وتقنية المعلومات',
          },
          {
            code: '00000052',
            desc: 'Saudi Broadcasting Authority',
            addtionalAttribute1: 'هيئة الإذاعة والتلفزيون',
          },
          {
            code: '00000054',
            desc: 'National Center of Vegetation Cover',
            addtionalAttribute1: 'المركز الوطني لتنمية الغطاء النباتي ومكافحة التصحر',
          },
          {
            code: '00000056',
            desc: 'National Center for Wildlife',
            addtionalAttribute1: 'المركز الوطني لتنمية الحياة الفطرية',
          },
          {
            code: '00000057',
            desc: 'Saudi Authority for Intellectual Property',
            addtionalAttribute1: 'الهيئة السعودية للملكية الفكرية',
          },
          {
            code: '00000060',
            desc: 'National Center for Environmental Compliance',
            addtionalAttribute1: 'المركز الوطني للرقابة على الإلتزام البيئي',
          },
          {
            code: '00000061',
            desc: 'Council of Health Insurance',
            addtionalAttribute1: 'مجلس الضمان الصحي',
          },
          {
            code: '00000062',
            desc: 'General Authority for Competition',
            addtionalAttribute1: 'الهيئة العامة للمنافسة',
          },
        ],
        dateCompareOperation: null,
        hijriType: null,
        onlyHijri: null,
        billIdType: null,
        integrationTagName: 'ViolationsByCategory.IssuingEntityID',
        requiredInPaymentOrRefund: 'both',
        minAmount: null,
        maxAmount: null,
        hintAr: 'جهة الاصدار',
        hintEn: 'Issuing Entity',
      },
      {
        orderIndex: '4',
        index: 'ViolationsByCategory.ViolationCategoryId',
        value: null,
        type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
        allowedValues: null,
        minWidth: 4,
        maxWidth: 4,
        required: true,
        label: 'Category',
        lOVType: '265',
        parentIndex: 'ViolationsByCategory.IssuingEntityID',
        childIndex: null,
        lovFilter1: null,
        lovFilter2: null,
        lovFilter3: null,
        lovList: null,
        dateCompareOperation: null,
        hijriType: null,
        onlyHijri: null,
        billIdType: null,
        integrationTagName: 'ViolationsByCategory.ViolationCategoryId',
        requiredInPaymentOrRefund: 'both',
        minAmount: null,
        maxAmount: null,
        hintAr: 'التصنيف',
        hintEn: 'Category',
      },
      {
        orderIndex: '5',
        index: 'Beneficiary.OfficialId',
        value: null,
        type: DYNAMIC_FIELDS_TYPES.NUMBER,
        allowedValues: null,
        minWidth: 10,
        maxWidth: 10,
        required: true,
        label: 'Violator ID',
        lOVType: null,
        parentIndex: null,
        childIndex: null,
        lovFilter1: null,
        lovFilter2: null,
        lovFilter3: null,
        lovList: null,
        dateCompareOperation: null,
        hijriType: null,
        onlyHijri: null,
        billIdType: null,
        integrationTagName: 'Beneficiary.OfficialId',
        requiredInPaymentOrRefund: 'refund',
        minAmount: null,
        maxAmount: null,
        hintAr: 'رقم هوية المخالف',
        hintEn: 'Violator ID',
      },
      {
        orderIndex: '6',
        index: 'Beneficiary.OfficialIdType',
        value: null,
        type: DYNAMIC_FIELDS_TYPES.LIST_OF_VALUE,
        allowedValues: null,
        minWidth: 1,
        maxWidth: 32,
        required: true,
        label: 'ID Type',
        lOVType: '315',
        parentIndex: null,
        childIndex: null,
        lovFilter1: null,
        lovFilter2: null,
        lovFilter3: null,
        lovList: [
          {
            code: 'BIS',
            desc: 'Business ID',
            addtionalAttribute1: 'رقم المنشأة',
          },
          {
            code: 'IQA',
            desc: 'Iqama ID',
            addtionalAttribute1: 'رقم الإقامة',
          },
          {
            code: 'NAT',
            desc: 'National ID',
            addtionalAttribute1: 'رقم الهوية الوطنية',
          },
          {
            code: 'PAS',
            desc: 'GCC Passport',
            addtionalAttribute1: 'رقم جواز خليجي',
          },
        ],
        dateCompareOperation: null,
        hijriType: null,
        onlyHijri: null,
        billIdType: null,
        integrationTagName: 'Beneficiary.OfficialIdType',
        requiredInPaymentOrRefund: 'refund',
        minAmount: null,
        maxAmount: null,
        hintAr: 'رقم هوية المخالف',
        hintEn: 'Violator ID',
      },
    ],
    billNumberMaximumWidth: 10,
    showbillNumbertHint: false,
    billNumberHint: 'Violator ID',
    billNumberMinimumWidth: 10,
    billNumberLabel: 'Violator ID',
    customerIdType: {
      fieldIndex: 'BeneficiaryId.OfficialIdType',
      value: '1',
    },
    customerIdNumber: {
      fieldIndex: 'BeneficiaryId.OfficialId',
      value: '1092103737',
    },
  },
  successfulResponse: true,
};

export default getDynamicFieldsMockResponse2;
