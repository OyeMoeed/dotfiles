import { CommonActions, StackActions } from '@react-navigation/native';

/**
 * Reference to the top-level navigator.
 */
let navigator: any;

/**
 * Sets the top-level navigator reference.
 * @param {any} navigatorRef - Reference to the top-level navigator.
 */
const setTopLevelNavigator = (navigatorRef: any): void => {
  navigator = navigatorRef;
}

/**
 * Navigates to a specified route.
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params] - Parameters to pass to the route.
 */
const navigate = (routeName: string, params?: object): void => {
  navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params
    })
  );
}

/**
 * Pushes a new route onto the navigation stack.
 * @param {string} routeName - The name of the route to push.
 */
const push = (routeName: string): void => {
  navigator.dispatch(
    StackActions.push({
      name: routeName
    })
  );
}

/**
 * Goes back to the previous screen in the navigation stack.
 */
const goBack = (): void => {
  navigator.dispatch(CommonActions.goBack());
}

/**
 * Navigates to a specified route and resets the navigation stack.
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params] - Parameters to pass to the route.
 */
const navigateAndReset = (routeName: string, params?: object): void => {
  navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }]
    })
  );
}

/**
 * Replaces the current route with a new route.
 * @param {string} routeName - The name of the route to replace with.
 * @param {object} [params] - Parameters to pass to the route.
 */
const replace = (routeName: string, params?: object): void => {
  navigator.dispatch(
    StackActions.replace({
      name: routeName,
      params
    })
  );
}

/**
 * Pops all screens from the stack except the first one.
 */
const popToTop = (): void => {
  navigator.dispatch(StackActions.popToTop());
}

/**
 * Navigation utility functions.
 */
export default {
  navigate,
  push,
  goBack,
  navigateAndReset,
  setTopLevelNavigator,
  replace,
  popToTop
};
