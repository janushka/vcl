/**
 * Created by Njoku on 01.04.2015.
 */

module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/},
            {test: /\.css$/, loader: "style!css"}
        ]
    },
    devtool: "source-map"
};
