![](https://circleci.com/gh/nadeesha/saul/tree/master.svg?style=svg) 

<img src="https://s3.amazonaws.com/nadeesha-static/Screen+Shot+2017-08-15+at+11.47.47+PM.png" alt="saul intro" style="height: 50px;"/>

![Demo](https://s3.amazonaws.com/nadeesha-misc/saul+demo+gif.gif)

# What is it?

Saul likes to generate self-documenting tests for your pure functions.

A simple example might look like:

```js
// @t "should call saul when the threat is imminent"        shouldCallSaul('imminent') equals true
// @t "should not call saul when threat is not imminent"    shouldCallSaul('nodanger') equals false
function shouldCallSaul(threatLevel) {
    if (threatLevel === 'imminent') {
        return true;
    }

    return false;
}
```

# What more can it do?

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
// @t Date({dateString: '1970-03-11'}) ~matches-snapshot
export function Date(props) {
    return <div className={'mydate'}>{props.dateString}</div>
}

// @t getAllMonths() ~matches-snapshot
export function getAllMonths() {
    return CONSTANTS.ALL_MONTHS.join('_');
}
```


### contains
Checks whether the output contains the expected value.

Example:
```js
// @t "can concat" concatanate('string1', 'something els') contains 'string1'
export function concatanate (a, b) {
    return a + b;
}
```

### deep-equal
Checks whether the expected value is deep equal to actual value

Example:
```js
// @t "assigns correctly" myAssign({ foo: 1 }, { foo: 2}) deep-equals { foo: 2 }
export function myAssign(base, other) {
    return { ...base, ...other };
}
```

### equals
Checks whether the expected value is equal to the actual value
```js
// @t "can sum" sum(1, 2) equals 3
export function sum(numOne, numTwo) {
    return numOne + numTwo;
}
```

### is-not
Checks whether the expected value is not equal to the actual value. (Opposite of `equals`)
```js
// @t "can sum" sum(1, 2) is-not 4
export function sum(numOne, numTwo) {
    return numOne + numTwo;
}
```

### throws
Checks whether the invokation would throw.
```js
// @t "throws on null engine" executeTest({engine: null}) throws Error
export executeTest(options) {
    options.engine('foobar');
}
```

And more! See: [extending saul](#extending).

## Extending Saul <a name="extending"></a>

Then engines are the "comparator" in the tests.

```js
// @t "has new pill" Thumbnail({isNew: true}) contains-dom div#foo{New}                   ===> contains-dom
// @t "reads file" getFileContent('fakeFilePath', 'spyFoo') calls-spy-with fakeFilePath   ===> calls-spy-with
// @t "throws on null engine" executeTest({engine: null}) throws Error                    ===> throws
```

They are handled by the file of that name in `src/engines`. (Example: `src/engines/contains-dom.js`)

The "engines", are responsible for generating the tests. So, as long as you build a custom engine - it can pretty much test anything. 

The default engines can do a few cool things out of the box. (check the `src/engines/` directory). You can always write your own engines and put them in your `customEnginesDir` defined in `.saulrc`.

## Installation

### 1. Install Saul as a dev dependency: `yarn add --dev saul`

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

If you have some mocha tests already, your `npm test` would look like: `mocha src/**/.js`. Simple add Saul's bin (`node_modules/.bin/saul`) right at the end:

```sh
mocha lib/*.test.js" node_modules/.bin/saul
```
#### Jest

Since jest requires a regex pattern for test files, you will have to create a file with a single file with a `require`, that will be matched by your jest `regexPattern`.

Example:
```js
// saul-runner.test.js
require('saul');
```

NOTE: If you have your tests file inside the `__tests__` directory, make sure to put this file there.

## Usage with Babel

Any transformation that you apply to your tests will be inherited by saul when you run your tests. If you're running babel, this will include anything that you define in your local `.babelrc`.

For an instance, if you want to feed babel-transformed files to mocha, you will invoke mocha with `mocha --compilers js:babel-register`. You can simply add saul to the end of the command. (`mocha --compilers js:babel-register node_modules/.bin/saul`) - and things will Just Work™.

# Examples

Just give a read through this repo. Saul is tested with Saul! :rocket:

# Contributions

Please! Here are som TODOs that need being done.

- [ ] More engines! (If you would like to contribute an engine, please take a look at the engine files at `src/engines`)
- [ ] Documentation on writing engines.
- [ ] Extending the parsers for fixtures
- [ ] Better error handling for engines
- [ ] Tests for existing engines

