import {EventCore} from '../../../scripts/eventCore';
import { EventPipe } from '../../../scripts/eventPipe';
import { isPipe } from './index.test';

export default () => {
  describe('[eventPipe unit-test] function clear', () => {
    let core = new EventCore(), pipe: EventPipe | false;
    core.on('project', () => {});
    pipe = core.getPipe('project');
    test('[unit-item] test clear function', () => {
      if (isPipe(pipe)) {
        pipe.clear();
        expect(pipe.getPipeLength()).toBe(0);
      }
    })
  })
}