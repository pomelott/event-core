import { EventPipe } from '../../../scripts/eventPipe';
import pipeAddTest from './pipeAdd.test';
import pipeDeleteTest from './pipeDelete.test';



export function isPipe (arg: any): arg is EventPipe {
  if (arg.add) {
    return true
  }
  return false;
}

export function eventPipeUnitTest () {
  pipeAddTest();
  // pipeDeleteTest();
}