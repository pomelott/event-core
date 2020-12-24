import { CustomObject, Event, EventConf,EventTree} from "./typings/index";
// import { EventPipe } from "./types/pipe";
import {EventPipe} from "./scripts/eventPipe";
import {eventTreeSplitChar} from  "./scripts/const";

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

export class EventCore {

  private root: EventTree = {};
  private conf: EventConf = {};


  constructor (conf: EventConf) {
    this.conf = conf;
  }




  private _bindEvent (eventItem: string, callback: Function) {

    let treeArr = eventItem.split(eventTreeSplitChar);

    if (treeArr.length > 1) {
      this._bindTreeEvent(treeArr, callback)
    } else {
      this._bindItemEvent(eventItem, callback);
    }
  }

  private _bindTreeEvent (treeArr: string[], callback: Function) {
    let targetTree:CustomObject = {};

    for (let i = treeArr.length - 1; i > 0; i--) {
      let key = treeArr[i], temp: CustomObject = {};
      if (i === treeArr.length - 1) {
        targetTree[key] = {};
        targetTree[key].pipe = new EventPipe();
        targetTree[key].pipe.add(callback);
      } else {
        temp = targetTree;
        targetTree = {};
        targetTree[key].tree = targetTree;
      }
    }

    this.root[treeArr[0]] = {
      tree: targetTree
    };
    return true;
  }

  private _bindItemEvent (eventItem: string, callback: Function) {
    if (!this.root[eventItem]) {
      this.root[eventItem] = {
        pipe: new EventPipe(),
        tree: {}
      }
    }
    this.root[eventItem].pipe.add(callback);
  }
  protected config (param: any): void {

  }

  protected on (event: Event, callback: Function) {
    if (typeof event === 'string') {
      this._bindEvent(event, callback);
    } else {
      event.forEach((item: string) => {
        this._bindEvent(item, callback);
      })
    }
  }

  protected extends (event: Event, callback: Function) {

  }

  protected trigger (event: Event): void {

  }

  protected once (event: Event): void {

  }

  protected gc (name?: string): boolean {
    return true;
  }

  protected getTree () {

  }
  protected getPipe (event?: string) {

  }

}