import {EventCore} from "../../../scripts/eventCore";
import { EventPipe } from "../../../scripts/eventPipe";
import {isPipe} from "./index.test";
export default () => {
  describe('[eventPipe unit-test] function delete', () => {
    let core = new EventCore(), pipe: EventPipe | false;
    pipe = core.getPipe();
    test('[unit-item] delete in a pipe', () => {
      if (isPipe(pipe)) {
        pipe.add('ping-pong', () => {
          return 'exec pe ping-pong';
        })
        pipe.delete('ping-pong');
        pipe.start().then((msg) => {
          expect(msg).toStrictEqual([])
        })
      }
    })
  })
}