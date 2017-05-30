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

# What more can it do?

The engine, is responsible for generating the tests. So, as long as you build a custom engine - it can pretty much test anything. The default engines can do a few cool things out of the box. (check the `src/engines/` directory). You can always write your own engines and put them in your `customEnginesDir` defined in `.saulrc`.

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
2. Create a `.saulrc` in the root.

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
