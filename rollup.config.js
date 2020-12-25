import typescript from '@rollup/plugin-typescript';

export default {
  input: 'scripts/eventCore.ts',
  output: {
    dir: './',
    format: 'esm'
  },
  plugins: [typescript()],
};