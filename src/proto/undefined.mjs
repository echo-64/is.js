import is from '../core.mjs';

/**
 * Checks if the value is `undefined`.
 *
 * @param {object} [options]
 * @param {boolean} [options.string] - if `true`, also accepts `'undefined'`
 * @returns {boolean}
 *
 * @example
 * is().undefined()                          // true
 * is(undefined).undefined()                 // true
 * is('undefined').undefined({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.undefined = function (options) {
  const stringUndefined = () =>
    this.string({ empty: false }) && this.actual === 'undefined';

  return options?.string === true
    ? typeof this.actual === 'undefined' || stringUndefined()
    : typeof this.actual === 'undefined';
};

export default is;
