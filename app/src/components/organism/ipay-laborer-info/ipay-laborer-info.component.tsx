import { IPayFlatlist, IPayFootnoteText, IPaySubHeadlineText, IPayView } from '@app/components/atoms';
// @ts-ignore: import of react-native-round-flags types are not supported
import Flag from 'react-native-round-flags';

import useTheme from '@app/styles/hooks/theme.hook';
import { FC } from 'react';
import laborerInfoStyles from './ipay-laborer-info.styles';
import { IPayLaborerInfoProps, Item } from './ipay-laborer-info.interface';

const IPayLaborerInfo: FC<IPayLaborerInfoProps> = ({ userData }) => {
  const { colors } = useTheme();
  const styles = laborerInfoStyles(colors);

  const renderInfo = ({ item }: { item: Item }) => (
    <IPayView style={styles.cardStyle}>
      <IPayFootnoteText style={styles.personalInfoCardTitleText} regular text={item?.text} />
      <IPayView style={styles.detailsContainer}>
        <IPaySubHeadlineText
          regular
          style={styles.subHeadline}
          numberOfLines={2}
          shouldTranslate={false}
          text={item.details}
        />
        {item?.key && <Flag code={item?.key} style={styles.countryFlagImg} />}
      </IPayView>
    </IPayView>
  );

  return (
    <IPayView style={styles.container}>
      <IPayFootnoteText regular style={styles.containerHeadings} text="MUSANED.LABORER_INFO" />
      <IPayFlatlist
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={styles.listStyle}
        testID="laborer-details"
        data={userData}
        renderItem={renderInfo}
        keyExtractor={(item) => item.key}
      />
    </IPayView>
  );
};

export default IPayLaborerInfo;
