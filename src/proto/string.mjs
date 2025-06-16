import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is string,
 * with optional behavior for empty strings
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.empty] - Match empty string "" , defaults to `true`
 * @returns {boolean}
 *
 * @example
 * is('value').string() // true
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
