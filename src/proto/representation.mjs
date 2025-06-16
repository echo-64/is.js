import is from '../core.mjs';

/**
 * Returns either the string representation of `is.prototype.actual` (if expected is omitted)
 * or a boolean value indicating whether the string representations of `is.prototype.actual`
 * and `expected` are equal
 *
 * @overload Get
 * @returns {Representation}
 * @example
 * is('abc').representation() // '[object String]'
 *
 * @overload Compare
 * @param {Representation} expected - Object string representation e.g `"[object Boolean]"`
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
