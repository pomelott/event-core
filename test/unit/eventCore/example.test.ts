import {EventCore} from '../../../scripts/eventCore';
import {EventPipe} from "../../../scripts/eventPipe";
import { EventCoreConfig, EventTree } from '../../../types';

export default () => {
  let core = new EventCore({});
  let root: EventTree;
  let defaultConf: EventCoreConfig = {
    maxListeners: 10
  }
  let bind_project1_task1: Function = () => {
    return "trigger bind_project1_task1";
  }
  let bind_project2: Function = () => {
    return "trigger bind_project2";
  }
  let bind_project1_task2: Function = () => {
    return "trigger bind_project1_task2";
  }
  let bind_project2_task1: Function = () => {
    return "trigger bind_project2_task1"
  }
  let bind_project3: Function = () => {
    return "trigger bind_project3"
  }
  let pipe_project1_task1: EventPipe = new EventPipe(defaultConf),
      pipe_project2: EventPipe = new EventPipe(defaultConf),
      pipe_project1_task2: EventPipe = new EventPipe(defaultConf),
      pipe_project2_task1: EventPipe = new EventPipe(defaultConf),
      pipe_project3: EventPipe = new EventPipe(defaultConf),
      pipe_project3_task1: EventPipe = new EventPipe(defaultConf);
  let result_bind_project1_task1: boolean = core.on("project1->task1", bind_project1_task1),
      result_bind_project2: boolean = core.on("project2", bind_project2),
      result_bind_project1_task2: boolean,
      result_bind_project2_task1: boolean,
      result_bind_project3: boolean = core.on(["project3", "project3->task1"], bind_project3);

  pipe_project1_task1.add("task1", bind_project1_task1);
  pipe_project2.add('project2', bind_project2);
  pipe_project1_task2.add("task2", bind_project1_task2);
  pipe_project2_task1.add("task1", bind_project2_task1);
  pipe_project3.add("project3", bind_project3);
  pipe_project3_task1.add("task1", bind_project3)

  result_bind_project1_task2 = core.on("project1->task2", bind_project1_task2);
  result_bind_project2_task1 = core.on("project2->task1", bind_project2_task1);
  let trigger_bind_project1_task1: Promise<any> = core.trigger("project1->task1"),
      trigger_bind_project2: Promise<any> = core.trigger("project2"),
      trigger_bind_project1_task2: Promise<any> = core.trigger("project1->task2"),
      trigger_bind_project2_task1: Promise<any> = core.trigger("project2->task1"),
      trigger_bind_project3: Promise<any> = core.trigger("project3"),
      trigger_bind_project3_task1: Promise<any> = core.trigger("project3->task1");


  root = core.getTree();

  describe('[example] event-core', () => {
    test('[example-item] test function on with bindEvent', () => {
      expect(result_bind_project1_task1).toBe(true);
      expect(result_bind_project2).toBe(true);
      expect(result_bind_project1_task2).toBe(true);
      expect(result_bind_project2_task1).toBe(true);
      expect(result_bind_project3).toBe(true);
    })

    core.gc('project1->task2');

    test('[example-item] test function getTree after gc project1->task2', () => {
      expect(root).toStrictEqual({
        project1: {
          tree: {
            task1: {
              pipe: pipe_project1_task1
            }
          }
        },
        project2: {
          pipe: pipe_project2,
          tree: {
            task1: {
              pipe: pipe_project2_task1
            }
          }
        },
        project3: {
          pipe: pipe_project3,
          tree: {
            task1: {
              pipe: pipe_project3_task1
            }
          }
        }
      })
    })

    test('[example-item] test trigger return value', () => {
      expect(trigger_bind_project1_task1).toStrictEqual(Promise.all([]));
      expect(trigger_bind_project2).toStrictEqual(Promise.all([]));
      expect(trigger_bind_project1_task2).toStrictEqual(Promise.all([]));
      expect(trigger_bind_project2_task1).toStrictEqual(Promise.all([]));
      expect(trigger_bind_project3).toStrictEqual(Promise.all([]));
      expect(trigger_bind_project3_task1).toStrictEqual(Promise.all([]));
    })

    test('[example-item] test trigger pipe start with pipe_project1_task1', () => {
      pipe_project1_task1.start().then((msg) => {
        expect(msg).toStrictEqual(['trigger bind_project1_task1']);
      })
    })
    test('[example-item] test trigger pipe start with pipe_project2', () => {
      pipe_project2.start().then((msg) => {
        expect(msg).toStrictEqual(['trigger bind_project2']);
      });
    })
    test('[example-item] test trigger pipe start with pipe_project1_task2', () => {
      pipe_project1_task2.start().then((msg) => {
        expect(msg).toStrictEqual(['trigger bind_project1_task2']);
      });
    })
    test('[example-item] test trigger pipe start with pipe_project2_task1', () => {
      pipe_project2_task1.start().then((msg) => {
        expect(msg).toStrictEqual(['trigger bind_project2_task1']);
      });
    })
    test('[example-item] test trigger pipe start with pipe_project3', () => {
      pipe_project3.start().then((msg) => {
        expect(msg).toStrictEqual(['trigger bind_project3']);
      });
    })
    test('[example-item] test trigger pipe start with pipe_project3_task1', () => {
      pipe_project3_task1.start().then((msg) => {
        expect(msg).toStrictEqual(['trigger bind_project3']);
      });
    })
  })

}