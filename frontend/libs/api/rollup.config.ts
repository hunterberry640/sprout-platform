import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

console.log('using rollupconfig');

const pkg = require('./package.json');

const libraryName = pkg.name;

const buildCjsPackage = ({ env }) => {
  return {
    input: `compiled/index.js`,
    output: [
      {
        file: `dist/index.${env}.js`,
        name: libraryName,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        globals: {},
      },
    ],
    external: ['@reduxjs/toolkit', 'axios', 'lodash', 'rxjs', 'apache-arrow'], // Use Lodash, rxjs & arrow from the webapp
    plugins: [
      json(), // TODO: include: ['../../node_modules/moment-timezone/data/packed/latest.json'],
      commonjs({
        include: /node_modules/,
        namedExports: {
          'node_modules/lodash/lodash.js': [
            'flatten',
            'find',
            'upperFirst',
            'debounce',
            'isNil',
            'isNumber',
            'flattenDeep',
            'map',
            'chunk',
            'sortBy',
            'uniqueId',
            'zip',
          ],
        },
      }),
      resolve(),
      sourceMaps(),
      env === 'production' && terser(),
    ],
    onwarn: function (warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') return;
      warn(warning);
    }
  };
};
export default [buildCjsPackage({ env: 'development' }), buildCjsPackage({ env: 'production' })];
