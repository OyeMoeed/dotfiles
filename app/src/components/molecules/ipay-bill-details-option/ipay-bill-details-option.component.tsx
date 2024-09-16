import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayIcon,
  IPayImage,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useLocalization from '@app/localization/hooks/localization.hook';
import useTheme from '@app/styles/hooks/theme.hook';
import React from 'react';
import IPayList from '../ipay-list/ipay-list.component';
import { useToastContext } from '../ipay-toast/context/ipay-toast-context';
import { ToastRendererProps } from '../ipay-toast/ipay-toast.interface';
import { IPayBillDetailsOptionProps, OptionItem } from './ipay-bill-details-option.interface';
import sadadFooterComponentStyles from './ipay-bill-details-option.style';
import { copyText } from '@app/utilities/clip-board.util';
import { toastTypes } from '@app/utilities/enums.util';

const IPayBillDetailsOption: React.FC<IPayBillDetailsOptionProps> = ({
  testID,
  style,
  data,
  headerData,
  optionsStyles,
  listStyles,
  showHeader = true,
}) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const localizationText = useLocalization();
  const { showToast } = useToastContext();

  const renderToast = ({ title, subTitle, icon, toastType, displayTime }: ToastRendererProps) => {
    showToast(
      {
        title,
        subTitle,
        toastType,
        isShowRightIcon: false,
        leftIcon: icon || <IPayIcon icon={icons.copy_success} size={18} color={colors.natural.natural0} />,
      },
      displayTime,
    );
  };

  const onPressDefault = (item: OptionItem) => {
    copyText(item.value);
    renderToast({
      title: localizationText.TOP_UP.REF_NUMBER_COPIED,
      icon: <IPayIcon icon={icons.copy_success} size={24} color={colors.natural.natural0} />,
      toastType: toastTypes.INFORMATION,
    });
  };

  const renderOption = ({ item }: { item: OptionItem }) => {
    const { label, value, icon, onPressIcon = onPressDefault } = item;

    return (
      <IPayList
        containerStyle={[styles.heightStyles, optionsStyles]}
        title={label}
        detailText={value}
        detailTextStyle={styles.detailsText}
        isShowIcon
        icon={<IPayIcon icon={icon} color={colors.primary.primary500} />}
        onPressIcon={onPressIcon}
      />
    );
  };

  return (
    <IPayView testID={`${testID}-bill-details`} style={[styles.gradientView, style]}>
      {showHeader && (
        <IPayView style={styles.rowStyles}>
          <IPayImage image={headerData?.companyImage} style={styles.listLeftImg} />
          <IPayView>
            <IPaySubHeadlineText style={styles.title} color={colors.natural.natural900} text={headerData?.title} />
            <IPayCaption2Text
              color={colors.natural.natural900}
              text={headerData?.companyDetails}
              style={styles.textStyle}
            />
          </IPayView>
        </IPayView>
      )}
      <IPayFlatlist
        style={[styles.detailsFlex, listStyles]}
        scrollEnabled
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderOption}
      />
    </IPayView>
  );
};

export default IPayBillDetailsOption;
