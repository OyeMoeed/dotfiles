/* do not change this file, it is auto generated by storybook. */

import { getProjectAnnotations, prepareStories, start } from '@storybook/react-native';

import '@storybook/addon-essentials/register';
import '@storybook/addon-react-native-web/register';

const normalizedStories = [
  {
    titlePrefix: '',
    directory: './app/src/components',
    files: '**/*.stories.@(js|jsx|ts|tsx)',
    importPathMatcher: /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/,
    // @ts-ignore
    req: require.context(
      '../app/src/components',
      true,
      /^\.(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.).)*?)\/)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/
    )
  }
];

declare global {
  var view: ReturnType<typeof start>;
  var STORIES: typeof normalizedStories;
}

const annotations = [require('./preview'), require('@storybook/react-native/dist/preview')];

global.STORIES = normalizedStories;

// @ts-ignore
module?.hot?.accept?.();

if (!global.view) {
  global.view = start({
    annotations,
    storyEntries: normalizedStories
  });
} else {
  const { importMap } = prepareStories({ storyEntries: normalizedStories });

  global.view._preview.onStoriesChanged({
    importFn: async (importPath: string) => importMap[importPath]
  });

  global.view._preview.onGetProjectAnnotationsChanged({
    getProjectAnnotations: getProjectAnnotations(global.view, annotations)
  });
}

export const view = global.view;
