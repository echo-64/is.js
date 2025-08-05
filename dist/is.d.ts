export = is;
/**
 * `is.js`
 *
 * @constructor
 * @param {*} actual - something to check
 * @returns {is} is instance
 * @version 1.0.0
 */
declare function is(actual: any): is;
declare class is {
    /**
     * `is.js`
     *
     * @constructor
     * @param {*} actual - something to check
     * @returns {is} is instance
     * @version 1.0.0
     */
    constructor(actual: any);
    /**
     * The `actual` property is the parameter passed to `is`
     *
     * @memberof is
     * @instance
     * @since 1.0.0
     */
    actual: any;
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
    not: Omit<is, "not" | "actual">;
    /**
     * Checks if `is.prototype.actual` is array,
     * with optional behavior for string array and empty ones
     *
     * @param {object} [options] - Optional configration object
     * @param {boolean} [options.string] - If true, also considers
     * the string array `"[...]"` as valid array matches
     * @param {boolean} [options.empty] - If false, considers
     * empty array `[]` as invalid array matches
     * @returns {boolean}
     *
     * @example
     * is(['A']).array() // true
     * is('[1]').array({string: true}) // true
     * is([]).array({empty: false}) // false
     *
     * @memberof is
     * @instance
     * @since 1.0.0
     */
    array(options?: {
        string?: boolean;
        empty?: boolean;
    }): boolean;
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
    boolean(options?: {
        string?: boolean;
    }): boolean;
    /**
     * Checks if `is.prototype.actual` is an empty string, array or object
     * with optional behavior for stringified types
     *
     * @param {Object} [options] - Optional configration object
     * @param {boolean} [options.string] - If true, also matches
     * and checks stringified arrays and objects
     * @returns {boolean} True if the value is empty; otherwise, false
     * @throws {Error} If `is.actual` is not a string, array, or object
     *
     * @example
     * is('').empty() // true
     * is([]).empty() // true
     * is({}).empty() // true
     * is('{}').empty({ string: true }) // true
     *
     * @memberof is
     * @instance
     * @since 1.2.0
     */
    empty(options?: {
        string?: boolean;
    }): boolean;
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
    function(): boolean;
    /**
     * Determines if `is.prototype.actual` in `object`, `array` or `string`,
     * with optional strict check for `object` ownProperties
     *
     * @param {*} object - Object to search in
     * @param {object} [options] - Optional configration object
     * @param {'all' | 'own'} [options.mode] - If 'own' check only the object direct properties
     * (ownProperties) not inherited, defaults to 'all'
     * @returns {boolean}
     *
     * @example
     * const str = 'a b c';
     * const arr = [1, 'a', true];
     * const abj1 = {one: 1};
     * const obj2 = Object.create(obj1);
     * obj2.tow = 2;
     *
     * is('b').in(str) // true
     * is('a').in(arr) // true
     * is('one').in(obj2) // true
     * is('tow').in(obj2) // true
     * is('one').in(obj2, {mode: 'own'}) // false
     * is('tow').in(obj2, {mode: 'own'}) // true
     *
     * @memberof is
     * @instance
     * @since 1.0.0
     */
    in(object: any, options?: {
        mode?: "all" | "own";
    }): boolean;
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
    nan(options?: {
        strict?: boolean;
    }): boolean;
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
    null(options?: {
        string?: boolean;
    }): boolean;
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
    number(options?: {
        string?: boolean;
    }): boolean;
    /**
     * Checks if `is.prototype.actual` is object,
     * with optional behavior for string object and empty ones
     *
     * @param {object} [options] - Optional configration object
     * @param {boolean} [options.string] - If true, also considers
     * the string object "{...}" as valid object matches
     * @param {boolean} [options.empty] - If false, considers
     * empty object `{}` as invalid object matches
     *
     * @returns {boolean}
     *
     * @example
     * is({a: 1}).object() // true
     * is('{a: 1}').object({string: true}) // true
     * is('{"a": "1"}').object({string: true}) // true
     * is({}).object({empty: false}) // false
     *
     * @memberof is
     * @instance
     * @since 1.0.0
     */
    object(options?: {
        string?: boolean;
        empty?: boolean;
    }): boolean;
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
    oftype(expected: Specific, options?: {
        string?: boolean;
    }): boolean;
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
    regexp(): boolean;
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
    representation(): Representation;
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
    representation(expected: Representation): boolean;
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
    string(options?: {
        empty?: boolean;
    }): boolean;
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
    symbol(): boolean;
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
    undefined(options?: {
        string?: boolean;
    }): boolean;
}
declare namespace is {
    export { extend, array, object, representation, type, typeOf, ExtendCallBack, PluginFunctionMap, Representation, Specific, SpecificMap, Typeof, TypeofMap };
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
declare function extend(object: PluginFunctionMap): void;
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
declare function array(object: any): object is any[];
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
declare function object(object: any): boolean;
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
declare function representation(object: any): Representation;
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
declare function representation(object: any, expected: Representation): boolean;
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
declare function type<Expected extends Specific>(object: any): Specific | "unknown";
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
declare function type<Expected extends Specific>(object: any, expected: Expected): object is SpecificMap[Expected];
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
declare function typeOf<Expected extends Typeof>(object: any, expected: Expected): object is TypeofMap[Expected];
type ExtendCallBack = (options?: any, config?: any) => boolean;
type PluginFunctionMap = {
    [x: string]: ExtendCallBack;
};
type Representation = ("[object Type]");
type Specific = ("string" | "number" | "boolean" | "array" | "object" | "function" | "symbol" | "null" | "undefined" | "regexp");
type SpecificMap = {
    string: string;
    number: number;
    boolean: boolean;
    array: any[];
    object: object;
    function: Function;
    symbol: Symbol;
    null: null;
    undefined: undefined;
    regexp: RegExp;
};
type Typeof = ("bigint" | "boolean" | "function" | "number" | "object" | "string" | "symbol" | "undefined");
type TypeofMap = {
    bigint: bigint;
    boolean: boolean;
    function: Function;
    number: number;
    object: object;
    string: string;
    symbol: symbol;
    undefined: undefined;
};
