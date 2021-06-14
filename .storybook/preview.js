import { themes } from "@storybook/theming"

export const parameters = {
  option: {
    storySort: {
      method: 'alphabetical',
      locales: 'en-US',
    },
  },
  actions: {
    argTypesRegex: "^on[A-Z].*",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
}
