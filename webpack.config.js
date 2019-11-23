const {join} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: join(__dirname, 'index.jsx'),
    output: {
        path: join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader',

            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                 test: /\.(png|svg|jpg|gif)$/,
                 use: [
               'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Test application',
            template: 'index.html'
        }),
    ]

};
