import is from '../core.mjs';
import json5 from 'json5';

/**
 * Checks if `is.prototype.actual` is object,
 * with optional behavior for string object
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers the string object "{...}"
 * as valid object matches
 *
 * @returns {boolean}
 *
 * @example
 * is({a: 1}).object() // true
 * is('{a: 1}').object({string: true}) // true
 * is('{"a": "1"}').object({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.object = function (options) {
  try {
    const parsed =
      options?.string === true && this.string()
        ? json5.parse(this.actual)
        : this.actual;

    return is.object(parsed);
  } catch {
    return false;
  }
};

export default is;
