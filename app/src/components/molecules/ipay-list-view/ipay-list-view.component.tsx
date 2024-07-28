import icons from '@app/assets/icons';
import { IPayFlatlist, IPayIcon, IPayImage, IPayView } from '@app/components/atoms';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayList, IPayNoResult } from '@components/molecules';
import React from 'react';
import { IPayListViewProps } from './ipay-list-view.interface';
import listViewStyles from './ipay-list-view.style';

const IPayListView: React.FC<IPayListViewProps> = ({
  testID,
  list,
  selectedListItem,
  onPressListItem,
  isItem,
  noRecordMessage,
  noRecordIcon,
}) => {
  const { colors } = useTheme();
  const styles = listViewStyles(colors);
  const selectedIcon = (text: string) => (selectedListItem && selectedListItem === text) || false;
  const iconComponent = (text: string) =>
    selectedListItem && selectedListItem === text ? (
      <IPayIcon icon={icons.tick_mark_default} size={20} color={colors.primary.primary500} />
    ) : undefined;

  return (
    <IPayView testID={`${testID}-list-view`} style={[styles.container, styles]}>
      {list.length ? (
        <IPayFlatlist
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <IPayList
              textStyle={styles.titleStyle}
              title={item.text}
              isShowIcon={selectedIcon(item.text)}
              icon={iconComponent(item.text)}
              isShowLeftIcon={item.image}
              leftIcon={item.image && <IPayImage image={item.image} style={styles.listImg} />}
              onPress={() => {
                if (isItem) {
                  onPressListItem(item);
                } else {
                  onPressListItem(item.text);
                }
              }}
            />
          )}
          style={styles.listContainer}
        />
      ) : (
        <IPayView style={styles.noRecordContainer}>
          <IPayNoResult
            containerStyle={styles.noRecordWrapper}
            message={noRecordMessage}
            showIcon
            icon={noRecordIcon}
            iconSize={40}
            iconColor={colors.primary.primary800}
          />
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayListView;
