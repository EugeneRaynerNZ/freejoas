import {Environment} from './config';

const currentLogLevel  = Environment.REACT_APP_NODE_ENV === 'development' ? 'debug' : 'warn';
/** Basic logger interface */
class ConsoleLogger {
  constructor(level) {
    this.error = console.error.bind(console);

    if (level === 'error') {
      this.warn = this.noOp;
      this.info = this.noOp;
      this.debug = this.noOp;
      return;
    }

    this.warn = console.warn.bind(console);

    if (level === 'warn') {
      this.info = this.noOp;
      this.debug = this.noOp;
      return;
    }

    this.info = console.info.bind(console);

    if (level === 'info') {
      this.debug = this.noOp;
      return;
    }

    this.debug = console.debug.bind(console);
  }

  /** No-operation function for disabled log levels */
  noOp(message, ...optionalParams) {
    // No operation performed
  }
}


/** Create and export the logger instance */
const logger = new ConsoleLogger( currentLogLevel );

// logger.debug("This is a debug message");  // Only logs in development
// logger.info("This is an info message");   // Only logs in development
// logger.warn("This is a warning message"); // Logs in both development and production
// logger.error("This is an error message"); // Logs in both development and production

export default logger;

