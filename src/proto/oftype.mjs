import is from '../core.mjs';

/**
 * Check weather `is.prototype.actual` is type of `expected`,
 * with optional string type matches
 *
 * @param {Specific} expected - The expected type
 * @param {object} [options] - Optional configuration object
 * @param {boolean} [options.string] - If true considers string values that can be
 * converted to `expected` type as valid otherwise checks for `expected` type
 * @returns {boolean}
 *
 * @example
 * is('value').oftype('string') // true
 * is(true).oftype('boolean') // true
 * is('1').oftype('number', {string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.oftype = function (expected, options) {
  switch (expected) {
    case 'string':
      return this.string();
    case 'boolean':
      return options?.string === true
        ? this.boolean({ string: true })
        : this.boolean();
    case 'number':
      return options?.string === true
        ? this.number({ string: true })
        : this.number();
    case 'array':
      return options?.string === true
        ? this.array({ string: true })
        : this.array();
    case 'object':
      return options?.string === true
        ? this.object({ string: true })
        : this.object();
    case 'function':
      return this.function();
    case 'symbol':
      return this.symbol();
    case 'regexp':
      return this.regexp();
    case 'null':
      return options?.string === true
        ? this.null({ string: true })
        : this.null();
    case 'undefined':
      return options?.string === true
        ? this.undefined({ string: true })
        : this.undefined();
    default:
      return false;
  }
};

export default is;
