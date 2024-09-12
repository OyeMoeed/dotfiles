import icons from '@app/assets/icons';
import { IPayFootnoteText, IPayIcon, IPayPressable, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { useTypedSelector } from '@store/store';
import React, { useState } from 'react';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import useLocalization from '@app/localization/hooks/localization.hook';
import { IPayRearrangeSheetProps } from './ipay-re-arrange-sheet.interface';
import genratedStyles from './ipay-re-arrange-sheet.style';

const IPayRearrangeSheet: React.FC<IPayRearrangeSheetProps> = ({ testID, setTempList }): React.JSX.Element => {
  const { colors } = useTheme();
  const styles = genratedStyles(colors);
  const localizationText = useLocalization();
  const items = useTypedSelector((state) => state.rearrangement.items);
  const [tempreArrangedItems, setTempReArrangedItems] = useState<string[]>(items);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<number>) => (
    <IPayPressable
      onLongPress={drag}
      disabled={isActive}
      style={[styles.rearrangeContStyle, isActive && styles.activeBg]}
    >
      <>
        <IPayFootnoteText
          regular
          style={styles.footnoteTextStyle}
          text={localizationText.COMMON[item]}
        ></IPayFootnoteText>
        <IPayIcon icon={icons.rearrange} size={18} color={colors.primary.primary500} />
      </>
    </IPayPressable>
  );

  return (
    <IPayView testID={`${testID}-rearrange-sheet`} style={styles.listContainer}>
      <DraggableFlatList
        data={tempreArrangedItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        onDragEnd={({ data }) => {
          setTempReArrangedItems(data);
          setTempList(data);
        }}
      />
    </IPayView>
  );
};

export default IPayRearrangeSheet;
