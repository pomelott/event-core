import {EventCore} from '../../../scripts/eventCore';
import { EventPipe } from '../../../scripts/eventPipe';
export default () => {
  describe('[eventCore unit-test] function on', () => {
    let core = new EventCore();
    let pipePe: EventPipe | false, pipeMath: EventPipe | false;
    let pipeArr: Array<EventPipe> = core.on(['pe', 'math'], () => {});
    core.on('pe', () => {})
    core.on('pe->basketball', () => {return 'pe->basketball task1'})
    pipePe = pipeArr[0];
    pipeMath = pipeArr[1];
    pipePe.add('task3', () => {});

    test('[unit-item] bind a event with a string & array param and bind a same name twice', () => {
      expect((pipePe as EventPipe).getPipeLength()).toBe(3);
      expect((pipeMath as EventPipe).getPipeLength()).toBe(1);
    })

    test('[unit-item] bind a tree event & trigger', () => {
      core.trigger('pe->basketball').then((msg) => {
        expect(msg).toStrictEqual(['pe->basketball task1'])
      })
    })
  })
}