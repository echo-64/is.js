import is from '../core.mjs';

/**
 * @typedef { ("[object Type]") } Representation
 */

/**
 * Gets or checks the internal [object Type] string of a value.
 *
 * @overload Get
 * @param {*} object - the value to check
 * @returns {Representation}
 * @example
 * is.representation(null) // '[object Null]'
 *
 * @overload Compare
 * @param {*} object - the value to check
 * @param {Representation} expected - the representation string to compare against, e.g. `'[object Null]'`
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
