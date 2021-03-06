const minimist = require('minimist');
const fromDefault = require('./fromDefault');
const fromEnv = require('./fromEnv');
const fromCli = require('./fromCli');
const fromFile = require('./fromFile');
const getOldConfigWarning = require('./getOldConfigWarning');

const argv = minimist(process.argv.slice(2));

const defaultConfig = fromDefault();
const envConfig = fromEnv();
const [fileConfig, warnings] = fromFile();
const cliConfig = fromCli(argv);

const all = { ...defaultConfig, ...envConfig, ...fileConfig, ...cliConfig };

// Clean string boolean values
Object.keys(all).forEach(key => {
  const value = all[key];
  if (typeof value === 'string') {
    if (value.trim().toLowerCase() === 'true') {
      all[key] = true;
    } else if (value.trim().toLowerCase() === 'false') {
      all[key] = false;
    }
  }
});

exports.get = function get(key) {
  if (!key) {
    throw new Error('key must be provided');
  }

  if (!all.hasOwnProperty(key)) {
    throw new Error(`config item ${key} not defined in configItems.js`);
  }

  return all[key];
};

exports.getValidations = () => {
  const errors = [];

  // By default dbPath will exist as empty string, which is not valid
  if (all.dbPath === '') {
    errors.push(getOldConfigWarning());
  }

  return {
    errors,
    warnings: [...warnings]
  };
};

exports.smtpConfigured = () =>
  all.smtpHost && all.smtpUser && all.smtpFrom && all.smtpPort && all.publicUrl;

exports.googleAuthConfigured = () =>
  all.publicUrl && all.googleClientId && all.googleClientSecret;
