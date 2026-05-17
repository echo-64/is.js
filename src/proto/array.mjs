import is from '../core.mjs';
import json5 from 'json5';

/**
 * Checks if the value is an array.
 *
 * @param {object} [options]
 * @param {boolean} [options.string] - if `true`, also accepts stringified arrays like `'[1, 2]'`
 * @param {boolean} [options.empty] - if `false`, empty arrays don't pass
 * @returns {boolean}
 *
 * @example
 * is(['A']).array()               // true
 * is('[1]').array({string: true}) // true
 * is([]).array({empty: false})    // false
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
