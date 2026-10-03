export default {
  files: ['src/**/*.css'],
  extends: ['stylelint-config-standard'],
  rules: {
    // tailwind css-first: bare string import is the convention
    'import-notation': null,
    'at-rule-prelude-no-invalid': [
      true,
      {
        ignoreAtRules: ['apply'],
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // tailwind v4 css-first at-rules
          'tailwind',
          'theme',
          'utility',
          'custom-variant',
          'plugin',
          'apply',
          'variant',
          'reference',
          'config',
          'screen',
        ],
      },
    ],
    // tailwind @utility scopes nesting, stylelint only knows @layer/@media
    'nesting-selector-no-missing-scoping-root': null,
  },
}
