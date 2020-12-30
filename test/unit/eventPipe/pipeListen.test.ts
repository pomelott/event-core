
import {EventCore} from '../../../scripts/eventCore';
import { EventPipe } from '../../../scripts/eventPipe';
import { isPipe } from './index.test';
export default () => {

    describe('[eventPipe unit-test] function listen', () => {
      

      test('[unit-item] listen pipeEnd、pipeMiddle、pipeStopped', done => {
        let core = new EventCore(), pipe: EventPipe | false;
        pipe = core.on('pe->basketball', () => {
          return 'pe->basketball task1';
        })[0];
        const pipeEndCall = jest.fn(() => {})
        const pipeMiddleCall = jest.fn(() => {})
        const pipeStoppedCall = jest.fn(() => {})
        pipe.add('football', () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 1000)
          })
        });

        pipe.listen('pipeEnd', pipeEndCall);
        pipe.listen('pipeStopped', pipeStoppedCall);
        pipe.listen('pipeMiddle', pipeMiddleCall);
        if (isPipe(pipe)) {
          pipe.stop();
          pipe.start().then(() => {
            expect(pipeEndCall).toHaveBeenCalledTimes(1);
            expect(pipeMiddleCall).toHaveBeenCalledTimes(1);
            expect(pipeStoppedCall).toHaveBeenCalledTimes(1);
            done();
          }).catch((err) => {
            console.log(err)
          });
        }
      })
    })

}