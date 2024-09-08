// __tests__/IPayAnimatedView.test.tsx
import { render } from '@testing-library/react-native';
import IPayAnimatedView from './ipay-animated-view.component';
import IPayView from '../ipay-view/ipay-view.component';

describe('IPayAnimatedView', () => {
  it('renders correctly with given styles and children', () => {
    const style = { backgroundColor: 'blue' };
    const animationStyles = { opacity: 0.5 };
    const { getByTestId } = render(
      <IPayAnimatedView style={style} animationStyles={animationStyles}>
        <IPayView />
      </IPayAnimatedView>,
    );

    const animatedView = getByTestId('animated-view');
    expect(animatedView.props.style).toEqual(expect.arrayContaining([style, animationStyles]));

    const child = getByTestId('child');
    expect(child).toBeTruthy();
  });
});
