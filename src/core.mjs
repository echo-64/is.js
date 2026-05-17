/**
 * Wraps a value and gives you access to all the fluent instance methods.
 *
 * @constructor
 * @param {*} actual - the value to check
 * @returns {is}
 * @version 1.0.0
 */
function is(actual) {
  if (!(this instanceof is)) {
    return new is(actual);
  }

  /**
   * The value you passed into `is()`.
   *
   * @memberof is
   * @instance
   * @since 1.0.0
   */
  this.actual = actual;

  /**
   * Negates the next method call.
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
    Object.getPrototypeOf(this),
  ).filter(i => i != 'constructor')) {
    this.not[func] = (object, options) => !this[func](object, options);
  }
}

/**
 * @callback ExtendCallBack
 * @param {*} [options]
 * @param {*} [config]
 * @returns {boolean}
 */

/**
 * @typedef {Object.<string, ExtendCallBack>} PluginFunctionMap
 */

/**
 * Adds your own custom checks to is.
 *
 * @param { PluginFunctionMap } object - a map of method names to their implementation functions
 *
 * @example
 * is.extend({
 *   url: function () {
 *     if (typeof this.actual !== 'string') {
 *       return false;
 *     }
 * 
 *     try {
 *       new URL(this.actual);
 *       return true;
 *     } catch {
 *       return false;
 *     }
 *   },
 * });
 * 
 * is('https://somewebsite.com/').url(); // true

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

export default is;
