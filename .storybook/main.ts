const path = require('path');

/** @type{import("@storybook/react-webpack5").StorybookConfig} */
export default {
  stories: ['../app/src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToAlias: {
          'react-native-linear-gradient': 'react-native-web-linear-gradient'
        }
      }
    }
  ],
  webpackFinal: async (config) => {
    // Find the rule handling SVG files and exclude it
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    // Add a new rule to handle SVGs with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },

  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true }
  },

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // speeds up storybook build time
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true
    }
  },
  docs: {
    autodocs: true
  }
};
