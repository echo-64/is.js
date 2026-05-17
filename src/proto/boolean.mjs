import is from '../core.mjs';

/**
 * Checks if the value is a boolean.
 *
 * @param {Object} [options]
 * @param {boolean} [options.string] - if `true`, also accepts `'true'` and `'false'` as valid
 * @returns {boolean}
 *
 * @example
 * is(true).boolean()                  // true
 * is('false').boolean({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.boolean = function (options) {
  const range = [true, false];

  if (options?.string === true) {
    range.push('true', 'false');
  }

  return range.some(i => i === this.actual);
};

export default is;
