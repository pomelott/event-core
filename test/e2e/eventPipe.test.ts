import {EventCore} from '../../scripts/eventCore';
import { EventPipe } from '../../scripts/eventPipe';
function isPipe (arg: any): arg is EventPipe {
  if (arg.add) {
    return true
  }
  return false;
}
export default () => {
  describe('[eventPipe e2e-test] use with eventPipe', () => {
      let core = new EventCore(), pipe: EventPipe | false;
    core.on('pe->basketball', () => {
      return 'pe->basketball task1';
    });
    pipe = core.getPipe('pe->basketball');
    test('[e2e-item] restart in a half process', () => {
      core.on('school', () => {
        if (isPipe(pipe)) {
          pipe.start().then((msg) => {
            expect(msg).toStrictEqual([ 'pe->tennis task1', 'pe->golf task1', 'pe->ping-pong task1' ]);
          });
        }
      })
    })
    if (isPipe(pipe)) {
      pipe.add('football', () => {
        if (isPipe(pipe)) {
          pipe.stop();
        }
        core.trigger('school');
        return 'pe->football task1';
      });
      pipe.add('tennis', () => {return 'pe->tennis task1';});
      pipe.add('golf', () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('pe->golf task1');
          }, 2000)
        })
      })
      pipe.add('ping-pong', () => {return 'pe->ping-pong task1';})
    }
    test('[e2e-item] stop and restart quickly', done => {
      if (isPipe(pipe)) {
        pipe.start().then((msg) => {
          expect(msg).toStrictEqual([
            'pe->basketball task1',
            'pe->football task1',
            'pe->tennis task1',
            'pe->golf task1',
            'pe->ping-pong task1'
          ])
          done();
        });
      }
    })
  })
}