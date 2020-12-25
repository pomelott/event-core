import { CustomObject, Event, EventConf,EventTree} from "../typings/index";
// import { EventPipe } from "./types/pipe";
import {EventPipe} from "./eventPipe";
import {parseEventParam} from "./lib";
import _ from "lodash";

// const pool:any = {
//   task: {
//     pipe: EventPipe,
//     tree: {
//       step: {
//         pipe: [fn1, fn2],
//         tree: {}
//       }
//     }
//   }
// }

function isEventPipe (arg: any): arg is EventPipe{
  if (arg.add) {
    return true;
  }
  return false;

}

export class EventCore {

  private root: EventTree = {};
  private conf: EventConf = {};


  constructor (conf: EventConf) {
    this.conf = conf;
  }

  private _bindEvent (eventItem: string, callback: Function): EventPipe {

    let treeArr = parseEventParam(eventItem);

    if (treeArr.length > 1) {
      return this._bindTreeEvent(treeArr, callback)
    } else {
      return this._bindItemEvent(eventItem, callback);
    }
  }

  private _bindTreeEvent (treeArr: string[], callback: Function): EventPipe {
    let targetTree:CustomObject = {};
    let returnValue, mountPoint: string = treeArr[0];
    for (let i = treeArr.length - 1; i > 0; i--) {
      let key = treeArr[i], temp: CustomObject = {};
      if (i === treeArr.length - 1) {
        targetTree[key] = {};
        targetTree[key].pipe = new EventPipe();
        targetTree[key].pipe.add(callback);
        returnValue = targetTree[key].pipe;
      } else {
        temp = targetTree;
        targetTree = {};
        targetTree[key].tree = targetTree;
      }
    }
    if (!this.root[mountPoint]) {
      this.root[mountPoint] = {};
    }
    this.root[mountPoint] = _.merge(this.root[mountPoint], {
      tree: targetTree
    })

    return returnValue;
  }

  private _bindItemEvent (eventItem: string, callback: Function): EventPipe {
    if (!this.root[eventItem]) {
      this.root[eventItem] = {
        pipe: new EventPipe()
      }
    }
   return this.root[eventItem].pipe;
  }

  config (param: any): void {

  }

  on (event: Event, callback: Function): boolean {
    if (typeof event === 'string') {
      this._bindEvent(event, callback);
    } else {
      event.forEach((item: string) => {
        this._bindEvent(item, callback);
      })
    }
    return true;
  }

  extends (event: Event, callback: Function) {

  }

  trigger (event: Event): void {

  }

  once (event: Event): void {

  }

  gc (name?: string): boolean {
    return true;
  }

  getTree (): EventTree {
    return this.root;
  }

  getPipe (event?: string) {

  }

}