module.exports = {
    proxyAssets: false,
    devtools: true,
    app: {
        basePath: 'ftapi-stub',
        authPage: 'http://'
    },
    loging:{
        logstash: {
            host: 'ftapi-stub-test',
            meta: {
                host: 'ftapi-stub-test'
            }
        }
    },
    services: {
       // jwt: 'http://'
    }
};