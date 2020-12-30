import { EventPipe } from '../../../scripts/eventPipe';
import pipeAddTest from './pipeAdd.test';
import pipeDeleteTest from './pipeDelete.test';
import pipeClearTest from './pipeClear.test';
import pipeStartTest from './pipeStart.test';
import pipeStopTest from './pipeStop.test';
import pipeListenTest from './pipeListen.test';
export function isPipe (arg: any): arg is EventPipe {
  if (arg.add) {
    return true
  }
  return false;
}

export function eventPipeUnitTest () {
  pipeAddTest();
  pipeDeleteTest();
  pipeClearTest();
  pipeStartTest();
  pipeStopTest();
  pipeListenTest();
}