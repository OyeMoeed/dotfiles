import { successIconAnimation } from '@app/assets/lottie';
import {
  IPayFlatlist,
  IPayFootnoteText,
  IPayIcon,
  IPayLinearGradientView,
  IPayLottieAnimation,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import { IPayButton, IPayGradientText } from '@app/components/molecules';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import { buttonVariants } from '@app/utilities/enums.util';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { IPayStatusSuccessProps, ItemProps } from './ipay-status-success.interface';
import statusSuccessStyles from './ipay-status-success.style';

const IPayStatusSuccess: React.FC<IPayStatusSuccessProps> = ({
  testID,
  style,
  headingText = 'Withdraw Successfully',
  transactionAmount,
  data,
  linkButton,
  linkBottonText,
  linkButtonIcon,
  onPressLinkButton,
  primaryButton,
  primaryButtonText,
  primaryButtonIcon,
  onPressPrimaryButton,
}) => {
  const { colors } = useTheme();
  const styles = statusSuccessStyles(colors);
  const localizationText = useLocalization();
  const headingTextGradientColors = [colors.tertiary.tertiary500, colors.primary.primary450];

  const renderItem = ({ item }: ItemProps) => (
    <IPayView style={styles.dataCardView}>
      <IPayFootnoteText regular text={item.title} color={colors.natural.natural900} />
      <IPayView style={styles.detailsView}>
        <IPaySubHeadlineText regular text={item.subTitle} color={colors.primary.primary800} />
        {item.icon && (
          <IPayView style={styles.icon}>
            <IPayIcon icon={item.icon} size={18} color={colors.primary.primary500} />
          </IPayView>
        )}
      </IPayView>
    </IPayView>
  );

  return (
    <IPayView style={[styles.container, style]} testID={`${testID}-status-success`}>
      <IPayLinearGradientView
        style={styles.innerLinearGradientView}
        gradientColors={[colors.primary.primary50, colors.secondary.secondary50]}
      >
        <IPayView style={styles.headerView}>
          <IPayLottieAnimation source={successIconAnimation} style={styles.successIcon} />
          <IPayView style={styles.linearGradientTextView}>
            <IPayGradientText
              yScale={moderateScale(10)}
              text={headingText}
              gradientColors={headingTextGradientColors}
              style={styles.gradientTextSvg}
              fontSize={styles.linearGradientText.fontSize}
              fontFamily={styles.linearGradientText.fontFamily}
            />
            <IPaySubHeadlineText
              text={`${transactionAmount || 1000} ${localizationText.COMMON.SAR}`}
              style={styles.headlineText}
            />
          </IPayView>
        </IPayView>

        <IPayView style={styles.dataView}>
          <IPayFlatlist
            style={{ flex: 1 }}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            itemSeparatorStyle={styles.itemSeparatorStyle}
            renderItem={renderItem}
          />
        </IPayView>
        {(linkButton || primaryButton) && (
          <IPayView style={styles.buttonsView}>
            {linkButton && (
              <IPayButton
                onPress={onPressLinkButton}
                btnType={buttonVariants.LINK_BUTTON}
                large
                btnText={linkBottonText}
                leftIcon={linkButtonIcon}
              />
            )}
            {primaryButton && (
              <IPayButton
                onPress={onPressPrimaryButton}
                btnType={buttonVariants.PRIMARY}
                large
                btnText={primaryButtonText}
                leftIcon={primaryButtonIcon}
              />
            )}
          </IPayView>
        )}
      </IPayLinearGradientView>
    </IPayView>
  );
};

export default IPayStatusSuccess;
