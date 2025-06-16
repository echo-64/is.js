import is from '../core.mjs';

/**
 * @typedef { ("[object Type]") } Representation
 */

/**
 * Get the string representation of `object`
 * and optionaly compare it against `expected`
 *
 * @overload Get
 * @param {*} object - The object to check
 * @returns {Representation}
 * @example
 * is.representation(null) // '[object Null]'
 *
 * @overload Compare
 * @param {*} object - The object to check
 * @param {Representation} expected - e.g `"[object Boolean]"`
 * @returns {boolean}
 * @example
 * is.representation(true, '[object Boolean]') // true
 *
 * @memberOf is
 * @static
 * @since 1.0.0
 */
is.representation = function (object, expected) {
  const toString = Object.prototype.toString.call(object);

  return typeof expected !== 'undefined' ? toString === expected : toString;
};

export default is;
