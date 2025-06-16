import pkg from './package.json' with { type: 'json' };
import glob from 'rollup-plugin-glob';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './src/index.mjs',
    external: ['json5'],
    plugins: [glob()],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        strict: true,
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
  },
  
  {
    input: './src/index.mjs',
    output: {
      file: pkg.browser,
      name: 'is',
      format: 'iife',
      strict: true,
      sourcemap: true,
    },
    plugins: [glob(), nodeResolve(), terser()],
  }
];
