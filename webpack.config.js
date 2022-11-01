const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
mode: 'development',
entry: './src/index.js',
devtool: 'inline-source-map',
output: {
path: path.join(__dirname, '/dist'),
filename: 'bundle.js'
},
devtool: 'inline-source-map',
devServer: {
static: './dist',
},
module: {
rules: [
    {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
    },
    {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
    },
    {
        test: /\.(obj|png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [
            {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'test/'
              }
            },
        ],
    },
    {
        test: /\.(obj|png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    },
    {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            'css-loader',
        ],
    },
]
},
resolve: {
extensions: ['.tsx', '.ts', '.js', '.png', '.obj'],
},
plugins:[
new HtmlWebpackPlugin({
template: './src/index.html'
})
]
}