import config from '../../../config/config';
import good from 'good';


let stream = require('stream');
let apiConfig = config.services.logger;

export let register = function (server, options, next) {
	let { method, path } = apiConfig;
	let handler = async (request, reply) => {

	//server.log(['info'], {event_type:'LOGIN_ATTEMPT', ip: request.info.address, msg: request.payload});
	//	console.log(request)
	};

	server.route({ method, path, handler });
    return next();
};


register.attributes = {
    name: apiConfig.path
};

export default register;