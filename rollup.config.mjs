import pkg from './package.json' with { type: 'json' };
import glob from 'rollup-plugin-glob';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.mjs',
    external: ['json5'],
    plugins: [glob(), terser()],
    output: [
      {
        format: 'cjs',
        file: pkg.main,
        strict: true,
        sourcemap: true,
      },
      {
        format: 'esm',
        file: pkg.module,
        sourcemap: true,
      },
    ],
  },

  {
    input: './src/index.mjs',
    output: [
      {
        name: 'is',
        format: 'iife',
        file: pkg.browser.default,
        strict: true,
        sourcemap: true,
      },
      {
        name: 'is',
        format: 'esm',
        file: pkg.browser.import,
        sourcemap: true,
      }
    ],
    plugins: [glob(), nodeResolve(), terser()],
  },
];
