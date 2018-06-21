var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    name: 'js',
    context: __dirname,
    entry: './src/scripts/app.js',
    output: {
        filename: 'app.js',
        path: path.join(__dirname, '/dist'),
        publicPath: 'dist/'
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: false
    },
    module: {
        // preLoaders: [{
        //     test: /\.js$/,
        //     exclude: /(node_modules|bower_components)/,
        //     loader: 'jshint-loader'
        //     // loader: 'underscore-template-loader'
        // }],
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
        }, {
            test: /\.jst$/,
            exclude: /(node_modules|bower_components)/,
            // loader: 'handlebars-loader?runtime=handlebars/runtime'
            loader: 'underscore-template-loader'
        }]
    },
    externals: {
        jquery: '$',
        lodash: '_',
        backbone: 'Backbone',
        // 'handlebars/runtime': 'Handlebars',
        // 'handlebars': 'Handlebars'
    }
}, {
    name: 'assets',
    context: __dirname,
    entry: {
        styles: [
            './src/styles/app.scss'
        ]
    },
    output: {
        filename: 'app.css',
        path: path.join(__dirname, '/dist')
    },
    module: {
        preLoaders: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'sasslint'
        }],
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }]
    },
    plugins: [
        new ExtractTextPlugin('app.css')//,
        // new webpack.ProvidePlugin({
        //     _: 'underscore'
        // })
    ],
    sasslint: {
        configFile: './.sass-lint.yml'
    }
}];
