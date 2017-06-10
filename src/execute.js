import _ from 'lodash';
import { ExecutableParams } from './types';
import { suite, test } from './testcase';

/* istanbul ignore next */
export const groupTestsByFuncName = (tests: ExecutableParams): { [id: string]: ExecutableParams } =>
  _.groupBy(tests, test => {
    if (!test.function) {
      throw new Error(`Test ${test.testDescription} does not hava a testable function. Did you export it?`);
    }

    return test.function.name;
  });

// @t "executes with engine" executeTest({engine: () => 'result'}) deep-equals 'result'
// @t "throws on invalid" executeTest({engine: null}) throws Error
export const executeTest = (executableParams: ExecutableParams) =>
  executableParams.engine(
    executableParams.testDescription,
    executableParams.function,
    executableParams.args,
    executableParams.output,
    test
  );

// @t "passed suite context is called" executeTestGroup(null, null, "spyFoo") calls-spy true
// @t "passed suite context is called with funcName" executeTestGroup(null, 'bikeLane', "spyFoo") calls-spy-with bikeLane
export const executeTestGroup = (
  executableParams: ExecutableParams[],
  funcName: string,
  testSuite: typeof suite = suite
) => {
  testSuite(funcName, () => _.each(executableParams, executeTest));
};

/* istanbul ignore next */
const execute = (executableParams: ExecutableParams) =>
  _(executableParams)
    .thru(groupTestsByFuncName)
    .thru(groupedTests =>
      _.forOwn(groupedTests, (executableParams, funcName) => executeTestGroup(executableParams, funcName))
    )
    .commit();

export default execute;
