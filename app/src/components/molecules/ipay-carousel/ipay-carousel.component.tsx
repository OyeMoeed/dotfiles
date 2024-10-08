import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import useTheme from '@app/styles/hooks/theme.hook';
import { IPayPressable, IPayView } from '@components/atoms';
import Carousel from 'react-native-reanimated-carousel';
import { IPayCarouselProps } from './ipay-carousel.interface';
import carouselStyles from './ipay-carousel.style';

const IPayCarousel = forwardRef(
  <T,>(
    {
      testID,
      data,
      width = 300,
      height = 200,
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
      resetOnDataChange,
    }: IPayCarouselProps<T>,
    forwardedRef: React.Ref<any>,
  ): React.JSX.Element => {
    const carouselRef = useRef<any>(null);
    const { colors } = useTheme();
    const styles = carouselStyles();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentPaginationIndex, setCurrentPaginationIndex] = useState<number>(0);

    const handleChangeIndex = (index: number) => {
      setCurrentPaginationIndex(index);
      onChangeIndex?.(index);
    };

    const getDefaultIndex = () => {
      if (resetOnDataChange) {
        return currentIndex >= 0 && currentIndex < data?.length ? currentIndex : 0;
      }
      return currentIndex;
    };

    // Expose scrollToFirst method to the parent component
    useImperativeHandle(forwardedRef, () => ({
      scrollToFirst: () => {
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ index: 0 });
        }
      },
    }));

    useEffect(() => {
      if (resetOnDataChange) {
        onChangeIndex?.(0);
        setCurrentIndex(0);
      }
    }, [data, resetOnDataChange]);

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
          defaultIndex={getDefaultIndex()}
          mode={mode}
          pagingEnabled
          data={data}
          renderItem={renderItem}
          modeConfig={modeConfig}
          onProgressChange={(_, absoluteProgress) => {
            handleChangeIndex(Math.round(absoluteProgress));
          }}
        />
        {pagination && (
          <IPayView style={styles.paginationContainer}>
            {data.map((item: any, index: number) => (
              <IPayPressable
                testID={`${index}-carousel-item`}
                key={`${`${index}IPayPressable`}`}
                onPress={() => handleChangeIndex(index)}
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor:
                      index === currentPaginationIndex ? colors.primary.primary500 : colors.primary.primary200,
                  },
                  stylePagination,
                ]}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              />
            ))}
          </IPayView>
        )}
      </IPayView>
    );
  },
);

export default IPayCarousel;
