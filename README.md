This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

```bash
# Run the app on Android in production mode
npm run android:prod

# Run the app on Android in pre-production mode
npm run android:preprod

# Run the app on Android in development mode
npm run android:dev

# Run the app on Android in user acceptance testing (UAT) mode
npm run android:uat

# Run the app on Android in system integration testing (SIT) mode
npm run android:sit
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

```bash
# Run the app on iOS in development mode
npm run ios:dev

# Run the app on iOS in production mode
npm run ios:prod

# Run the app on iOS in pre-production mode
npm run ios:preprod

# Run the app on iOS in user acceptance testing (UAT) mode
npm run ios:uat

# Run the app on iOS in system integration testing (SIT) mode
npm run ios:sit
```

### Other scripts for Lingting and testing

```bash
# Run ESLint to lint all JavaScript files
npm run lint

# Run ESLint to lint all JavaScript files and fix issues automatically
npm run lint:fix

# Run Jest to execute tests
npm test
```


If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.



### Packages used in AlinmaPay

Dependencies:
@react-native-async-storage/async-storage: Asynchronous storage library for React Native.
@react-navigation/bottom-tabs: Bottom tab navigator for React Navigation.
@react-navigation/native: Core React Navigation library for native mobile apps.
@react-navigation/native-stack: Stack navigator for React Navigation in native mobile apps.
@react-navigation/stack: Stack navigator for React Navigation.
@reduxjs/toolkit: Toolkit for efficient Redux development, providing utilities to simplify Redux logic.
@types/crypto-js: TypeScript types for CryptoJS library.
@types/lodash: TypeScript types for lodash utility library.
axios: Promise-based HTTP client for the browser and Node.js.
crypto-js: JavaScript library for cryptography.
form-data: Library to create form data objects for HTTP requests.
i18next: Internationalization framework for JavaScript applications.
react: JavaScript library for building user interfaces.
react-i18next: Internationalization for React applications using i18next.
react-native: JavaScript framework for building native mobile applications.
react-native-config: Library for accessing configuration variables in React Native apps.
react-native-gesture-handler: Gesture recognition library for React Native.
react-native-reanimated: React Native library for building smooth animations.
react-native-screens: React Native library for managing screens.
react-native-vector-icons: Icon library for React Native.
react-navigation: Routing and navigation library for React Native apps.
react-redux: Official React bindings for Redux.
redux-persist: Library for persisting and rehydrating a Redux store.
yarn: Package manager for JavaScript.

DevDependencies:
@babel/core: Core Babel functionality for transpiling JavaScript.
@babel/preset-env: Babel preset for compiling modern JavaScript down to ES5.
@babel/runtime: Babel runtime for helpers and polyfills.
@eslint/eslintrc: ESLint configuration package.
@eslint/js: ESLint shared settings for JavaScript files.
@react-native/babel-preset: Babel preset for React Native projects.
@react-native/eslint-config: ESLint configuration for React Native projects.
@react-native/metro-config: Metro configuration for React Native projects.
@react-native/typescript-config: TypeScript configuration for React Native projects.
@types/react: TypeScript types for React.
@types/react-native-vector-icons: TypeScript types for react-native-vector-icons.
@types/react-test-renderer: TypeScript types for React test renderer.
@typescript-eslint/eslint-plugin: ESLint plugin for TypeScript.
@typescript-eslint/parser: ESLint parser for TypeScript.
babel-jest: Babel integration for Jest.
babel-plugin-module-resolver: Babel plugin for module resolution.
eslint: JavaScript linter.
eslint-config-airbnb-base: ESLint configuration based on Airbnb's style guide for JavaScript.
eslint-config-airbnb-typescript: ESLint configuration based on Airbnb's style guide for TypeScript.
eslint-config-standard-with-typescript: ESLint configuration based on JavaScript Standard Style with TypeScript support.
eslint-plugin-import: ESLint plugin for linting import/export syntax.
eslint-plugin-n: ESLint plugin for enforcing Node.js best practices.
eslint-plugin-prettier: ESLint plugin for integrating Prettier.
eslint-plugin-promise: ESLint plugin for linting promises.
eslint-plugin-react: ESLint plugin for linting React code.
globals: Library for defining global variables in ESLint configurations.
jest: Testing framework for JavaScript projects.
prettier: Code formatter for JavaScript/TypeScript/HTML/CSS.
react-test-renderer: React test renderer for testing React components.
typescript: Programming language for building large-scale JavaScript applications.