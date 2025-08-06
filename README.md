# is.js

<div align='center'>
  <img src='./is.js.gif' />
</div>

This module provides utility functions for checking the type of a given value in JavaScript,
It offers functionality beyond basic typeof checks by supporting "stringified types", which likely means it can handle type checks based on string representations of types or more complex type definitions.

## Features

- **Cross-platform:** Working in both Node.js environments and web browsers.

- **Type-predicates:** It leverages TypeScript's type predicate feature to provide strong type checking for JavaScript data.

## Installation

#### NodeJs

```sh
npm install @echo-64/is.js
```

#### Browser

In your HTML file, add a `<script>` tag within the `<head>` section, linking to the local file:

```html
<head>
  <script src="dist/is.min.js"></script>
</head>
```

## Usage

```js
// commonjs
const is = require('@echo-64/is.js');

// esm
import is from '@echo-64/is.js';

// browser
<script src="is.min.js"></script>;
```

## API Reference

### `is(actual)`

- `actual` {any} the variable or expression to be type-checked
- Returns: {is}

The primary entry point for all type checks, When called with `actual`, it returns an `is` object
that provides methods and properties that allow for fluent type assertions

> ### **Static-Methods**

### `is.extend(object)`

- `object` {PluginFunctionMap} plugins object

Extends `is.prototype`

```mjs
is.extend({
  uppercase: function () {
    return this.actual.split('').every(x => x.match(/[A-Z]/));
  },
});

is('WORD').uppercase(); // true
is('Word').uppercase(); // false
is('Word').not.uppercase(); // true
```

### `is.array(object)`

- `object` {any} The object to check
- Returns: `object is any[]`

Validates with type predicate if `object` is an array

```mjs
const x: unknown = ...;

if (is.array(x)) {
  // x here is any[]
}
```

### `is.object()`

- `object` {any} the object to check
- Returns: {boolean}

Validates if `object` is a plain object

```mjs
is.object({ a: 1 }); // true
is.object(new Something()); // false`
```

### `is.representation(object[, expected])`

- `object` the object to check
- `expected` expected string representation to compare against `object` string representation
- Returns: {Representation|boolean}

Get the string representation of `object` and optionaly compare it against `expected`

```mjs
is.representation(null); // '[object Null]'
is.representation(true, '[object Boolean]'); // true
```

### `is.type(object[, expected])`

- `object` {any} the object whose type is to be checked
- `expected` {Expected} the `object` expected type
- Returns: {Specific|'unknown'|object is SpecificMap[Expected]}

**How it works?**

- If only `object` parameter is provided, return it's specific type

```mjs
is.type([] | '[]'); // 'array'
is.type({} | '{}'); // 'object'
is.type(1 | '2'); // 'number'
is.type(true | 'false'); // 'boolean'
is.type('something'); // 'string'
is.type(/[0-9]/g); // 'regexp'
```

- If `object` and `expected` are provides, returns boolean with a type predicate

```mjs
const arg = process.argv[2];

if (is.type(arg, 'array')) {
  // true and arg is any[]
}

if (is.type(arg, 'object')) {
  // true and arg is object
}
```

- But wait, actually ( `"{}"`, `"[]"`, `"2"` ) are strings

```mjs
const arg = '{a: 1}'; // 'string'

// If `object` is of type 'string'
// with `expected` set to 'string'
// returns true, regardless it's content
is.type(arg, 'string'); // true, with 'string' type predicate

// via `is.prototype.string`
is(arg).string(); // true, but no type predicate
```

- What the **specific** type is
  - when check `[]`, `{}` and `null` via `typeof` it returns `object`, in is.js the specific type for `[]` is `array` and `{}` is object, and so on
- What the **stringified** type is
  - For cli inputs, and data types that wrapped in a string (stringified type), try to extract and define it's type

### `is.typeOf(object, expected)`

- `object` {any} the object whose type to be checked
- `expected` {Expected} the `object` expected type
- Returns: {object is TypeofMap[Expected]}

Check with type predicate if the typeof `object` is the same type of `expected`

```mjs
is.typeOf(['a'], 'object'); // true
is.typeOf({ a: 0 }, 'object'); // true
is.typeOf(null, 'object'); // true
is.typeOf('xyz', 'string'); // true
is.typeOf(0, 'number'); // true
is.typeOf(false, 'boolean'); // true
```

> ### **Instance-Methods**

### `.actual`

The `actual` property is the parameter passed to `is` e.g. `is(actual)`

### `.not`

The `not` property has the negated prototype version of `is` instance methods

```mjs
const x = '';
is(x).string(); // true
is(x).not.string(); // false
is(x).not.string({ empty: false }); // true
```

### `.array([options])`

- `options` {object} optional configration object
  - `string` {boolean} If true also considers stringified array e.g. `'[1, 2]'` as valid array matches
  - `empty` {boolean} If false considers empty array `[]` as invalid array matches

Returns: {boolean}

Checks if `is.prototype.actual` is an array,
with optional behavior for stringified arrays and empty ones

```mjs
is(['A']).array(); // true
is('[1]').array({ string: true }); // true
is([]).array({ empty: false }); // false
```

### `.boolean([options])`

- `options` {object} optional configration object
  - `string` {boolean} If true, also considers `'true'` and `'false'` as valid boolean matches

Returns: {boolean}

Checks if `is.prototype.actual` is a boolean (`true` or `false`)
with optional behavior for stringified boolean

```mjs
is(true).boolean(); // true
is('false').boolean({ string: true }); // true
```

### `.empty([options])`

- `options` {object} optional configration object
  - `string` {boolean} If true, also matches and checks stringified arrays and objects

Throws: {Error} if `is.prototype.actual` is not a string, array, or object
<br />
Returns: {boolean}

Checks if `is.prototype.actual` is an empty string, array or object
with optional behavior for stringified types

```mjs
is(true).boolean(); // true
is('false').boolean({ string: true }); // true
```

### `.function()`

Returns: {boolean}

Checks if `is.prototype.actual` is a function

```mjs
is(function () {}).function(); // true
is(() => {}).function(); // true
```

### `.in(object[, options])`

- `object` {any} object to search in
- `options` {object} optional configration object
  - `mode` {'all' | 'own'} if `'own'` check only the object direct properties
    (ownProperties) not inherited, **Defaults:** 'all'

Returns: {boolean}

Determines if `is.prototype.actual` in `object`, `array` or `string`,
with optional strict check for `object` ownProperties

```mjs
const str = 'a b c';
const arr = [1, 'a', true];
const abj1 = { one: 1 };
const obj2 = Object.create(obj1);
obj2.tow = 2;

is('b').in(str); // true
is('a').in(arr); // true
is('one').in(obj2); // true
is('tow').in(obj2); // true
is('one').in(obj2, { mode: 'own' }); // false
is('tow').in(obj2, { mode: 'own' }); // true
```

### `.nan([options])`

- `options` {object} optional configration object
  - `strict` {boolean} if true, check `is.prototype.actual` is exactly `NaN`
    without coerces to a number before checking

Returns: {boolean}

Checks if `is.prototype.actual` is NaN, by default coerces the input to a number first
with optional behavior for skips coercion (exact NaN check)

```mjs
is('a').nan(); // true
is(NaN).nan({ strict: true }); // true
is('a').nan({ strict: true }); // false
```

### `.null([options])`

- `options` {object} optional configration object
  - `string` {boolean} if true, also considers the stringified null `"null"`
    as valid null matches

Returns: {boolean}

Checks if `is.prototype.actual` is null, with optional behavior for stringified null

```mjs
is(null).null(); // true
is('null').null({ string: true }); // true
```

### `.number([options])`

- `options` {object} optional configration object
  - `string` {boolean} if true, considers stringified numbers as valid, otherwise checks
    for number type

Returns: {boolean}

Checks if `is.prototype.actual` is a number, with optional behavior for stringified numbers

```mjs
is(1).number(); // true
is('2').number({ string: true }); // true
```

### `.object([options])`

- `options` {object} optional configration object
  - `string` {boolean} if true, also considers the stringified object `"{...}"`
    as valid object matches
  - `empty` {boolean} if false, considers empty object `{}` as invalid object matches

Returns: {boolean}

Checks if `is.prototype.actual` is object, with optional behavior for stringified objects and empty ones

```mjs
is({ a: 1 }).object(); // true
is('{a: 1}').object({ string: true }); // true
is('{"a": "1"}').object({ string: true }); // true
is({}).object({ empty: false }); // false
```

### `.oftype(expected[, options])`

- `expected` {Specific} the expected type of `is.prototype.actual`
- `options` {object} optional configuration object
  - `string` if true, considers stringified values as valid, otherwise checks for `expected` type

Returns: {boolean}

Check weather `is.prototype.actual` is type of `expected`, with optional stringified types matches

```mjs
is('value').oftype('string'); // true
is(true).oftype('boolean'); // true
is('1').oftype('number', { string: true }); // true
```

### `.regexp()`

Returns: {boolean}

Checks if the type of `is.prototype.actual` is `RegExp`

```mjs
is(/[a-z]/g).regexp(); // true
is(new RegExp(/0-9/, 'g')).regexp(); // true
```

### `.representation([expected])`

- `expected` {Representation} string representation of a type e.g. `"[object Boolean]"`

Returns: {Representation|boolean}

Returns either the string representation of `is.prototype.actual` (if expected is omitted)
or a boolean value indicating whether the string representations of `is.prototype.actual`
and `expected` are equal

```mjs
is('AB').representation(); // '[object String]'
is(null).representation('[object Null]'); // true
is([12]).representation('[object Null]'); // false
```

### `.string([options])`

- `options` {object} optional configration object
  - `empty` {boolean} match empty string `''`, **Default:** `true`

Returns: {boolean}

Checks if `is.prototype.actual` is a string, with optional behavior for empty strings

```mjs
is('value').string(); // true
is('').string({ empty: false }); // false
```

### `.symbol()`

Returns: {boolean}

Checks if `is.prototype.actual` is a symbol

```mjs
is(Symbol()).symbol(); // true
```

### `.undefined([options])`

- `options` {object} optional configration object
  - `string` {boolean} if true, also considers the stringified undefined as valid matches

Returns: {boolean}

Checks if `is.prototype.actual` is undefined, with optional behavior for stringified

```mjs
is().undefined(); // true
is(undefined).undefined(); // true
is('undefined').undefined({ string: true }); // true
```

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## License

[MIT License ©](./LICENSE)
