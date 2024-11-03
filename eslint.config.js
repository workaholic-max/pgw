import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
    {
        files: ['src/**/*.vue', 'src/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
        },
        plugins: {
            vue: vuePlugin,
        },
        rules: {
            ...vuePlugin.configs['vue3-recommended'].rules,
            'no-console': 'warn',
            'no-debugger': 'warn',
            'vue/no-multiple-template-root': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: { max: 1 },
                    multiline: { max: 1 },
                },
            ],
            'vue/first-attribute-linebreak': [
                'error',
                {
                    singleline: 'ignore',
                    multiline: 'below',
                },
            ],
            'vue/html-closing-bracket-newline': [
                'error',
                {
                    singleline: 'never',
                    multiline: 'always',
                },
            ],
            'vue/html-indent': [
                'error',
                4,
                {
                    attribute: 1,
                    baseIndent: 1,
                    closeBracket: 0,
                    alignAttributesVertically: true,
                    ignores: [],
                },
            ],
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
        },
    },
];
