module.exports = {
    proxyAssets: {
        host: 'localhost',
        port: 9090
    },
    devtools: true,
    auth: {
        devAccess: true
    },
    app: {
        basePath: '',
        authPage: 'http://'
    },
    loging: {
        logstash: {
            enabled: false
        }
    },
    store: {
        middlewares: {
            logger: true
        }
    },
    services: {
        //jwt: 'http://'
    }
};
