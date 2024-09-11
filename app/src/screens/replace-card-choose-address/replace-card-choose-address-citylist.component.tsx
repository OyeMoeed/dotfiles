import React from 'react';

import icons from '@app/assets/icons';
import { IPayIcon } from '@app/components/atoms';
import { IPayList, IPayTextInput } from '@app/components/molecules';
import useTheme from '@app/styles/hooks/theme.hook';
import { Formik } from 'formik';
import { ReplaceCardChooseCityListComponentProps } from './replace-card-choose-address.interface';
import replaceCardStyles from './replace-card-choose-address.style';

const IPayReplaceCardChooseCityListComponent: React.FC<ReplaceCardChooseCityListComponentProps> = ({
  CITIES,
  selectedCity,
  setSelectedCity,
  onCloseBottomSheet,
}: ReplaceCardChooseCityListComponentProps) => {
  const { colors } = useTheme();
  const styles = replaceCardStyles(colors);

  const searchIcon = <IPayIcon icon={icons.search2} size={20} color={colors.primary.primary500} />;
  const checkMark = <IPayIcon icon={icons.tick_check_mark_default} size={18} color={colors.primary.primary500} />;

  return (
    <Formik initialValues={{ cityName: '' }} onSubmit={() => {}}>
      {({ handleChange, values }) => (
        <>
          <IPayTextInput
            label=""
            text={values.cityName}
            onChangeText={handleChange('cityName')}
            placeholder="COMMON.SEARCH"
            rightIcon={searchIcon}
            simpleInput
            containerStyle={styles.citySearchStyle}
            style={styles.inputStyle}
          />
          {CITIES.filter((key) =>
            values.cityName ? key.toLowerCase().includes(values.cityName.toLowerCase()) : true,
          ).map((key) => (
            <IPayList
              key={key}
              isShowIcon={selectedCity === key}
              title={key}
              icon={checkMark}
              style={styles.listStyle}
              onPress={() => {
                setSelectedCity(key);
                onCloseBottomSheet();
              }}
            />
          ))}
          {!CITIES.filter((key) => (values.cityName ? key.toLowerCase().includes(values.cityName.toLowerCase()) : true))
            .length && <IPayList title="REPLACE_CARD.NO_DATA_FOR_GIVEN_SEARCH} style={styles.listStyle" />}
        </>
      )}
    </Formik>
  );
};

export default IPayReplaceCardChooseCityListComponent;
