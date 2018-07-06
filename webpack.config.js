var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlReplaceWebpackPlugin = require("html-replace-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
 

module.exports = [{
    name: "js",
    context: __dirname,
    entry: "./src/scripts/app.js",
    output: {
        filename: "./asset/app.js",
        path: path.join(__dirname, "/dist"),
        publicPath: "dist/"
    },
    resolve: {
        extensions: ["", ".js", ".json"]
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: false
    },
    module: {
        loaders: [{
            test: /\.html$/,
            exclude: /(node_modules|bower_components)/,
            loader: "underscore-template-loader"
        }],
    },
    externals: {
        jquery: "$",
        lodash: "_",
        backbone: "Backbone"
    },
    devServer: {
        historyApiFallback: {
            index: "./src/index.html"
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: false
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: "dist/vendor",
                replacement: "vendor"
            },
            {
                pattern: "dist/asset",
                replacement: "asset"
            },
        ]),
        new CopyWebpackPlugin([
            { from: "node_modules/jquery/dist/jquery.min.js", to: "vendor" },
            { from: "node_modules/lodash/lodash.min.js", to: "vendor" },
            { from: "node_modules/backbone/backbone-min.js", to: "vendor" },
            { from: "node_modules/bootstrap/dist/js/bootstrap.min.js", to: "vendor" }
        ])
    ],
}, {
    name: "css",
    context: __dirname,
    entry: {
        styles: [
            "./src/styles/app.scss"
        ]
    },
    output: {
        filename: "./asset/app.css",
        path: path.join(__dirname, "/dist"),
        publicPath: "dist/"
    },
    module: {
        preLoaders: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            loader: "sasslint"
        }],
        loaders: [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        }]
    },
    plugins: [
        new ExtractTextPlugin("./asset/app.css")
    ],
    sasslint: {
        configFile: "./.sass-lint.yml"
    }
}];
