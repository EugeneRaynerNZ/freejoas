import React from 'react';
import {Environment} from './config';

const logLevel = Environment.REACT_APP_NODE_ENV === 'development' ? 'debug' : 'warning';

/**
 * Logger utility for handling different log levels.
 */
const Logger = {
  /**
   * Log info messages if log level is debug.
   * @param {string} message - The message to log.
   */
  info: (message) => {
    if (logLevel === 'debug') {
      console.info(`INFO: ${message}`);
    }
  },

  /**
   * Log warning messages if log level is warning or debug.
   * @param {string} message - The message to log.
   */
  warning: (message) => {
    if (logLevel === 'debug' || logLevel === 'warning') {
      console.warn(`WARNING: ${message}`);
    }
  },

  /**
   * Log error messages always.
   * @param {string} message - The message to log.
   */
  error: (message) => {
    console.error(`ERROR: ${message}`);
  }
};

export default Logger;
