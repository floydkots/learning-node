let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  let envConfig = config[env];
  for (const [key, value] of Object.entries(envConfig)) {
    process.env[key] = value;
  }
}
