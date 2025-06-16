import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is boolean (true | false)
 * with optional behavior for string boolean
 *
 * @param {Object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers
 * the strings 'true' and 'false' as valid boolean matches
 * @returns {boolean}
 *
 * @example
 * is(true).boolean() // true
 * is('false').boolean({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.boolean = function (options) {
  const range = [true, false];

  if (options?.string === true) {
    range.push('true', 'false');
  }

  return range.some(i => i === this.actual);
};

export default is;
