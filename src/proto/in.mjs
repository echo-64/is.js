import is from '../core.mjs';

/**
 * Checks if the value exists in a string, array, or object.
 *
 * @param {*} object - the target to search in
 * @param {object} [options]
 * @param {'all' | 'own'} [options.mode] - if `'own'`, only checks direct properties, not inherited ones. Defaults to `'all'`
 * @returns {boolean}
 *
 * @example
 * const str = 'a b c';
 * const arr = [1, 'a', true];
 * const abj1 = {one: 1};
 * const obj2 = Object.create(obj1);
 * obj2.tow = 2;
 *
 * is('b').in(str)                   // true
 * is('a').in(arr)                   // true
 * is('one').in(obj2)                // true
 * is('tow').in(obj2)                // true
 * is('one').in(obj2, {mode: 'own'}) // false
 * is('tow').in(obj2, {mode: 'own'}) // true
 *
 * @memberof is
 * @instance
 * @since 1.0.0
 */
is.prototype.in = function (object, options = { mode: 'all' }) {
  if (typeof object === 'string' || is.array(object)) {
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

export default is;
