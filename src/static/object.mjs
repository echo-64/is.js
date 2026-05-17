import is from '../core.mjs';

/**
 * Returns true only for plain {} objects. Fails for null, arrays, class instances, anything that isn't a literal plain object.
 *
 * @param {*} object - the value to check
 * @returns {boolean}
 *
 * @example
 * is.object({ a: 1 })        // true
 * is.object(new Something()) // false
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
