import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'

export default {
    input: './src/index.js',
    output: {
        file: 'index.js',
        format: 'umd',
        name: 'url',
        globals: { 'uuid': 'uuid' }
    },
    external: [ 'uuid' ],
    plugins: [
        json({ compact: true }),
        babel({ exclude: 'node_modules/**' })
    ]
}