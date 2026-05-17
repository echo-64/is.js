import is from '../core.mjs';

/**
 * Checks if the value is of type `expected`. The fluent version of `is.type()`.
 *
 * @param {Specific} expected - the type to check against, e.g. `'string'`, `'boolean'`
 * @param {object} [options]
 * @param {boolean} [options.string] - if `true`, reads into string content like `is.type()` does by default
 * @returns {boolean}
 *
 * @example
 * is('value').oftype('string')             // true
 * is(true).oftype('boolean')               // true
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
