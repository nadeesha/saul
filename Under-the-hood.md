# How does it do it?

According to the `.saulrc`, it grabs all the testable files from your project - looks for the comments that follow that pattern above, and parses them. So in the case of

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