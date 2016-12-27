
import config from '../../../config/config';
//import { handleError } from './error-handler';

// const UserDataTypes = require('corporate-services/src/gen-nodejs/user_data_types');
// const EntitiesTypes = require('corporate-services/src/gen-nodejs/entities_types');

let apiConfig = config.services.echo;

export let register = function (server, options, next) {
    let handler = async (request, reply) => {

        // if(!request.auth.credentials.profileId){
        //     reply(handleError(null, 'Ошибка аутентификации. Пользователь не идентифицирован'));
        // } else {
        try {
            server.log(
                ['info'],
                `echo /api/echo ip ${request.raw.req.connection.remoteAddress} echoParam ${request.params.echoParam }`);
                // let userData = new UserDataTypes.UserData({
                //     id: request.auth.credentials.profileId
                // });
                //
                // let customer = new EntitiesTypes.Customer({
                //     eqId: request.params.pinEq
                // });
                //
                // await options.permissions.validateCustomerAccess(
                //     userData,
                //     customer,
                //     null //[UserTypes.Role.INSPECTOR]
                // );
                //
                // let accounts = await getAccounts(request, apiConfig);
            reply(request.params.echoParam);
        } catch (e) {
            console.log(e);
                //reply(handleError(e));
        }
       // }
    }

    let { method, path } = apiConfig;

    server.route({ method, path, handler });
    return next();
}

register.attributes = {
    name: apiConfig.path
}


export default register;
