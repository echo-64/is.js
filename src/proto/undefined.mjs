import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is undefined,
 * with optional behavior for string undefined
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers the string undefined "undefined"
 * as valid undefined matches
 * @returns {boolean}
 *
 * @example
 * is().undefined() // true
 * is(undefined).undefined() // true
 * is('undefined').undefined({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.undefined = function (options) {
  const stringUndefined = () =>
    this.string({ empty: false }) && this.actual === 'undefined';

  return options?.string === true
    ? typeof this.actual === 'undefined' || stringUndefined()
    : typeof this.actual === 'undefined';
};

export default is;
