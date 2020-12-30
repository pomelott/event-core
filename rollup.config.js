import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';


export default [{
  input: 'scripts/eventCore.ts',
  external: ['lodash'],
  output: {
    file: "./dist/event-emitter-tree.js",
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript()
  ]
},{
  input: 'scripts/eventCore.ts',
  external: ['lodash'],
  output: {
    file: "./dist/event-emitter-tree.esm.js",
    format: 'esm',
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript()
  ]
},{
  input: 'scripts/eventCore.ts',
  output: {
    file: "./dist/event-emitter-tree.umd.js",
    format: 'umd',
    name: "coreEvent"
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
  ]
}]