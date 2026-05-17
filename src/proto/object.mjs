import is from '../core.mjs';
import json5 from 'json5';

/**
 * Returns `true` only for plain objects, nothing else passes.
 *
 * @param {object} [options]
 * @param {boolean} [options.string] - if `true`, also accepts stringified objects like `'{a: 1}'`
 * @param {boolean} [options.empty] - if `false`, empty objects `{}` don't pass
 *
 * @returns {boolean}
 *
 * @example
 * is({ id: 10 }).object();                     // true
 * is('{"id": "10"}').object({ string: true }); // true (JSON)
 * is('{id: 10}').object({ string: true });     // true (JSON5)
 * is({}).object({ empty: false });             // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.object = function (options) {
  options = {
    string: options?.string ?? false,
    empty: options?.empty ?? true,
  };

  try {
    const parsed =
      options.string === true && this.string()
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
