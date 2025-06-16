import is from '../core.mjs';

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
 * @param {Specific} expected - The `object` expected type
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

export default is;
