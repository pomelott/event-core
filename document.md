# event-emitter-tree

## EventCore

```js
  let core = new EventCore();
  let core = new EventCore(configOpts)
```

### config

* core.config(configOpts)
* arguments

| param | type | description |
|:---:|:---:|:---:|
| configOpts.maxListeners | number | the number of max function listeners of a event, if overflowed, the first one would be popped out |
| configOpts.beforeAll | Function | the callback before every event listener function executed |
| configOpts.afterAll | Function | the callback after every event listener function executed |
| configOpts.error | Function | the callback when listener function executed with a error |

### on

bind event(s) on the tree

* core.on(event, callback)
* arguments

| param | type | description |
|:---:|:---:|:---:|
|event|string, string[]|the eventName which you want to bind with |
|callback|Function| the eventListener function|

* returns: EventPipe[]
* example:

  ```js
      core.on('pe->basketball', () => {return 'pe->basketball task1'})
      core.on('pe', () => {return 'pe task1'})
      core.on(['pe->basketball', 'pe->football'], () => {return 'pe->basketball & pe->football task1'})
  ```

### trigger

trigger target eventItem in the tree

* core.trigger(eventItem, once)

* arguments

| param | type | description |
|:---:|:---:|:---:|
|eventItem|string|the eventItem Name which you want to trigger |
|once|boolean| whether to delete listener function after executed|

* returns: Promise

* example:

  ```js
      core.trigger('pe->basketball', false).then((msg) => {
        console.log(msg); // ['pe->basketball task1']
      }).catch((err) => {
        console.log(msg)
      })
  ```

### triggerTree

trigger the whole events in the tree

* **the param is same as trigger**
* core.triggerTree(eventItem, once)
* example:

  ```js
      core.triggerTree('pe').then((msg) => {
        console.log(msg);
      }
  ```

* returns: Promise

### once

* core.once(eventItem)
* returns: Promise

### gc

remove target eventItem in the tree

* core.gc(eventItem)
* example:

  ```js
      core.gc('pe->basketball')
  ```

* returns: boolean

### clear

remove all event in the eventTree

* core.clear()

### getTree

get the eventTree

* core.getTree(eventItem)

### getPipe

get a new EventPipe or get the eventPipe of an eventItem

* core.getPipe(eventItem | EventPipeConfig)

* arguments

| param | type | description |
|:---:|:---:|:---:|
|eventItem|string|the eventItem Name which you want to trigger |
|EventPipeConfig.pipeEnd|Function| callback at the end of a pipe execution|
|EventPipeConfig.pipeMiddle|Function| callback at the middle of a pipe execution|
|EventPipeConfig.pipeStopped|Function| callback when the pipe stopped|
| EventPipeConfig.maxListeners | number | the number of max function listeners of a event, if overflowed, the first one would be popped out |
| EventPipeConfig.beforeAll | Function | the callback before every event listener function executed |
| EventPipeConfig.afterAll | Function | the callback after every event listener function executed |
| EventPipeConfig.error | Function | the callback when listener function executed with a error |

* returns: EventPipe
* example:

```js
  core.getPipe('pe->basketball');
  core.getPipe({
    maxListeners: 5,
    pipeEnd () {
      console.log('pipeEnd');
    }
  })
```

## EventPipe

```js
  let core = new EventPipe();
  let pipeGroup = core.on('pe', () => {return 'pe task1'});
  let pipe;  // the pipe already has one task1

  // get target pipe with function on
  pipe = pipeGroup[0];

  // get target pipe with function getPipe
  pipe = core.getPipe('pe')
```

### add

add an event for a pipe

* pipe.add(eventItem, callback);
* arguments

| param | type | description |
|:---:|:---:|:---:|
|eventItem|string|the eventItem Name which you want to add|
|callback|Function| the bind listener function|

* example

```js
  let pipe = core.getPipe('pe')
  pipe.add('task2', () => {return 'pe task2'});
```

* returns: boolean

### delete

delete an event for a pipe

* pipe.delete(eventItem)

| param | type | description |
|:---:|:---:|:---:|
|eventItem|string,number|the mark when you delete with a pipe|

* example

```js
  // delete with name
  pipe.delete('pe');  // del task1
  pipe.delete('task2') // del task2

  // delete with index
  pipe.delete(0) // del task1
```

### clear

clear all bind listeners in a pipe, the same as `core.clear()`

### start

start to execute the listener functions in a pipe, or restart a pipe.

* pipe.start()
* returns: Promise | boolean
* example

```js
  pipe.start().then((msg) => {
    console.log(msg)
  })
```

### stop

stop a listener execution in a pipe

```js
  pipe.stop()
```

returns: boolean

### listen

listen a event for a pipe
pipe.listen(eventItem, callback)

* arguments

| param | type | description |
|:---:|:---:|:---:|
|eventItem|string,number|the mark when you delete with a pipe|
 pipe.listen(eventItem, function)

```js
  pipe.listen('pipeEnd', () => {return 'pe->basketball pipeEnd'})
```

returns: boolean

### reset

reset execution status

* pipe.reset()

### getPipeLength

* core.getPipeLength()
