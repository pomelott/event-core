import onUnitTest from './on.test';
import triggerUnitTest from './trigger.test';
import gcUnitTest from './gc.test';
import getTreeUnitTest from './getTree.test';
import clearUnitTest from './clear.test';
export default () => {
  onUnitTest();
  triggerUnitTest();
  gcUnitTest();
  getTreeUnitTest();
  clearUnitTest();
}