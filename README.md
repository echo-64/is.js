# is.js

<div align='center'>
  <img src='./is.js.gif' />
</div>

This module provides utility functions for checking the type of a given value in JavaScript,
It offers functionality beyond basic typeof checks by supporting "stringified types", which likely means it can handle type checks based on string representations of types or more complex type definitions.

## Features

* **Cross-platform:** Working in both Node.js environments and web browsers.

* **Type-predicates:** It leverages TypeScript's type predicate feature to provide strong type checking for JavaScript data.

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
const is = require("@echo-64/is.js");

// esm
import is from "@echo-64/is.js";

// browser
<script src="is.min.js"></script>
```

**See**: [docs](https://echo-64.github.io/is.js/)

## CHANGELOG

[CHANGELOG.md](./CHANGELOG.md)

## License

[MIT License ©](./LICENSE)
