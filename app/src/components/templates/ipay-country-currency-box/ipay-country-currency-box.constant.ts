import images from '@app/assets/images';
import useLocalization from '@app/localization/hooks/localization.hook';

const useConverterData = () => {
  const localizationText = useLocalization();
  const converterData = [
    {
      id: 1,
      title: '',
      data: [
        {
          id: 1,
          bankName: 'AlinmaPay Direct',
          bankImage: images.alinmaPayDirectLogo,
          sar: 1,
          egp: 12.8,
          balance: '12,690',
          fee: '10',
          senderCurrency: localizationText.COMMON.SAR,
          converterCurrency: localizationText.COMMON.EGP,
        },
        {
          id: 1,
          bankName: 'Western Union',
          bankImage: images.westernUnionLogo,
          sar: 1,
          egp: 12.8,
          balance: '0',
          fee: '15',
          senderCurrency: localizationText.COMMON.SAR,
          converterCurrency: localizationText.COMMON.EGP,
        },
      ],
    },
  ];
  return { converterData };
};

export default useConverterData;
