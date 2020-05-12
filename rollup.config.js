import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'dist/index.js',
    output: {
        name: 'picasso',
        file: 'dist/index.all.js',
        format: 'umd',
        exports: 'named'
    },
    plugins: [
        resolve(),
        commonjs()
    ]
}
