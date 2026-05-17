import is from '../core.mjs';

/**
 * Checks if the value is empty. Works for strings, arrays, and objects.
 *
 * @param {Object} [options]
 * @param {boolean} [options.string] - if `true`, also checks stringified arrays and objects
 * @throws {TypeError} if the value is not a string, array, or object
 * @returns {boolean}
 *
 * @example
 * is('').empty()                   // true
 * is([]).empty()                   // true
 * is({}).empty()                   // true
 * is('{}').empty({ string: true }) // true
 *
 * @memberof is
 * @instance
 * @since 1.2.0
 */
is.prototype.empty = function (options) {
  options = {
    string: options?.string ?? false,
  };

  const actual_type = is(this.actual);

  if (actual_type.array(options)) {
    return actual_type.not.array({ ...options, empty: false });
  } else if (actual_type.object(options)) {
    return actual_type.not.object({ ...options, empty: false });
  } else if (actual_type.string()) {
    return actual_type.not.string({ empty: false });
  } else {
    throw new TypeError(
      `empty: value must be a string, array or object, but received ${is.type(this.actual)}`,
    );
  }
};

export default is;
