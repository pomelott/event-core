
const argv = require("minimist")(process.argv);
import unitTest from "./unit/index.test";
switch (argv.type) {
  case 'unit':
    unitTest();
    break;
  default:
    unitTest();
    break;1
}