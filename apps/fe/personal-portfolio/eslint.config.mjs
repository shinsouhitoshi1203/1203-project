import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
    ...baseConfig,
    ...nx.configs['flat/react'],
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {
            // Do not allow console logs in production code
            'no-console':
                process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // Allow unused variables in development for debugging purposes
            'no-unused-vars':
                process.env.NODE_ENV === 'production'
                    ? 'error'
                    : [
                          'warn',
                          {
                              vars: 'all',
                              args: 'after-used',
                              ignoreRestSiblings: true,
                          },
                      ],
            // Allow debugger statements in development for debugging purposes
            'no-debugger':
                process.env.NODE_ENV === 'production' ? 'error' : 'off',
            // Allow JSX in .js files
            'react/jsx-filename-extension': [
                'error',
                { extensions: ['.js', '.jsx'] },
            ],
            // Allow importing React in .jsx files
            'react/react-in-jsx-scope': 'off',
        },
    },
];
