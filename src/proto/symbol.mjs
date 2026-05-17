import is from '../core.mjs';

/**
 * Checks if the value is a symbol.
 *
 * @returns {boolean}
 *
 * @example
 * is(Symbol()).symbol() // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.symbol = function () {
  return (
    typeof this.actual === 'symbol' && this.representation('[object Symbol]')
  );
};

export default is;
