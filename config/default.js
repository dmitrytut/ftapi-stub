var projectName = process.env.PROJECT_NAME || 'ftapi-stub';
const SERVICES_HOST = process.env.HOST || process.env.SERVICE_HOST || 'localhost';
const useMocks = process.env.APP_MOCKS==1;
const appId = 'ftapi-stub-id';
module.exports = {
    appId: appId,
    demoNotification: true,
    useMocks,
    server: {
        port: 8080
    },
    app: {
        basePath: 'ftapi-stub'
    },
    store: {
        middlewares: {
            logger: true
        }
    },
    loging:{
        logstash: {
            enabled: false,
            port: 5959,
            host: SERVICES_HOST,
            meta: {
                app_id: appId,
                host: SERVICES_HOST
            }
        },
        logingLevel: {log: '*'}
    },
    auth: {
        tokenCookie: 'token',
        tokenParam: 'token',
        devAccessParam: 'profileId',
        devAccessCookie: 'profileId'
    },
    services: {
        //jwt: 'http://',
        /*accounts: {
            host: SERVICES_HOST,
            port: 80,
            endpoint: `/${projectName}-accounts-api/accounts`
        },*/
        echo: {
            method:'GET',
            host:'localhost',
            path:'/api/echo/{echoParam}',
            url:`http://${SERVICES_HOST}/echo/{echoParam}`
        },
        logger: {
            method:'POST',
            host:'localhost',
            path:'/api/logger'
        }
    //     stmt: {
    //         types: {
    //             method: 'GET',
    //             host: 'localhost',
    //             path: '/api/stmt/types',
    //             url: `http://${SERVICES_HOST}/ufr-stmt-app/stmt/types`
    //         },
    //         history: {
    //             method: 'GET',
    //             host: 'localhost',
    //             path: '/api/stmt/orders',
    //             url: `http://${SERVICES_HOST}/ufr-stmt-app/stmt/orders`
    //         },
    //         generate: {
    //             method: 'POST',
    //             host: 'localhost',
    //             path: '/api/stmt/order/{stmt_type}',
    //             url: `http://${SERVICES_HOST}/ufr-stmt-app/stmt/order/{stmt_type}`
    //         },
    //         stmt: {
    //             method: 'GET',
    //             host: 'localhost',
    //             path: '/api/stmt/order/{stmt_order_id}',
    //             url: `http://${SERVICES_HOST}/ufr-stmt-app/stmt/order/{stmt_order_id}`
    //         }
    //     }
    }
};
