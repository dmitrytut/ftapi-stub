const path = require('path');

export let register = function (server, options, next) {
    let assetsPath = path.join(process.cwd(), '.build', 'assets');
    let routePath = path.join('/', 'assets/{resource}')

    server.route({
        method: 'GET',
        path: routePath,
        config: {
            auth: null
        },
        handler: {
            directory: {
                path: assetsPath,
                listing: false,
                lookupCompressed: true
            }
        }
    });

    next();
};

register.attributes = {
    name: 'static-assets'
};

export default register;
