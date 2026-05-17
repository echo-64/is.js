import is from '../core.mjs';

/**
 * Checks if the value is `null`.
 *
 * @param {object} [options]
 * @param {boolean} [options.string] - if `true`, also accepts `'null'`
 *
 * @returns {boolean}
 *
 * @example
 * is(null).null()                 // true
 * is('null').null({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.null = function (options) {
  const native = () => typeof this.actual === 'object' && this.actual === null;
  const string = () => this.string({ empty: false }) && this.actual === 'null';
  return options?.string === true ? native() || string() : native();
}

export default is;
