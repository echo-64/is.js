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
 * Figures out what a value actually is. Pass `expected` to check against a specific type, or omit it to get the type back as a string.
 *
 * By default reads into string content — `'1'` comes back as `'number'`, `'null'` as `'null'`.  
 * Pass `{ string: false }` to enable Literal Mode, which treats strings as strings but still
 * correctly identifies `null`, arrays, regexes and other complex structures.
 *
 * @template {Specific} Expected
 *
 * @param {*} object - the value to check
 * @param {Expected} [expected] - the type to check against, e.g. `'array'`, `'null'`
 * @param {{string: boolean}} [options] - whether to read into string content (`true`, default) or treat strings literally (`false`).
 *
 * @example
 * // Smart Inference (Default)
 * is.type('hello'); // 'string'
 * is.type([1, 2, 3]); // 'array'
 * is.type('{"number": "8"}'); // 'object' (JSON)
 * is.type('{number: 8}'); // 'object' (JSON5)
 * is.type('54848'); // 'number'
 * is.type(/abc/); // 'regexp'
 * is.type(null); // 'null'
 *
 * // Literal Mode
 * is.type('123', { string: false }); // 'string'
 * is.type('true', { string: false }); // 'string'
 * is.type('[1, 2, 3]', { string: false }); // 'string'
 * is.type([1, 2, 3], { string: false }); // 'array'
 *
 * @returns {Expected extends Specific ? object is SpecificMap[Expected] : Specific | 'unknown'}
 * @throws {TypeError} - if `expected` is not a valid type string, or if `options` is not an object
 *
 * @since 1.0.0
 * @version 2.0.0
 */
is.type = function (object, expected, options) {
  const validTypes = [
    'string',
    'number',
    'boolean',
    'symbol',
    'undefined',
    'null',
    'object',
    'function',
    'array',
    'regexp',
  ];

  if (is.object(expected)) {
    if (typeof options === 'undefined') {
      options = expected;
      expected = undefined;
    }
  }

  if (!is.object(options) && typeof options !== 'undefined') {
    throw new TypeError("is.type: 'options' must be an object");
  }

  options = {
    string: options?.string ?? true,
  };

  if (typeof expected === 'string') {
    if (expected === '' || !validTypes.includes(expected)) {
      throw new TypeError(
        `is.type: 'expected' must be a non-empty string representing a valid type: ${validTypes.toString()}`,
      );
    } else if (expected === 'string' && typeof object === 'string') {
      return true;
    } else {
      return parse(object) === expected;
    }
  }

  if (typeof expected !== 'undefined') {
    throw new TypeError(
      `is.type: 'expected' must be a non-empty string representing a valid type: ${validTypes.toString()}`,
    );
  }

  return parse(object);

  function parse(object) {
    const type = is(object);
    const { string } = options;

    if (type.number({ string })) {
      return 'number';
    } else if (type.boolean({ string })) {
      return 'boolean';
    } else if (type.array({ string })) {
      return 'array';
    } else if (type.object({ string })) {
      return 'object';
    } else if (type.function()) {
      return 'function';
    } else if (type.symbol()) {
      return 'symbol';
    } else if (type.regexp()) {
      return 'regexp';
    } else if (type.null({ string })) {
      return 'null';
    } else if (type.undefined({ string })) {
      return 'undefined';
    } else if (type.string()) {
      return 'string';
    } else {
      return 'unknown';
    }
  }
};

export default is;
