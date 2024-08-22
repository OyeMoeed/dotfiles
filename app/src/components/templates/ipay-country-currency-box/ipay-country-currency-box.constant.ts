import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';

const useTransferMethodsData = () => {
  const localizationText = useLocalization();
  const transferMethods = [
    {
      id: 1,
      title: '',
      data: [
        {
          id: 1,
          transferMethodName: 'AlinmaPay Direct',
          transferMethodLogo: images.alinmaPayDirectLogo,
          remitterAmount: 1,
          beneficiaryAmount: 12.8,
          totalBeneficiaryAmount: '12,690',
          fee: '10',
          remitterCurrency: localizationText.COMMON.SAR,
          beneficiaryCurrency: localizationText.COMMON.EGP,
        },
        {
          id: 1,
          transferMethodName: 'Western Union',
          transferMethodLogo: images.westernUnionLogo,
          remitterAmount: 1,
          beneficiaryAmount: 12.8,
          totalBeneficiaryAmount: '0',
          fee: '15',
          remitterCurrency: localizationText.COMMON.SAR,
          beneficiaryCurrency: localizationText.COMMON.EGP,
        },
      ],
    },
  ];
  return { transferMethods };
};

export default useTransferMethodsData;
