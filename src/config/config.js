import deepAssign from 'deep-assign';

const env = process.env.NODE_ENV || 'development';

const defaultConfig = require('../../config/default');
const envConfig = require(`../../config/${env}`);

const config = deepAssign({}, defaultConfig, envConfig, { env });

export default config;
