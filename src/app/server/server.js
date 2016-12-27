/* eslint no-console: ["error", { allow: ["log", "error"] }] */
import 'babel-polyfill';

import Hapi from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import config from '../../config/config';

// import { LogLevel, hapiLogstashProcessor } from 'alfa-services/src/lib/hapi-logstash';

// import jwt, { JwtOptions } from './jwt-auth';
// import jwt, { JwtOptions } from 'corporate-services/src/server/jwt-auth';

// import createServices from './services';
import pluginProxyAssets from '../plugins/proxy-assets';
import pluginStaticAssets from '../plugins/static-assets';
import echoApiPlugin from '../plugins/api/echo-plugin';
import loggerTransport from '../plugins/api/logger-plugin';


// import healthmonitor from './plugins/api/healthmonitor';
import logger from '../plugins/logger';

let crumb = require('crumb');
let RequestID = require('hapi-request-id');

// config.useMocks && require('./mock/mock');

const PROXY_ASSETS = config.proxyAssets;
const BASE_PATH = config.app.basePath;

let server = new Hapi.Server();
// let services = createServices(server);

let plugins = [
    RequestID,
    { register: logger.good, options: logger.options },
    { register: loggerTransport },
    { register: echoApiPlugin },
   // { register: jwt },
   // { register: healthmonitor() },
    { register: crumb, options: { key: 'ft-csrf', restful: true } }
];

if (PROXY_ASSETS) {
    plugins.push(
        h2o2,
        { register: pluginProxyAssets, options: PROXY_ASSETS }
    );
} else {
    plugins.push(
        inert,
        { register: pluginStaticAssets, options: { basePath: BASE_PATH } }
    );
}
server.connection({
    port: config.server.port,
    routes: {
        security: { xframe: true, noSniff: false }
    }

});

server.register(plugins, function (error) {
    // server.auth.strategy('default', 'remote-jwt', false, {
    //         serviceUrl: config.services.jwt,
    //         tokenCookie: config.auth.tokenCookie,
    //         tokenParam: config.auth.tokenParam,
    //         devAccess: config.auth.devAccess,
    //         devAccessParam: config.auth.devAccessParam,
    //         devAccessCookie: config.auth.devAccessCookie,
    //         externalSystemCode: config.externalSystemCode,
    //         contextRoot: BASE_PATH,
    //         logger: (server)
    //     });
    //
    // server.auth.default('default');

    if (error) {
        throw error;
    }

    server.start((error) => {
        if (error) {
            console.error(`Server start failed: ${error.toString()}`);
            throw error;
        }
        console.log('Environment: ', config.env);
        console.log(`Server is running: ${server.info.uri}...`);
    });
});
