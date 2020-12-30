import {EventCore} from '../../../scripts/eventCore';
import { EventPipe } from '../../../scripts/eventPipe';
import { isPipe } from './index.test';

export default () => {
  describe('[eventPipe unit-test] function start', () => {
    let core = new EventCore(), pipe: EventPipe | false;
    core.on('pe->basketball', () => {
      return 'pe->basketball task1';
    });
    pipe = core.getPipe('pe->basketball');
      test('[unit-item] start a async pipe with async', () => {
        if (isPipe(pipe)) {
          pipe.add('football', () => {return 'pe->football task1'});
          pipe.add('tennis', () => {return 'pe->tennis task1'});
          pipe.add('golf', () => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve('pe->golf task1');
              }, 1000)
            })
          })
          pipe.add('ping-pong', () => {return 'pe->ping-pong task1'});
          pipe.start().then((msg) => {
            expect(msg).toStrictEqual(['pe->basketball task1', 'pe->football task1','pe->tennis task1', 'pe->golf task1', 'pe->ping-pong task1'])
          })
        }
      })

      
  })
}