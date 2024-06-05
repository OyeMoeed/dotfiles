import React from 'react';
import { IPayCaption1Text, IPayFootnoteText, IPayPressable, IPayView } from '@app/components/atoms';
import styles from './ipay-re-arrange-sheet.style';
import { RearrangeIcon } from '@app/assets/svgs/index';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useTypedDispatch, useTypedSelector } from '@store/store';
import { setItems } from '../../../store/slices/rearrangement-slice';
import colors from '@app/styles/colors.const';

const IPayRearrangeSheet: React.FC = ({ testID }: { testID?: string }): JSX.Element => {
  const dispatch = useTypedDispatch();
  const items = useTypedSelector((state) => state.rearrangement.items);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<number>) => {
    return (
      <IPayPressable
        onLongPress={drag}
        disabled={isActive}
        style={[styles.rearrangeContStyle, isActive && { backgroundColor: colors.natural.natural700 }]}
      >
        <>
          <IPayFootnoteText>{item}</IPayFootnoteText>
          <RearrangeIcon />
        </>
      </IPayPressable>
    );
  };

  return (
    <IPayView testID={testID} style={styles.listContainer}>
      <DraggableFlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        onDragEnd={({ data }) => dispatch(setItems(data))}
      />
    </IPayView>
  );
};

export default IPayRearrangeSheet;
