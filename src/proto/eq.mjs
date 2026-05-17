import is from '../core.mjs';

/**
 * Checks if the value matches any entry in the list.
 *
 * @param {any[]} values - list of values to compare against
 * @param {object} [options]
 * @param {boolean} [options.strict=false] - if true, uses `===` instead of `==`, defaults to false
 *
 * @throws {TypeError} if values not an array
 * @returns {boolean}
 *
 * @example
 * is(1).eq([1, 2, 3]);                           // true
 * is('1').eq([1, 2, 3]);                         // true
 * is('1').eq([1, 2, 3], { strict: true });       // false
 * is({ a: 1 }).eq([{ a: 1 }], { strict: true }); // false (different reference)
 *
 * @memberof is
 * @instance
 * @since 2.0.0
 */
is.prototype.eq = function (values, options) {
  if (!is.array(values)) {
    throw new TypeError('eq: the `values` argument must be an array');
  } else if (values.length === 0) {
    return false;
  }

  options = {
    strict: options?.strict ?? false,
  };

  return options.strict
    ? values.some(value => this.actual === value)
    : values.some(value => this.actual == value);
};

export default is;
