Saul
====
Dynamic unit test generation for pure javascript functions. 

# What is it?

Saul like to generate tests for your pure functions when you don't feel like writing them yourself.

Suppose that you have a simple function like this.

```js
function shouldCallSaul(threatLevel) {
    if (threatLevel === 'imminent') {
        return true;
    }

    return false;
}
```

But now, you got a problem. This NEEDS to be tested. Writing a test with `describe` and `it` is fine - but your test file would be longer than the function itself. Not a problem? I'm happy for you. You're better than us. But for the rest of us - we better call Saul.

Imagine that you can just leave a comment out in the file with...

```js
// @t "should call saul when the threat is imminent"        shouldCallSaul('imminent') equals true
// @t "should not call saul when threat is not imminent"    shouldCallSaul('nodanger') equals false
```

...And it'll dynamically generate the tests for you when you run your test framework? (ex: `mocha`). Well, in a shell, that's what it does. Your fully tested pure function would now look like:

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

# How does it do it?

According to the `saulconfig.json`, it grabs all the testable files from your project - looks for the comments that follow that pattern above, and parses them. So in the case of

```js
// @t "should call saul when the threat is imminent"        shouldCallSaul('imminent') equals true
```

1. "should call saul when the threat is imminent" is your test description.
2. `shouldCallSaul` is the testable function
3. `['imminent']` are the arguments.
4. `equals` is the engine.
5. `true` is the expected output.

Then the engine `equals` - referring to the engine definition in a `engines/engine.js` file somewhere will generate the test for you. It will just run the testable function with the arguments inside the engine - and do the comparison against the expected output.

When it generates a test, it does not generate a "file". Rather, it will generate the test on the fly, in-memory, and feed it to your test runner.

# What more can it do?

The engine, is responsible for generating the tests. So, as long as you build a custom engine - it can pretty much test anything. The default engines can do a few cool things out of the box. (check the `src/engines/` directory). You can always write your own engines and put them in your `customEnginesDir` defined in `saulconfig.json`.

## Checking a `throw`

```js
// @t "throws on null engine" executeTest({engine: null}) throws Error
export const executeTest = (executableParams: ExecutableParams) =>
  executableParams.engine(1);
```

## Checking whether a test spy is called

```js
// @t "reads file" getFileContent('fakeFilePath', 'spyFoo') calls-spy-with fakeFilePath
export const getFileContent = (
  filepath: string,
  readFile: typeof fs.readFileSync = fs.readFileSync
): string => readFile(filepath, 'utf-8');
```

## Comparing the DOM for React-based tests

```js
// @t "has new pill" Thumbnail({isNew: true}) contains-dom div#foo{New}
const Pill = ({isNew}) => (
    <div>
        {isNew && <div className={styles.pill} id={'foo'}>New</div>}
    </div>
)
```

## How can I use it?

1. Install Saul as a dev dependency: `yarn add saul -d`
2. Create a `saulconfig.json` in the root.

example:
```js
{
    "fileGlob": "**/*.js", // files that contain the saul comments
    "customEnginesDir": "./src/custom-saul-engines" // dir where you will put custom engine .js files
}
```

3. Invoke saul from your test. (example: `"mocha node_modules/.bin/saul lib/*.test.js"`)

# Examples

Just give a read through this repo. Saul is tested with Saul! :rocket:
