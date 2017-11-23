const webpack = require('webpack');

const path = require('path');
const CURRENT_PATH = path.resolve(__dirname);
const ROOT_PATH = path.join(__dirname);
const MODULES_PATH = path.join(ROOT_PATH, './node_modules');
const BUILD_PATH = path.join(ROOT_PATH, './dist');

module.exports = {
    context: CURRENT_PATH,
    entry: {
        app: [
            './src/app.js',
            './src/bootstrap-datetimepicker/bootstrap-datetimepicker.js',
            './src/bootstrap-select/bootstrap-select.js',
            './src/icheck/icheck.js',
            './src/wued.js',
        ],
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },
    output: {
        path: BUILD_PATH,
        filename: 'script.js',
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
    ]
};