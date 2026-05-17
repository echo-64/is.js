import is from '../core.mjs';

/**
 * Checks if the value is a function.
 *
 * @returns {boolean}
 *
 * @example
 * is(function () {}).function(); // true
 * is(() => {}).function();       // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.function = function () {
  return (
    typeof this.actual === 'function' &&
    this.representation('[object Function]')
  );
};

export default is;
