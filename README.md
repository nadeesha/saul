![Build Status](https://circleci.com/gh/nadeesha/saul/tree/master.svg?style=svg) [![npm version](https://badge.fury.io/js/saul.svg)](https://badge.fury.io/js/saul)

![Saul - Introduction](https://s3.amazonaws.com/nadeesha-static/Screen+Shot+2017-08-15+at+11.47.47+PM.png)

[![Demo](https://asciinema.org/a/JVXpt7KB7qbUkgsGBDISUtXJB.png)](https://asciinema.org/a/JVXpt7KB7qbUkgsGBDISUtXJB)

# What is it?

`saul` gives you a custom DSL that will help you write test framework agnostic unit tests for your javascript functions.

A simple example might look like:

```js
// @t "should call saul when the threat is imminent"        shouldCallSaul('imminent') ~equals true
// @t "should not call saul when threat is not imminent"    shouldCallSaul('nodanger') ~equals false
function shouldCallSaul(threatLevel) {
    if (threatLevel === 'imminent') {
        return true;
    }

    return false;
}
```

# What problems does it solve?

- Avoid writing unnecessary boilerplate code for trivial tests
- Quickly test functionality with `// @t` annotations in your code
- Have your tests co-located to the functionality it tests
- Self-document your functionality with a custom DSL

# Installation

### 1. Install `saul` as a dev dependency: 

```sh
yarn add --dev saul
```

### 2. Create a `.saulrc` in the root.

example:
```js
{
    "fileGlob": "src/**/*.js",                      // files that contain the saul comments
    "customEnginesDir": "./src/custom-saul-engines" // optional: dir where you will put custom engine .js files
}
```

### 3. Invoke saul from your test. 

#### Mocha/Jasmine

If you have some mocha tests already, your `npm test` would look like: `mocha src/**/.js`. Simple add `saul`'s bin (`node_modules/.bin/saul`) right at the end:

```sh
mocha lib/*.test.js" node_modules/.bin/saul
```

#### Jest

Since jest requires a regex pattern for test files, you will have to create a file with a single file with a `require`, that will be matched by your jest `regexPattern`.

Example:
```js
require('saul'); // will run all saul tests here
```

## Usage with Babel

Any transformation that you apply to your tests will be inherited by saul when you run your tests. If you're running babel, this will include anything that you define in your local `.babelrc`.

For an instance, if you want to feed babel-transformed files to mocha, you will invoke mocha with `mocha --compilers js:babel-register`. You can simply add saul to the end of the command. (`mocha --compilers js:babel-register node_modules/.bin/saul`) - and things will Just Work™.

# DSL Specification and Examples

### expect
Assert the result using chai's expect. Comes with test spy support.

Example:
```js
// @t "appends foo" appendFoo('bar') ~expect expect(result).to.contain('foo');
// @t "has no fizz" appendFoo('bar') ~expect expect(result).to.not.contain('fizz');
export function appendFoo (someString) {
    return someString + 'foo';
}
```

With spy support:
```js
// @t "calls only once"   testEvalSpy(spy('mySpy')) ~expect spy('mySpy').calledOnce
// @t "calls with obj"    testEvalSpy(spy('myOtherSpy'), {leet: 1337}) ~expect expect(spy('myOtherSpy').args[0][1]).to.eql([{leet: 1337}])
export function testEvalSpy (fn, obj) {
  fn('foo', obj);
}
```

### matches-snapshot
Checks whether a previously saved snapshot image of the function's serialized output, matches the current output. (Saves a snapshot file on the first run - that should be checked in to the repo).

```js
// @t "should render Date" Date({dateString: '1970-03-11'}) ~matches-snapshot
export function Date(props) {
    return <div className={'mydate'}>{props.dateString}</div>
}

// @t "returns all months" getAllMonths() ~matches-snapshot
export function getAllMonths() {
    return CONSTANTS.ALL_MONTHS.join('_');
}
```


### contains
Checks whether the output contains the expected value.

Example:
```js
// @t "can concat" concatanate('string1', 'something els') ~contains 'string1'
export function concatanate (a, b) {
    return a + b;
}
```

### deep-equal
Checks whether the expected value is deep equal to actual value

Example:
```js
// @t "assigns correctly" myAssign({ foo: 1 }, { foo: 2}) ~deep-equals { foo: 2 }
export function myAssign(base, other) {
    return { ...base, ...other };
}
```

### async-deep-equal
Checks whether the expected value is deep equal to actual value returned in an asynchronous function.

Example:
```js
// @t "request result as expected" fetchSomething() ~async-deep-equals { foo: 2 }
export function fetchSomething() {
    return new Promise((resolve, reject) => {
        resolve { foo: 2 };
    });
}
```

### equals
Checks whether the expected value is equal to the actual value
```js
// @t "can sum" sum(1, 2) ~equals 3
export function sum(numOne, numTwo) {
    return numOne + numTwo;
}
```

### is-not
Checks whether the expected value is not equal to the actual value. (Opposite of `equals`)
```js
// @t "can sum" sum(1, 2) ~is-not 4
export function sum(numOne, numTwo) {
    return numOne + numTwo;
}
```

### throws
Checks whether the invokation would throw.
```js
// @t "throws on null engine" executeTest({engine: null}) ~throws Error
export executeTest(options) {
    options.engine('foobar');
}
```

And more! See: [extending saul](#extending).

# Extending `saul` <a name="extending"></a>

Then engines are the "comparator" in the tests.

```js
// @t "throws on null engine" executeTest({engine: null}) ~throws Error
                                      |                      |      └ expected value
                                      |                      |
                                      |                      └ comparator
                                      |
                                      └ actutal value
```

They are handled by the file of that name in `src/engines/`. (Example: `src/engines/throws.js`)

The "engines", are responsible for generating the tests. So, as long as you build a custom engine - it can pretty much test anything. 

The default engines can do a few cool things out of the box. (check the `src/engines/` directory). You can always write your own engines and put them in your `customEnginesDir` defined in `.saulrc`.

# Examples

Just look through this repo for `// @t` annotated tests. `saul` is tested with `saul`! :rocket:

# Contributions

Please! Here are som TODOs that need being done.

- [ ] More engines! (If you would like to contribute an engine, please take a look at the engine files at `src/engines`)
- [ ] Documentation on writing engines.
- [ ] Extending the parsers for fixtures
- [ ] Better error handling for engines
- [ ] Tests for existing engines

