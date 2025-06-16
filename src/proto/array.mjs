import is from '../core.mjs';
import json5 from 'json5';

/**
 * Checks if `is.prototype.actual` is array,
 * with optional behavior for string array
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers
 * the string array `"[...]"` as valid array matches
 * @returns {boolean}
 *
 * @example
 * is(['A']).array() // true
 * is('[1]').array({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.array = function (options) {
  try {
    const parsed =
      options?.string === true && this.string()
        ? json5.parse(this.actual)
        : this.actual;

    return is.array(parsed);
  } catch {
    return false;
  }
};

export default is;
