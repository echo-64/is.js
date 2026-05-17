import is from '../core.mjs';

/**
 * Checks if the value is a string.
 *
 * @param {object} [options]
 * @param {boolean} [options.empty] - if `false`, empty strings don't pass. Defaults to `true`
 * @returns {boolean}
 *
 * @example
 * is('value').string()          // true
 * is('').string({empty: false}) // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.string = function (options = { empty: true }) {
  return options.empty === true
    ? typeof this.actual === 'string'
    : (this.actual !== '' && typeof this.actual === 'string') || false;
};

export default is;
