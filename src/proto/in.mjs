import is from '../core.mjs';

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

export default is;
