import terser from '@rollup/plugin-terser';
export default {
    input: 'index.mjs',
    output: {
      file: 'public/bundle.js',
      format: 'esm',
    },
    plugins: [terser()]
  };