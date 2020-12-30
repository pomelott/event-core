import { EventCore } from "../../../scripts/eventCore"
import { EventPipe } from "../../../scripts/eventPipe";
import { isPipe } from "./index.test";

export default () => {
  describe('[eventPipe unit-test] function stop', () => {
    let core = new EventCore(), pipe: EventPipe | false;
    core.on('pe->basketball', () => {
      return 'pe->basketball task1';
    });

    pipe = core.getPipe('pe->basketball');
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
    }

    test('[unit-item] start and stop at pipeMiddle', () => {
        if (isPipe(pipe)) {
          pipe.listen('pipeMiddle', () => {
            if (isPipe(pipe)) {
              pipe.stop();
            }
          })
          pipe.start().then((msg) => {
            expect(msg).toStrictEqual(['pe->basketball task1', 'pe->football task1','pe->tennis task1'])
          })

        }
      })

      test('[unit-item] start and quickly stop, then quickly continue', () => {
        if (isPipe(pipe)) {
          pipe.reset();
          pipe.listen('pipeMiddle', () => {
            if (isPipe(pipe)) {
              pipe.stop();
              pipe.start().then((msg) => {
                expect(msg).toStrictEqual(['pe->golf task1', 'pe->ping-pong task1']);
              });
            }
          })
          pipe.start().then((msg) => {
            expect(msg).toStrictEqual(['pe->basketball task1', 'pe->football task1','pe->tennis task1', 'pe->golf task1', 'pe->ping-pong task1']);
          })
        }
      })
  })
}