import is from '../core.mjs';
import json5 from 'json5';

/**
 * Checks if `is.prototype.actual` is array,
 * with optional behavior for string array and empty ones
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers
 * the string array `"[...]"` as valid array matches
 * @param {boolean} [options.empty] - If false, considers
 * empty array `[]` as invalid array matches
 * @returns {boolean}
 *
 * @example
 * is(['A']).array() // true
 * is('[1]').array({string: true}) // true
 * is([]).array({empty: false}) // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.array = function (options = {}) {
  options = {
    string: options.string ?? false,
    empty: options.empty ?? true,
  };

  try {
    const parsed =
      options?.string === true && this.string()
        ? json5.parse(this.actual)
        : this.actual;

    return options.empty === true
      ? is.array(parsed)
      : is.array(parsed) && parsed.length > 0;
  } catch {
    return false;
  }
};

export default is;
