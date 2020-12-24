# event-core

event emitter of tree shape, offer pipe operation.

```js
eventCore.config({
  maxListener: 10,
  beforeAll () {},
  afterAll () {},
  err () {}
})

let eventNodeProject = eventCore.on("project1", () => {});
let eventNodeTask = eventNodeProject.extends("task1", () => {});
eventNodeTask.extends("step1", () => {})


eventCore.on("project1->task1", () => {})
eventCore.on("project1->task1->step1", () => {})

eventCore.beforeNot("project1->task1", () = {})
eventCore.afterNot(["project1->task1", "project1->task2"], () = {})

eventCore.on("task1", () => {});
eventCore.on(["task1", "task2", "task3"], () => {})
eventCore.getTree();

let pipe = eventRegister.getPipe("project1->task1");
pipe.add("step2", () => {})
pipe.add("step3", () => {})

pipe.on("pipeEnd", () => {})
pipe.on("pipeMiddle", () => {})
pipe.on("pipeBlocked", () => {})
pipe.on("pipeStopped", () => {})
pipe.on("err", () => {})
pipe.start();
pipe.stop();
pipe.delete("step2");
pipe.clear();

pipe.concat(pip2);

eventCore.trigger();
eventCore.once();

eventCtrl.gc();


eventCore
EventNode
Pipe  增强版队列 管道执行，参数传递机制

paramTool
ruleTool

// 测试、异常处理、
// 异常重试功能
```