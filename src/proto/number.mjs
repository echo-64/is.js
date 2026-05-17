import is from '../core.mjs';

/**
 * Checks if the value is a number.
 *
 * @param {object} [options]
 * @param {boolean} [options.string] - if `true`, also accepts stringified numbers like `'123'`
 *
 * @returns {boolean}
 *
 * @example
 * is(1).number()                 // true
 * is('2').number({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.number = function (options) {
  try {
    return options?.string === true
      ? (this.actual !== '' &&  // '' => 0
          this.not.boolean() && // true | false => 1 | 0
          this.not.array() &&   // [] => 0
          this.not.null() &&    // null => 0
          this.not.nan()) ||    // string number
          false
      : typeof this.actual === 'number';
  } catch {
    return false;
  }
};

export default is;
