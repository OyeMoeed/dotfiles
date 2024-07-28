import {
  IPayCaption2Text,
  IPayFlatlist,
  IPayIcon,
  IPayImage,
  IPaySubHeadlineText,
  IPayView,
} from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
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
}) => {
  const { colors } = useTheme();
  const styles = sadadFooterComponentStyles(colors);
  const renderOption = ({ item }: { item: OptionItem }) => {
    const { label, value, icon, onPressIcon } = item;

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
      {headerData && (
        <IPayView style={styles.rowStyles}>
          <IPayImage image={headerData.companyImage} style={styles.listLeftImg} />
          <IPayView>
            <IPaySubHeadlineText text={headerData.title} />
            <IPayCaption2Text text={headerData.companyDetails} style={styles.textStyle} />
          </IPayView>
        </IPayView>
      )}
      <IPayFlatlist style={styles.detailsFlex} scrollEnabled={false} data={data} renderItem={renderOption} />
    </IPayView>
  );
};

export default IPayBillDetailsOption;
