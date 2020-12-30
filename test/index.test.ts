
const argv = require("minimist")(process.argv);
import unitTest from "./unit/index.test";
import e2eTest from './e2e/index.test';
switch (argv.type) {
  case 'unit':
    unitTest();
    break;
  case 'e2e':
    e2eTest();
    break;
  default:
    unitTest();
    break;1
}