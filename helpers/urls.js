const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));
const envs = require('../config/envs.json');

async function getUrlByEnv() {
  const env = process.env.test_env || 'prod';
  return envs[env];
}

module.exports = { getUrlByEnv };
