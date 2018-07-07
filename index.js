'use strict';

process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';

require('dotenv').config();


const Control = require('./src/Control.js');

module.exports = Control;

// if __main process
if (require !== undefined && require.main === module) {
  console.log('__main__');

  const BU = require('base-util-jh').baseUtil;
  const _ = require('lodash');

  const config = require('./src/config');

  

  const config2 = _.cloneDeep(config);
  config2.locationSeq = 2064;


  const list = [config, config2];
  BU.CLI(list);

  list.forEach(currentItem => {
    const control = new Control(currentItem);
    control.p_WeatherCast.requestWeatherCast();
  });


  // control.init();
  

 
  

  process.on('uncaughtException', function (err) {
    // BU.debugConsole();
    BU.CLI(err);
    console.error(err.stack);
    console.log(err.message);
    console.log('Node NOT Exiting...');
  });
  
  
  process.on('unhandledRejection', function (err) {
    // BU.debugConsole();
    BU.CLI(err);
    console.error(err.stack);
    console.log(err.message);
    console.log('Node NOT Exiting...');
  });
}