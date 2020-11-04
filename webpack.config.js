const path = require('path')

module.exports = {
    entry: './esm/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'picasso.min.js',
        library: 'picasso',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    resolve: {
        fallback: {
            
        }
    },   
    mode: 'production',
    devtool: 'source-map'
}
