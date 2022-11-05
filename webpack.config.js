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
        test: /\.(gltf|obj|png|jpe?g|gif|bin|ttf)$/i,
        exclude: /node_modules/,
        use: [
            {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: './resources'
              }
            },
        ],
    },
    // {
    //     test: /\.(obj|png|svg|jpg|jpeg|gif)$/i,
    //     type: 'asset/resource',
    // },
    {
        exclude: /node_modules/,
        test: /\.css$/,
        use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            'css-loader',
        ],
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {   // Specify ANTD stylesheet in node_modules, to be able to load from index.js
        include: /node_modules\/antd\/dist\/antd.css/,
        use: [
            'style-loader',
            'css-loader',
        ],
    },
]
},
resolve: {
extensions: ['.tsx', '.ts', '.js', '.png', '.obj', '.gltf', '.bin', '.ttf'],
},
plugins:[
new HtmlWebpackPlugin({
template: './src/index.html'
})
]
}