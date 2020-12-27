
import eventCoreTest from "./eventCore/index.test";
import {eventPipeUnitTest} from "./eventPipe/index.test";
export default () => {
  eventCoreTest();
  eventPipeUnitTest();
}