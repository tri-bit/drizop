const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({

    template: path.join(__dirname, '/src/index.html'),
    filename:'./index.html'
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports =  {

    entry: {
        main: './src/index.js'
    },

    output: {

        library: "drizop",
        libraryTarget: "umd"
    },

    module: {

        rules: [

            {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                // Creates `style` nodes from JS strings
                'style-loader',
                // Translates CSS into CommonJS
                'css-loader',
                // Compiles Sass to CSS
                'sass-loader',
                ],
            },

            {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
            }

        ]

    },

    resolve: {
        extensions: [".js", ".jsx"]
    },

    plugins: [
        new BundleAnalyzerPlugin()
    ],

    //plugins: [ new CleanWebpackPlugin(), htmlWebpackPlugin ]



    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    }




}