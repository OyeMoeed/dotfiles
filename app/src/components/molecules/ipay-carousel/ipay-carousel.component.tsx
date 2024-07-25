import useTheme from '@app/styles/hooks/theme.hook';
import { IPayPressable, IPayView } from '@components/atoms';
import { useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { IPayCarouselProps } from './ipay-carousel.interface';
import carouselStyles from './ipay-carousel.style';

const IPayCarousel = <T,>({
  testID,
  data,
  width = 300, // Provide a default value for width
  height = 200, // Provide a default value for height
  mode,
  style,
  loop,
  autoPlay,
  autoPlayReverse,
  scrollAnimationDuration,
  pagination,
  renderItem,
  stylePagination,
  modeConfig,
  onChangeIndex,
  carouselContainerStyle,
}: IPayCarouselProps<T>): JSX.Element => {
  const carouselRef = useRef(null);
  const { colors } = useTheme();
  const styles = carouselStyles(colors);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const onPressPaging = (index: number) => {
    setCurrentIndex(index);
  };

  const handleChangeIndex = (index: number) => {
    setCurrentIndex(index);
    onChangeIndex?.(index);
  };

  return (
    <IPayView style={[styles.defaultCarousel, carouselContainerStyle]}>
      <Carousel
        testID={testID}
        ref={carouselRef}
        width={width}
        height={height}
        style={style}
        autoPlay={autoPlay}
        loop={loop}
        scrollAnimationDuration={scrollAnimationDuration}
        autoPlayReverse={autoPlayReverse}
        defaultIndex={currentIndex}
        mode={mode}
        pagingEnabled
        data={data}
        onSnapToItem={handleChangeIndex}
        renderItem={renderItem}
        modeConfig={modeConfig}
      />
      {pagination && (
        <IPayView style={styles.paginationContainer}>
          {data.map((item: any, index: number) => (
            <IPayPressable
              testID={`${index}-carousel-item`}
              key={`${index}`}
              onPress={() => onPressPaging(index)}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? colors.primary.primary500 : colors.primary.primary200 },
                stylePagination,
              ]}
            />
          ))}
        </IPayView>
      )}
    </IPayView>
  );
};

export default IPayCarousel;
