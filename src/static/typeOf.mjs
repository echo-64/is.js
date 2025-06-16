import is from '../core.mjs';

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

export default is;
