import React from 'react';
import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayImage,
  IPayPressable,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useConstantData from '@app/constants/use-constants';
import SummaryType from '@app/enums/summary-type';
import useLocalization from '@app/localization/hooks/localization.hook';
import { navigate } from '@app/navigation/navigation-service.navigation';
import ScreenNames from '@app/navigation/screen-names.navigation';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities';
import { buttonVariants } from '@app/utilities/enums.util';
import IPayButton from '../ipay-button/ipay-button.component';
import { CategoriesItem, IPayOrdersCardProps } from './ipay-orders-card-interface';
import IPayOrdersCardStyle from './ipay-orders-card.style';

const IPayOrdersCard: React.FC<IPayOrdersCardProps> = ({ testID, data }) => {
  const { colors } = useTheme();
  const styles = IPayOrdersCardStyle(colors);
  const { productDetailData } = useConstantData();
  const localizationText = useLocalization();

  const handleClickOnCopy = (step: number, textToCopy: string) => {
    copyText(textToCopy);
  };

  const purchaseAgain = () => navigate(ScreenNames.REQUEST_SUMMARY, { screen: SummaryType.ORDER_SUMMARY });
  const renderItem = ({ item }: { item: CategoriesItem }) => {
    const { image, amount, title, coupon, code, purchase, date } = item;
    const onPressView = () =>
      navigate(ScreenNames.SHOP_DETAILS, {
        details: productDetailData,
        heading: localizationText.SHOP.PRODUCT_DETAILS,
      });

    return (
      <IPayView>
        <IPayPressable testID={`${testID}-all-orders`} style={styles.itemContainer}>
          <IPayView style={styles.cardContainer}>
            <IPayView style={styles.cardBackground}>
              <IPayView style={styles.cardRow}>
                <IPayImage image={image} style={styles.image} resizeMode="contain" />
                <IPayView style={styles.textView}>
                  <IPaySubHeadlineText
                    color={colors.primary.primary900}
                    text={`${localizationText.COMMON.SAR} ${amount}`}
                  />
                  <IPayFootnoteText regular={false} text={title} color={colors.natural.natural900} />
                  <IPayView style={styles.couponRow}>
                    <IPayCaption2Text text={coupon} color={colors.natural.natural700} />
                    <IPayCaption2Text regular={false} text={code} color={colors.natural.natural900} />
                    <IPayPressable onPress={handleClickOnCopy}>
                      <IPayIcon icon={icons.copy} color={colors.primary.primary500} size={12} />
                    </IPayPressable>
                  </IPayView>
                  <IPayView style={styles.dateRow}>
                    <IPayCaption2Text regular text={purchase} />
                    <IPayCaption2Text regular text={date} />
                  </IPayView>
                </IPayView>
              </IPayView>
              <IPayView style={styles.buttonRow}>
                <IPayButton
                  btnType={buttonVariants.OUTLINED}
                  btnStyle={styles.buttonStyles}
                  onPress={onPressView}
                  btnIconsDisabled
                  btnText="SHOP.VIEW_PRODUCT"
                  small
                />
                <IPayButton
                  btnType={buttonVariants.PRIMARY}
                  btnStyle={styles.buttonStyles}
                  btnIconsDisabled
                  onPress={purchaseAgain}
                  btnText="SHOP.PURCHASE_AGAIN"
                  small
                />
              </IPayView>
            </IPayView>
          </IPayView>
        </IPayPressable>
      </IPayView>
    );
  };
  return <IPayFlatlist style={styles.flex} renderItem={renderItem} data={data} />;
};

export default IPayOrdersCard;
