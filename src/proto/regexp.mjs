import is from '../core.mjs';

/**
 * Checks if `is.prototype.actual` is RegExp
 *
 * @returns {boolean}
 *
 * @example
 * is(/[a-z]/g).regexp() // true
 * is(new RegExp(/0-9/, 'g')).regexp() // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.regexp = function () {
  return this.actual instanceof RegExp;
};

export default is;
