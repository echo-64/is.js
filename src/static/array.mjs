import is from '../core.mjs';

/**
 * Validates with type predicate if `object` is array
 *
 * @param {*} object - The object to check
 * @returns {object is any[]}
 *
 * @example
 * const x: unknown = ...;
 *
 * if (is.array(x)) {
 *   // x here is any[]
 * }
 *
 * @memberof is
 * @static
 * @since 1.0.0
 */
is.array = function (object) {
  return Array.isArray
    ? Array.isArray(object)
    : is.representation(object, '[object Array]');
};

export default is;
