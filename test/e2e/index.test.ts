import eventPipeE2eTest from './eventPipe.test';
import eventCoreE2eTest from './eventCore.test';
export default () => {
  eventPipeE2eTest();
  eventCoreE2eTest();
}