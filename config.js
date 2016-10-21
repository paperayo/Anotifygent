var jsonfile = require('jsonfile');
var path = require('path');

var config = process.env.CONFIG;

if (!config) {
  console.error('please set CONFIG environment.')
  process.exit(1);
}

var appConfig = jsonfile.readFileSync(path.join(__dirname, config));

module.exports = appConfig;