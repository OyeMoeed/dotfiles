import { NavigationContainerRef } from '@react-navigation/core';
import { CommonActions, StackActions } from '@react-navigation/native';

/**
 * Reference to the top-level navigator.
 */
let navigator: NavigationContainerRef<any> | null = null;

/**
 * Sets the top-level navigator reference.
 * @param {NavigationContainerRef<any>} navigatorRef - Reference to the top-level navigator.
 */
const setTopLevelNavigator = (navigatorRef: NavigationContainerRef<any> | null): void => {
  navigator = navigatorRef;
};

/**
 * Navigates to a specified route.
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params] - Parameters to pass to the route.
 */
const navigate = (routeName: string, params?: object): void => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name: routeName,
        params,
      }),
    );
  }
};

/**
 * Pushes a new route onto the navigation stack.
 * @param {string} routeName - The name of the route to push.
 */
const push = (routeName: string): void => {
  if (navigator) {
    navigator.dispatch(
      StackActions.push({
        name: routeName,
      }),
    );
  }
};

/**
 * Goes back to the previous screen in the navigation stack.
 */
const goBack = (): void => {
  if (navigator) {
    navigator.dispatch(CommonActions.goBack());
  }
};

/**
 * Navigates to a specified route and resets the navigation stack.
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params] - Parameters to pass to the route.
 */
const navigateAndReset = (routeName: string, params?: object): void => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      }),
    );
  }
};

/**
 * Replaces the current route with a new route.
 * @param {string} routeName - The name of the route to replace with.
 * @param {object} [params] - Parameters to pass to the route.
 */
const replace = (routeName: string, params?: object): void => {
  if (navigator) {
    navigator.dispatch(StackActions.replace(routeName, params));
  }
};

/**
 * Pops the last `n` screens and replaces them with a new screen.
 *
 * @param {string} routeName - The name of the new route to navigate to.
 * @param {number} n - The number of screens to pop.
 * @param {object} [params] - Parameters to pass to the new route.
 */
const popAndReplace = (routeName: string, n: number, params?: object): void => {
  if (navigator) {
    // First pop the last n screens
    navigator.dispatch(StackActions.pop(n));

    // Then replace the current screen with the new one
    navigator.dispatch(StackActions.replace(routeName, params));
  }
};

/**
 * Pops all screens from the stack except the first one.
 */
const popToTop = (): void => {
  if (navigator) {
    navigator.dispatch(StackActions.popToTop());
  }
};

/**
 * Resets the navigation stack to the specified route.
 * @param {string} routeName - The name of the route to reset to.
 */
const resetNavigation = (routeName: string, params?: object): void => {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      }),
    );
  }
};

/**
 * Switches to the main stack with an initial route.
 * @param {string} initialRouteName - The initial route to navigate to.
 * @param {object} [params] - Parameters to pass to the route.
 */
const switchToMainStack = (initialRouteName: string, params?: object): void => {
  navigateAndReset(initialRouteName, params);
};

/**
 * Navigation utility functions.
 */
export {
  goBack,
  navigate,
  navigateAndReset,
  popAndReplace,
  popToTop,
  push,
  replace,
  resetNavigation,
  setTopLevelNavigator,
  switchToMainStack,
};
