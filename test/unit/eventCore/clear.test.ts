import {EventCore} from '../../../scripts/eventCore';
import { EventTree } from '../../../types/eventCore';

export default () => {
  describe('[eventCore unit-test] function clear', () => {
    let core = new EventCore(), tree: EventTree;
    core.on('pe->basketball', () => {return 'pe->basketball task1'});
    core.clear();
    tree = core.getTree();
    test('[unit-item] get a tree after clear', () => {
      expect(tree).toStrictEqual({});
    })
  })
}