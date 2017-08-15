# API for generating dynamic saul tests

### contains
Checks whether the output contains the expected value
```js
// @t "can concat" concatanate('string1', 'something els') contains 'string1'
```

### deep-equal
Checks whether the expected value is deep equal to actual value
```js
// @t "assigns correctly" myAssign({ foo: 1 }, { foo: 2}) deep-equals { foo: 2 }
```

### equals
Checks whether the expected value is equal to the actual value
```js
// @t "can sum" sum(1, 2) equals 3
```

### is-not
Checks whether the expected value is not equal to the actual value. (Opposite of `equals`)
```js
// @t "can sum" sum(1, 2) is-not 4
```

### matches-dom
Checks whether the given emmet expression matches the generated DOM
```js
// @t "has new div" FooSpan({children: 'bar'}) matches-dom span#foo{bar}
```

### throws
Checks whether the invokation would throw.
```js
// @t "throws on null engine" executeTest({engine: null}) throws Error
```