import is from '../core.mjs';

/**
 * Validates if `object` is a plain object
 *
 * @param {*} object - The object to check
 * @returns {boolean}
 *
 * @example
 * is.object({ a: 1 })        // true
 * is.object(new Something()) // false`
 *
 * @memberOf is
 * @static
 * @since 1.0.0
 */
is.object = function (object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    is.representation(object, '[object Object]')
  );
};

export default is;
