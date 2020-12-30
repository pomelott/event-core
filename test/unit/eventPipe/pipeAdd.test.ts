import {EventCore} from "../../../scripts/eventCore";
import { EventPipe } from "../../../scripts/eventPipe";
import {isPipe} from "./index.test";


export default () => {
  describe('[eventPipe unit-test] function add', () => {
    let core = new EventCore({
      maxListeners: 3
    }), pipe: EventPipe | false;
    core.on('pe->basketball', () => {
      return 'pe->basketball task1';
    })

    pipe = core.getPipe('pe->basketball');

    test('[unit-item] add and start in a pipe which get from EventCore', () => {
      if (isPipe(pipe)) {
        pipe.add('football', () => {
          return 'pe->football task1';
        })
        pipe.start().then((msg) => {
          expect(msg).toStrictEqual(['pe->basketball task1', 'pe->football task1'])
        })
      }
    })

    test('[unit-item] add a same eventName as before', () => {
      if (isPipe(pipe)) {
        pipe.add('football', () => {return 'pe->football task2'})
        expect(pipe.getPipeLength()).toBe(3);
      }
    })

    test('[unit-item] add when overflow on maxListeners 3', () => {
      if (isPipe(pipe)) {
        pipe.add('tennis', () => {
          return 'pe->tennis task1';
        })
        pipe.start().then((msg) => {
          expect(msg).toStrictEqual(['pe->football task1', 'pe->football task2','pe->tennis task1']);
        }).catch((err) => {
          console.log(err);
        })
      }
    })

    core.clear();
  })
}