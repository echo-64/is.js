import is from '../core.mjs';

/**
 * Checks if the value is `NaN`. By default coerces the value to a number first.
 *
 * @param {object} [options]
 * @param {boolean} [options.strict] - if `true`, checks for exactly `NaN` without coercing first. Defaults to `false`
 * @returns {boolean}
 *
 * @example
 * is('a').nan()               // true
 * is(NaN).nan({strict: true}) // true
 * is('a').nan({strict: true}) // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.nan = function (options) {
  return options?.strict === true
    ? Number.isNaN(this.actual)
    : isNaN(this.actual);
};

export default is;
