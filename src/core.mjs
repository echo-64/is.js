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

export default is;
