import path from 'path';
import _ from 'lodash';
import fs from 'fs';
import assert from 'assert';

const getSnapshotDir = () => path.join(process.cwd(), 'saul_snapshots');

// @t "gets file" getSnapshotFile(function tada() {}, 'foo') ~matches-snapshot
export const getSnapshotFile = (func, testDescription) =>
  `${func.name}-${_.kebabCase(testDescription)}.snap`;

// @t "gets foo" getFoo() ~matches-snapshot
export const getFoo = () => 'bar';

/* istanbul ignore next */
export default (
  testDescription: string,
  func: Function,
  argsArray: Array<any>,
  expected: string,
  test: (desc: string, fn: () => void) => void,
  { getSpy }
) => {
  test(testDescription, () => {
    if (!fs.existsSync(getSnapshotDir())) {
      fs.mkdirSync(getSnapshotDir());
    }

    const snapshotPath = path.join(
      getSnapshotDir(),
      getSnapshotFile(func, testDescription)
    );

    const actualContent = JSON.stringify(func.apply(null, argsArray));

    if (!fs.existsSync(snapshotPath)) {
      fs.writeFileSync(snapshotPath, actualContent, {
        encoding: 'utf-8'
      });

      console.log(`New snapshot recorded for ${func.name}: ${testDescription}`);

      return;
    }

    let snapshotContent;

    snapshotContent = fs.readFileSync(snapshotPath, 'utf-8');

    // expect(snapshotContent).to.equal(actualContent);
    assert(
      snapshotContent === actualContent,
      `Expected ${snapshotContent} to equal ${actualContent}. If you want to rebuild the snapshot: rm ${snapshotPath}`
    );
  });
};
