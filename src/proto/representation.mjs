import is from '../core.mjs';

/**
 * Gets or checks the internal `[object Type]` string of a value.
 *
 * @overload Get
 * @returns {Representation}
 * @example
 * is('abc').representation() // '[object String]'
 *
 * @overload Compare
 * @param {Representation} expected - the representation string to compare against, e.g. `'[object Null]'`
 * @returns {boolean}
 * @example
 * is(null).representation("[object Null]") // true
 * is([12]).representation("[object Null]") // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.representation = function (expected) {
  return is.representation(this.actual, expected);
};

export default is;
