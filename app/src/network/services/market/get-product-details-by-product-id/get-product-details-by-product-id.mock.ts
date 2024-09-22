/* eslint-disable max-len */
import { GetProductDetailsByProductIdMockProps } from './get-product-details-by-product-id.interface';

const getProductDetailsByProductIdMock: GetProductDetailsByProductIdMockProps = {
  status: {
    code: 'I000000',
    type: 'SUCCESS',
    desc: 'retail.msg.default.success',
    sessionReference: 'SSPAYCedb9b22031ed46cdaa02fa6a7459313b',
    requestReference: '01009971995759254413',
  },
  response: {
    products: [
      {
        desc: 'ريزر جولد - 10 دولار (المتجر ',
        productId: '2648',
        imageUrl: 'https://src.ocstaging.net/opt/tmp/onecard/images/product/bitaqty_image/2648',
        merchant: '283851',
        merchantDesc: 'أمل الشعوب',
        merchantIconUrl: 'https://www.alinma.com/ADS/evoucher/Merchant_Logos/283851.png',
        priceCurrency: 'SAR',
        priceCurrencyDesc: 'ريال سعودي',
        priceCurrencyIconUrl: 'https://www.alinma.com/ADS/channels/retail/assets/images/currencies/SAR.svg',
        vatPercentage: 0,
        priceBeforeVat: 56,
        vat: 64.4,
        priceAfterVat: 64.4,
        howToUse:
          '<li>1- يمكن شحن البطاقة بعد شرائها عن طريق الضغط على الرابط التالي:<a href="http://connect.mobily.com.sa/html/">http://connect.mobily.com.sa</a> </li>\n\n<li>2- أو بالاتصال على: *1400*رقم بطاقة الشحن# .</li>\n<br><br>\n</ul>\n</ul>\n</br>\n<ul class="text">\n<li>يمكنك أيضا مشاهدة و شراء هذه البطاقات:</li>\n<li> <a href="https://www.bitaqaty.com/sa-ar/merchant/52/648104/quick-net-cards---stc">بطاقات كويك نت </a> </li>\n<li> <a href="https://www.bitaqaty.com/sa-ar/merchant/52/115402/sawa-cards">بطاقات شحن سوا </a> </li>\n<li> <a href="https://www.bitaqaty.com/sa-ar/merchant/52/310619/zain---saudi-arabia">بطاقات شحن زين السعوديه </a> </li>\n</ul>\n</br>',
      },
      {
        desc: 'كارت بقيمة 250 نقطة',
        productId: '2649',
        imageUrl: 'https://src.ocstaging.net/opt/tmp/onecard/images/product/bitaqty_image/2649',
        merchant: '283851',
        merchantDesc: 'أمل الشعوب',
        merchantIconUrl: 'https://www.alinma.com/ADS/evoucher/Merchant_Logos/283851.png',
        priceCurrency: 'SAR',
        priceCurrencyDesc: 'ريال سعودي',
        priceCurrencyIconUrl: 'https://www.alinma.com/ADS/channels/retail/assets/images/currencies/SAR.svg',
        vatPercentage: 0,
        priceBeforeVat: 97.5,
        vat: 97.5,
        priceAfterVat: 97.5,
        howToUse:
          '<li>1- يمكن شحن البطاقة بعد شرائها عن طريق الضغط على الرابط التالي:<a href="http://connect.mobily.com.sa/html/">http://connect.mobily.com.sa</a> </li>\n\n<li>2- أو بالاتصال على: *1400*رقم بطاقة الشحن# .</li>\n<br><br>\n</ul>\n</ul>\n</br>\n<ul class="text">\n<li>يمكنك أيضا مشاهدة و شراء هذه البطاقات:</li>\n<li> <a href="https://www.bitaqaty.com/sa-ar/merchant/52/648104/quick-net-cards---stc">بطاقات كويك نت </a> </li>\n<li> <a href="https://www.bitaqaty.com/sa-ar/merchant/52/115402/sawa-cards">بطاقات شحن سوا </a> </li>\n<li> <a href="https://www.bitaqaty.com/sa-ar/merchant/52/310619/zain---saudi-arabia">بطاقات شحن زين السعوديه </a> </li>\n</ul>\n</br>',
      },
    ],
  },
  successfulResponse: true,
};

export default getProductDetailsByProductIdMock;
