import is from '../core.mjs';
import json5 from 'json5';

/**
 * Checks if `is.prototype.actual` is object,
 * with optional behavior for string object and empty ones
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers
 * the string object "{...}" as valid object matches
 * @param {boolean} [options.empty] - If false, considers
 * empty object `{}` as invalid object matches
 *
 * @returns {boolean}
 *
 * @example
 * is({a: 1}).object() // true
 * is('{a: 1}').object({string: true}) // true
 * is('{"a": "1"}').object({string: true}) // true
 * is({}).object({empty: false}) // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.object = function (options = {}) {
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
      ? is.object(parsed)
      : is.object(parsed) && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
};

export default is;
