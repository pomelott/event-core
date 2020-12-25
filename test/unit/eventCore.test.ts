import {EventCore} from '../../scripts/eventCore';
import {EventPipe} from "../../scripts/eventPipe";
import { EventTree } from '../../typings';

export default () => {
  let core = new EventCore({});
  let root: EventTree;

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

  let pipe_project1_task1: EventPipe = new EventPipe(),
      pipe_project2: EventPipe = new EventPipe(),
      pipe_project1_task2: EventPipe = new EventPipe(),
      pipe_project2_task1: EventPipe = new EventPipe();
  let result_bind_project1_task1: boolean = core.on("project1->task1", bind_project1_task1),
      result_bind_project2: boolean = core.on("project2", bind_project2),
      result_bind_project1_task2: boolean,
      result_bind_project2_task1: boolean;
  pipe_project1_task1.add("project1_task1", bind_project1_task1);
  pipe_project2.add('project2', bind_project2);
  pipe_project1_task2.add("project1_task2", bind_project1_task2);
  pipe_project2_task1.add("project2_task1", bind_project2_task1)
  result_bind_project1_task2 = core.on("project1->task2", bind_project1_task2);
  result_bind_project2_task1 = core.on("project2->task1", bind_project2_task1)
  root = core.getTree();

  test('[event-core] on with bindEvent', () => {
    expect(result_bind_project1_task1).toBe(true);
    expect(result_bind_project2).toBe(true);
    expect(result_bind_project1_task2).toBe(true);
    expect(result_bind_project2_task1).toBe(true);
  })

  console.log(root)
  test('[event-core] getTree', () => {
    expect(root).toStrictEqual({
      project1: {
        tree: {
          task1: {
            pipe: pipe_project1_task1
          },
          task2: {
            pipe: pipe_project1_task2
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
      }
    })
  })
}