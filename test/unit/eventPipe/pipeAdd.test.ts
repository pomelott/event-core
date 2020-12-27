import {EventCore} from "../../../scripts/eventCore";
import { EventPipe } from "../../../scripts/eventPipe";
import {isPipe} from "./index.test";


export default () => {
  describe('[eventPipe unit-test] function add', () => {
    let core = new EventCore({
      maxListeners: 2
    }), pipe: EventPipe | false;
    core.on('pe->basketball', () => {
      return 'exec pe basketball';
    })

    pipe = core.getPipe('pe->basketball');

    test('[unit-item] add and start in a pipe which get from EventCore', () => {
      if (isPipe(pipe)) {
        pipe.add('football', () => {
          return 'exec pe football';
        })
        pipe.start().then((msg) => {
         expect(msg).toStrictEqual(['exec pe basketball', 'exec pe football'])
        })
      }
    })

    test('[unit-item] add a same eventName as before', () => {
        function addSameName () {
          if (isPipe(pipe)) {
            pipe.add('football', () => {})
          }
        }
        expect(addSameName).toThrowError('football has been added into the pipe !');
    })

    test('[unit-item] add when overflow on maxListeners 2', () => {
      if (isPipe(pipe)) {
        pipe.add('tennis', () => {
          return 'exec pe tennis';
        })
        pipe.start().then((msg) => {
          expect(msg).toStrictEqual(['exec pe football', 'exec pe tennis']);
        })
      }
    })

    core.clear();
  })
}