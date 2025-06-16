import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is NaN, by default coerces the input to a number first
 * with optional behavior for skips coercion (exact NaN check)
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.strict] - If true, check `is.prototype.actual` is exactly `NaN`
 * without coerces to a number before checking
 * @returns {boolean}
 *
 * @example
 * is('a').nan() // true
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
