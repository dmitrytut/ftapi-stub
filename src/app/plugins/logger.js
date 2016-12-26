//import config from '../../config/config';
import good from 'good';
//import { hapiLogstashProcessor } from 'alfa-services/src/lib/hapi-logstash';

const options = {
    reporters: {
        stdoutReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', request: '*', error: '*', response: '*'}]
        }, {
            module: 'good-console'
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, 'stdout']
    }
};

    // if(config.loging.logstash.enabled) {
    // 	options.reporters = Object.assign(options.reporters, {
	 //    	logstashReporter: [{
	 //            module: 'good-squeeze',
	 //            name: 'Squeeze',
	 //            args: [{ log: '*'}]
	 //            },
	 //            {
	 //                module: 'good-logstash-tcp',
	 //                args: [{
	 //                    processor: hapiLogstashProcessor,
	 //                    disabled: !config.loging.logstash.enabled,
	 //                    meta: config.loging.logstash.meta,
	 //                    tlsOptions: {
	 //                        host: config.loging.logstash.host,
	 //                        port: config.loging.logstash.port
	 //                    }
	 //                }]
	 //            }]
	 //        }
    //     );
    // }

// export let register = function (server, options, next) {
// 	server.register({
//         good, options
// 	});
//     return next();
// };
//
// register.attributes = {
//      name: 'logger'
// };

export default { good: good, options: options };
