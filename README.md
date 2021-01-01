# event-emitter-tree

event emitter of tree shape, offer pipe operation.

## Feature

* event of tree shape
* trigger eventItem and trigger eventTree
* pipe operation
* support typescript

## Doc

* [doculment click here](https://github.com/pomelott/event-emitter-tree/blob/master/document.md), welcome to start !

## Install

```bash
  yarn add event-emitter-tree
  npm i event-emitter-tree
```

## Use

* use with esm

```js
  import {EventCore} from 'event-emitter-tree';
```

* use with commonjs

```js
  const {EventCore} = require('event-emitter-tree');
```

## Description

* the tree forked by a string `->`
* take pe for an example, if you bind event `pe`,`pe->basketball`, `pe->basketball->shooting`, `pe->football->defence`, then you can trigger on of them or a tree flexibly.
* bind Event:

```js
  let core = new EventCore();
  core.on('pe', fnPe);
  core.on('pe->basketball', fnPeBasketball);
  core.on('pe->basketball->shooting', fnPeBasketballShooting);
  core.on('pe->football->defence', fnPeFootballDefence);
```

* the eventTree would be as follows:

```js
{
  pipe: pipePe,
  tree: {
    basketball: {
      pipe: pipePeBasketball,
      tree: {
        shooting: {
          pipe: pipePeBasketballShooting
        }
      }
    },
    football: {
      tree: {
        defence: {
          pipe: pipePeFootballDefence
        }
      }
    }
  }
}
```

* you can trigger eventItem or eventTree

```js
  core.trigger('pe->basketball');
  core.triggerTree('pe')
```
