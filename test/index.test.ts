
const argv = require("minimist")(process.argv);
import {unitTest} from "./unit/index.test";
switch (argv.type) {
  case 'unit':
    test("[unit-test]", unitTest);
    break;
  default:
    break;
}