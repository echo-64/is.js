'use strict';

var json5 = require('json5');

/**
 * `is.js`
 *
 * @constructor
 * @param {*} actual - something to check
 * @returns {is} is instance
 * @version 1.0.0
 */
function is(actual) {
  if (!(this instanceof is)) {
    return new is(actual);
  }

  /**
   * The `actual` property is the parameter passed to `is`
   *
   * @memberof is
   * @instance
   * @since 1.0.0
   */
  this.actual = actual;

  /**
   * The `not` property has the negated version of `is.prototype`
   *
   * @example
   * const x = '';
   * is(x).string()                   // true
   * is(x).not.string()               // false
   * is(x).not.string({empty: false}) // true
   *
   * @type {Omit<is, 'not' | 'actual'>}
   * @memberof is
   * @instance
   * @since 1.0.0
   */
  this.not = {};

  for (const func of Object.getOwnPropertyNames(
    Object.getPrototypeOf(this)
  ).filter(i => i != 'constructor')) {
    this.not[func] = (object, options) => !this[func](object, options);
  }
}

/**
 * @callback ExtendCallBack
 * @param {*} [options] - Optional options parameter
 * @param {*} [config] - Optional config parameter
 * @returns {boolean}
 */

/**
 * @typedef {Object.<string, ExtendCallBack>} PluginFunctionMap
 */

/**
 * Extend `is.prototype`
 *
 * @param { PluginFunctionMap } object - plugins object
 *
 * @example
 * is.extend({
 *   uppercase: function () {
 *     return this.actual.split('').every(x => x.match(/[A-Z]/));
 *   }
 * });
 *
 * is('WORD').uppercase()     // true
 * is('Word').uppercase()     // false
 * is('Word').not.uppercase() // true
 *
 * @memberof is
 * @static
 * @since 1.0.0
 */
is.extend = function (object) {
  for (const method in object) {
    if (Object.prototype.hasOwnProperty.call(object, method)) {
      is.prototype[method] = object[method];
    }
  }
};

/**
 * Validates with type predicate if `object` is array
 *
 * @param {*} object - The object to check
 * @returns {object is any[]}
 *
 * @example
 * const x: unknown = ...;
 *
 * if (is.array(x)) {
 *   // x here is any[]
 * }
 *
 * @memberof is
 * @static
 * @since 1.0.0
 */
is.array = function (object) {
  return Array.isArray
    ? Array.isArray(object)
    : is.representation(object, '[object Array]');
};

/**
 * Validates if `object` is a plain object
 *
 * @param {*} object - The object to check
 * @returns {boolean}
 *
 * @example
 * is.object({ a: 1 })        // true
 * is.object(new Something()) // false`
 *
 * @memberOf is
 * @static
 * @since 1.0.0
 */
is.object = function (object) {
  return (
    typeof object === 'object' &&
    object !== null &&
    is.representation(object, '[object Object]')
  );
};

/**
 * @typedef { ("[object Type]") } Representation
 */

/**
 * Get the string representation of `object`
 * and optionaly compare it against `expected`
 *
 * @overload Get
 * @param {*} object - The object to check
 * @returns {Representation}
 * @example
 * is.representation(null) // '[object Null]'
 *
 * @overload Compare
 * @param {*} object - The object to check
 * @param {Representation} expected - e.g `"[object Boolean]"`
 * @returns {boolean}
 * @example
 * is.representation(true, '[object Boolean]') // true
 *
 * @memberOf is
 * @static
 * @since 1.0.0
 */
is.representation = function (object, expected) {
  const toString = Object.prototype.toString.call(object);

  return typeof expected !== 'undefined' ? toString === expected : toString;
};

/**
 * @typedef {(
 * 'string'
 * | 'number'
 * | 'boolean'
 * | 'array'
 * | 'object'
 * | 'function'
 * | 'symbol'
 * | 'null'
 * | 'undefined'
 * | 'regexp'
 * )} Specific
 */

/**
 * @typedef {{
 * string: string;
 * number: number;
 * boolean: boolean;
 * array: any[];
 * object: object;
 * function: Function;
 * symbol: Symbol;
 * null: null;
 * undefined: undefined;
 * regexp: RegExp;
 * }} SpecificMap
 */

/**
 * **How it works?**
 * > If only `object` parameter is provided, return it's specific type
 *
 * ```
 * is.type([] | "[]");      // 'array'
 * is.type({} | "{}");      // 'object'
 * is.type(1 | "2");        // 'number'
 * is.type(true | "false"); // 'boolean'
 * is.type("something");    // 'string'
 * is.type(/[0-9]/g);       // 'regexp'
 * ```
 *
 * > If `object` and `expected` are provides, returns boolean with a type predicate
 *
 * ```
 * const arg = process.argv[2];
 *
 * if ( is.type(arg, 'array') ) {
 *   // true and arg is any[]
 * }
 *
 * if ( is.type(arg, 'symbol') ) {
 *   // true and arg is symbol
 * }
 * ```
 *
 * > But wait, actually ( "{}", "[]", "2" ) are strings
 *
 * ```
 * const arg = '{a: 1}'; // 'string'
 *
 * // If `object` is of type 'string'
 * // with `expected` set to 'string'
 * // returns true, regardless it's content
 * is.type(arg, 'string') // true, with 'string' type predicate
 *
 * // via `is.prototype.str`
 * is(arg).string() // true, but no type predicate
 * ```
 *
 * **What the specific type is**
 * > For cli inputs and types wrapped in a string, try to extract and define it's type
 *
 * @template {Specific} Expected
 *
 * @overload Get
 * @param {*} object - The object whose type is to be checked
 * @returns {Specific | 'unknown'}
 *
 * @overload Compare with type predicate
 * @param {*} object - The object whose type to be checked
 * @param {Expected} expected - The `object` expected type
 * @returns {object is SpecificMap[Expected]}
 *
 * @memberOf is
 * @static
 * @since 1.0.0
 */
is.type = function (object, expected) {
  if (typeof expected === 'string') {
    if (expected === 'string' && typeof object === 'string') {
      return true;
    }

    return extract(object) === expected;
  }

  return extract(object);

  function extract(object) {
    const type = is(object);

    if (type.number({ string: true })) {
      return 'number';
    } else if (type.boolean({ string: true })) {
      return 'boolean';
    } else if (type.array({ string: true })) {
      return 'array';
    } else if (type.object({ string: true })) {
      return 'object';
    } else if (type.function()) {
      return 'function';
    } else if (type.symbol()) {
      return 'symbol';
    } else if (type.regexp()) {
      return 'regexp';
    } else if (type.null({ string: true })) {
      return 'null';
    } else if (type.undefined({ string: true })) {
      return 'undefined';
    } else if (type.string()) {
      return 'string';
    } else {
      return 'unknown';
    }
  }
};

/**
 * @typedef {(
 * 'bigint'
 * | 'boolean'
 * | 'function'
 * | 'number'
 * | 'object'
 * | 'string'
 * | 'symbol'
 * | 'undefined'
 * )} Typeof
 */

/**
 * @typedef {{
 * bigint: bigint;
 * boolean: boolean;
 * function: Function;
 * number: number;
 * object: object;
 * string: string;
 * symbol: symbol;
 * undefined: undefined;
 * }} TypeofMap
 */

/**
 * Check with type predicate if `object` is typeof `expected`
 *
 * @template {Typeof} Expected
 *
 * @param {*} object - The object whose type to be checked
 * @param {Expected} expected - The `object` expected type
 * @returns {object is TypeofMap[Expected]}
 *
 * @example
 * is.typeOf(['a'], 'object')  // true
 * is.typeOf({a: 0}, 'object') // true
 * is.typeOf(null, 'object')   // true
 * is.typeOf('xyz', 'string')  // true
 * is.typeOf(0, 'number')      // true
 * is.typeOf(false, 'boolean') // true
 *
 * @memberOf is
 * @static
 * @since 1.0.0
 */
is.typeOf = function (object, expected) {
  return typeof object === expected;
};

/**
 * Checks if `is.prototype.actual` is array,
 * with optional behavior for string array
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers
 * the string array `"[...]"` as valid array matches
 * @returns {boolean}
 *
 * @example
 * is(['A']).array() // true
 * is('[1]').array({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.array = function (options) {
  try {
    const parsed =
      options?.string === true && this.string()
        ? json5.parse(this.actual)
        : this.actual;

    return is.array(parsed);
  } catch {
    return false;
  }
};

/**
 * Checks if `is.prototype.actual` is boolean (true | false)
 * with optional behavior for string boolean
 *
 * @param {Object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers
 * the strings 'true' and 'false' as valid boolean matches
 * @returns {boolean}
 *
 * @example
 * is(true).boolean() // true
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

/**
 * Checks if `is.prototype.actual` is function
 *
 * @returns {boolean}
 *
 * @example
 * is(() => {}).function() // true
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

/**
 * Determines if `is.prototype.actual` in `object` or `array`,
 * with optional strict check for ownProperties
 *
 * @param {*} object - Object to search in
 * @param {object} [options] - Optional configration object
 * @param {'all' | 'own'} [options.mode] - If 'own' check only the object direct properties
 * (ownProperties) not inherited, defaults to 'all'
 * @returns {boolean}
 *
 * @example
 * const a = {one: 1};
 * const b = Object.create(a);
 * b.tow = 2;
 *
 * is('a').in([1, 'a', true]) // true
 * is('one').in(b) // true
 * is('tow').in(b) // true
 * is('one').in(b, {mode: 'own'}) // false
 * is('tow').in(b, {mode: 'own'}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.in = function (object, options = { mode: 'all' }) {
  if (is.array(object)) {
    return object.includes(this.actual);
  } else if (is.object(object)) {
    if (options.mode === 'own') {
      return Object.prototype.hasOwnProperty.call(object, this.actual);
    }
    return this.actual in object;
  } else {
    return false;
  }
};

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

/**
 * Checks if `is.prototype.actual` is null,
 * with optional behavior for string null
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers the string null "null"
 * as valid null matches
 *
 * @returns {boolean}
 *
 * @example
 * is(null).null() // true
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
};

/**
 * Checks if `is.prototype.actual` is number,
 * with optional behavior for string number
 *
 * @param {object} [options] - Optional configuration object
 * @param {boolean} [options.string] - If true considers string values that can be
 * converted to a number as valid otherwise checks for number type
 *
 * @returns {boolean}
 *
 * @example
 * is(1).number() // true
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

/**
 * Checks if `is.prototype.actual` is object,
 * with optional behavior for string object
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers the string object "{...}"
 * as valid object matches
 *
 * @returns {boolean}
 *
 * @example
 * is({a: 1}).object() // true
 * is('{a: 1}').object({string: true}) // true
 * is('{"a": "1"}').object({string: true}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.object = function (options) {
  try {
    const parsed =
      options?.string === true && this.string()
        ? json5.parse(this.actual)
        : this.actual;

    return is.object(parsed);
  } catch {
    return false;
  }
};

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

/**
 * Returns either the string representation of `is.prototype.actual` (if expected is omitted)
 * or a boolean value indicating whether the string representations of `is.prototype.actual`
 * and `expected` are equal
 *
 * @overload Get
 * @returns {Representation}
 * @example
 * is('abc').representation() // '[object String]'
 *
 * @overload Compare
 * @param {Representation} expected - Object string representation e.g `"[object Boolean]"`
 * @returns {boolean}
 * @example
 * is(null).representation("[object Null]") // true
 * is([12]).representation("[object Null]") // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.representation = function (expected) {
  return is.representation(this.actual, expected);
};

/**
 * Checks if `is.prototype.actual` is string,
 * with optional behavior for empty strings
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.empty] - Match empty string "" , defaults to `true`
 * @returns {boolean}
 *
 * @example
 * is('value').string() // true
 * is('').string({empty: false}) // false
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.string = function (options = { empty: true }) {
  return options.empty === true
    ? typeof this.actual === 'string'
    : (this.actual !== '' && typeof this.actual === 'string') || false;
};

/**
 * Checks if `is.prototype.actual` is symbol
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

/**
 * Checks if `is.prototype.actual` is undefined,
 * with optional behavior for string undefined
 *
 * @param {object} [options] - Optional configration object
 * @param {boolean} [options.string] - If true, also considers the string undefined "undefined"
 * as valid undefined matches
 * @returns {boolean}
 *
 * @example
 * is().undefined() // true
 * is(undefined).undefined() // true
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

module.exports = is;
//# sourceMappingURL=is.js.map
