var winston = require('winston');
var moment = require('moment');

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  json: false,
  colorize: true,
  timestamp: true,
})

if (process.env.NODE_ENV === 'production') {
  winston.add(winston.transports.File, {
    name:'file.errors', 
    filename: './logs/errors.log',
    level: 'warn', 
    timestamp: true,
    json: true, 
    maxsize: 5242880, 
    maxFiles: 5 
  });
}

module.exports = winston;