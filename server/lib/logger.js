const pino = require('pino');

// Log levels https://github.com/pinojs/pino/issues/123
const levels = ['fatal', 'error', 'warn', 'info', 'debug', 'silent'];

class Logger {
  constructor(logLevel = 'warn') {
    if (!levels.includes(logLevel)) {
      throw new Error(`Unknown log level ${logLevel}`);
    }
    this.logLevel = logLevel;
    this.logger = pino({
      name: 'sqlpad-app',
      level: logLevel
    });
  }

  setLevel(logLevel) {
    if (!levels.includes(logLevel)) {
      throw new Error(`Unknown log level ${logLevel}`);
    }
    this.logger = pino({
      name: 'sqlpad-app',
      level: logLevel
    });
  }

  fatal(...args) {
    this.logger.fatal(...args);
  }

  error(...args) {
    this.logger.error(...args);
  }

  warn(...args) {
    this.logger.warn(...args);
  }

  info(...args) {
    this.logger.info(...args);
  }

  debug(...args) {
    this.logger.debug(...args);
  }
}

module.exports = Logger;
