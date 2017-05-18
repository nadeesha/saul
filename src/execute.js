import _ from 'lodash';
import { ExecutableParams } from './types';
import mocha from 'mocha';

const groupTestsByFuncName = (
  tests: ExecutableParams
): { [id: string]: ExecutableParams } => {
  return _.groupBy(tests, test => test.function.name);
};

const executeTest = (executableParams: ExecutableParams) =>
  executableParams.engine(
    executableParams.testDescription,
    executableParams.function,
    executableParams.args,
    executableParams.output
  );

const executeTestGroup = (
  executableParams: ExecutableParams[],
  funcName: string
) => mocha.describe(funcName, () => _.each(executableParams, executeTest));

const execute = (executableParams: ExecutableParams) =>
  _(executableParams)
    .thru(groupTestsByFuncName)
    .thru(groupedTests => _.forOwn(groupedTests, executeTestGroup))
    .commit();

export default execute;
