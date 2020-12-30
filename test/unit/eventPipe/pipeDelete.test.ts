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
          return 'pe->ping-pong task1';
        })
        pipe.delete('ping-pong');
        pipe.start().then((msg) => {
          expect(msg).toStrictEqual([])
        })
      }
    })

    test(`[unit-item] delete a name that doesn't exist in pipe`, () => {
      if (isPipe(pipe)) {
        expect(pipe.delete('not-exist-name')).toBe(false);
      }
    })

    test(`[unit-item] delete a index that doesn't exist in  a pipe`, () => {
      if (isPipe(pipe)) {
        expect(pipe.delete(100)).toBe(false);
      }
    })
  })
}