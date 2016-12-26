const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

var externals = [];

var ATL_OPTIONS = [
    'target=es6',
    'jsx=react',
    '+experimentalDecorators',
    '+experimentalAsyncFunctions',
    'instanceName=node',
    '+emitRequireType',
    '+useBabel',
    '+useCache'
].concat(externals).join('&');

var webpackConfig = Object.assign(
    {
        target: 'node',
        entry: ['./src/app/server/server.js'],
        output: {
            path: path.resolve(__dirname, '.build'),
            publicPath: '/',
            filename: 'server.js'
        },
        externals: nodeModules,
        module: {
            loaders: [
                {
                    test: /\.ejs$/,
                    loader: 'ejs-compiled'
                },
                {
                    test: /\.tsx?$/,
                    loaders: ['babel','awesome-typescript-loader?' + ATL_OPTIONS ]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop')
        ]
    }
);

webpackConfig.module.loaders.map(loader => {
    if (loader.test.toString() === /\.jsx?$/.toString()) {
        if (!IS_PRODUCTION) {
            // TODO: fix this problem after migration to react#15
            // loader.query.plugins.push('typecheck');
        }
        loader.query.plugins.push('syntax-flow', 'transform-flow-strip-types');
    }
    return loader;
});

if (!IS_PRODUCTION) {
    webpackConfig.plugins.push(
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            {
                raw: true,
                entryOnly: false
            }
        )
    );
    webpackConfig.devtool = 'source-map';
}

if (process.env.APP_MOCKS) {
     console.log('bundle builded with APP_MOCKS enabled');
    // var services = /corporate-services\/src\/server\/services\/(.*)/;
    // webpackConfig.plugins.push(
    //     // Rewrite all services to corresponding mocks
    //     new webpack.NormalModuleReplacementPlugin(services, function(info) {
    //         info.request = info.request.replace(services, 'corporate-services\/src\/server\/services-mocks\/$1');
    //     })
    // );
}

module.exports = webpackConfig;
