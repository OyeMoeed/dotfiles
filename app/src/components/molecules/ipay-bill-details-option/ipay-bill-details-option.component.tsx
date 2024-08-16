import icons from '@app/assets/icons';
import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayIcon,
  IPayImage,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { copyText } from '@app/utilities/clip-board.util';
import React from 'react';
import IPayList from '../ipay-list/ipay-list.component';
import { IPayBillDetailsOptionProps, OptionItem } from './ipay-bill-details-option.interface';
import sadadFooterComponentStyles from './ipay-bill-details-option.style';

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

  const onPressCopy = (refNo: string) => {
    copyText(refNo);
  };
  const renderOption = ({ item }: { item: OptionItem }) => {
    const { label, value, icon, onPressIcon } = item;

    const onPressRefNumber = () => {
      if (icon === icons.copy) {
        onPressCopy(value);
      }
    };

    return (
      <IPayList
        containerStyle={[styles.heightStyles, optionsStyles]}
        title={label}
        detailText={value}
        detailTextStyle={styles.detailsText}
        isShowIcon
        icon={<IPayIcon icon={icon} color={colors.primary.primary500} />}
        onPressIcon={onPressRefNumber || onPressIcon}
      />
    );
  };

  return (
    <IPayView testID={`${testID}-bill-details`} style={[styles.gradientView, style]}>
      {showHeader && (
        <IPayView style={styles.rowStyles}>
          <IPayImage image={headerData?.companyImage} style={styles.listLeftImg} />
          <IPayView>
            <IPaySubHeadlineText color={colors.natural.natural900} text={headerData?.title} />
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
