import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is null,
 * with optional behavior for string null
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers the string null "null"
 * as valid null matches
 *
 * @returns {boolean}
 *
 * @example
 * is(null).null() // true
 * is('null').null({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.null = function (options) {
  const native = () => typeof this.actual === 'object' && this.actual === null;
  const string = () => this.string({ empty: false }) && this.actual === 'null';
  return options?.string === true ? native() || string() : native();
}

export default is;
