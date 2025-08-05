import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is an empty string, array or object
 * with optional behavior for stringified types
 *
 * @param {Object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also matches
 * and checks stringified arrays and objects
 * @returns {boolean} True if the value is empty; otherwise, false
 * @throws {Error} If `is.actual` is not a string, array, or object
 *
 * @example
 * is('').empty() // true
 * is([]).empty() // true
 * is({}).empty() // true
 * is('{}').empty({ string: true }) // true
 *
 * @memberof is
 * @instance
 * @since 1.2.0
 */
is.prototype.empty = function (options = {}) {
  options = {
    string: options.string ?? false,
  };

  const actual_type = is(this.actual);

  if (actual_type.array(options)) {
    return actual_type.not.array({ ...options, empty: false });
  } else if (actual_type.object(options)) {
    return actual_type.not.object({ ...options, empty: false });
  } else if (actual_type.string()) {
    return actual_type.not.string({ empty: false });
  } else {
    throw new Error(
      `Invalid 'is.actual' type: expected a string, an array or an object`
    );
  }
};

export default is;
