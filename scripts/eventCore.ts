import { CustomObject, Event, EventCoreConfig, EventNode, EventTree} from "../types/eventCore";
import {EventPipe} from "./eventPipe";
import {parseEventParam, getTreeNodeChain, getParentNodeChain} from "./lib";
import _ from "lodash";
import { EventPipeConfig } from "../types/eventPipe";
export class EventCore {

  private root: EventTree = {};
  private conf: EventCoreConfig = {
    maxListeners: 10
  };


  constructor (conf?: EventCoreConfig){
    this.conf = _.merge(this.conf, conf);
  }

  config (param: EventCoreConfig): boolean {
    this.conf = _.merge(this.conf, param);
    return true;
  }

  getConfig () {
    return this.conf;
  }

  private _bindEvent (eventItem: string, callback: Function): EventPipe {

    let treeArr = parseEventParam(eventItem);

    if (treeArr.length > 1) {
      let targetNode = this._getTargetNodeFromChain(eventItem);
      if (targetNode &&  targetNode.pipe) {
        // on the same eventName with pipe
        targetNode.pipe.add(eventItem, callback);
        return targetNode.pipe;
      } else {
        return this._bindTreeEvent(treeArr, callback)
      }
    } else {
      return this._bindItemEvent(eventItem, callback);
    }
  }

  private _forEventNode (node: EventNode, callBack: Function) {

    if (!node.tree) {
      return;
    }

    for (let key in node.tree) {
      callBack(key, node.tree[key])
      if (node.tree[key].tree) {
        this._forEventNode(node.tree[key], callBack);
      }
    }

  }

  private _bindTreeEvent (treeArr: string[], callback: Function): EventPipe {
    let targetTree:CustomObject = {};
    let returnValue, mountPoint: string = treeArr[0];
    for (let i = treeArr.length - 1; i > 0; i--) {
      let key = treeArr[i], temp: CustomObject = {};
      if (i === treeArr.length - 1) {
        targetTree[key] = {};
        targetTree[key].pipe = new EventPipe(this.conf);
        targetTree[key].pipe.add(key, callback);
        returnValue = targetTree[key].pipe;
      } else {
        temp = targetTree;
        targetTree = {};
        targetTree[key] = {};
        targetTree[key].tree = temp;
      }
    }
    if (!this.root[mountPoint]) {
      this.root[mountPoint] = {};
    }

    this.root[mountPoint] = _.merge(this.root[mountPoint], {
      tree: targetTree
    })
    // console.log((this.root[mountPoint] as any).tree.calculate.pipe)
    return returnValue;
  }

  private _bindItemEvent (eventItem: string, callback: Function): EventPipe {
    if (!this.root[eventItem] || !this.root[eventItem].pipe) {
      this.root[eventItem] = _.merge(this.root[eventItem], {
        pipe: new EventPipe(this.conf)
      })
    }
    (this.root[eventItem].pipe as EventPipe).add(eventItem, callback);
    return (this.root[eventItem].pipe as EventPipe);
  }

  private _getTargetNodeFromChain (eventItem: string): EventNode {
    let nodeChain = getTreeNodeChain(eventItem);
    return _.get(this.root, nodeChain);
  }

  on (event: Event, callback: Function): Array<EventPipe> {
    let pipeGroup: Array<EventPipe> = [];
    if (typeof event === 'string') {
      pipeGroup.push(this._bindEvent(event, callback));
    } else {
      event.forEach((item: string) => {
        pipeGroup.push(this._bindEvent(item, callback));
      })
    }
    return pipeGroup;
  }

  async trigger (eventItem: string, once?: boolean): Promise<any> {
    let targetNode = this._getTargetNodeFromChain(eventItem);
    if (targetNode.pipe) {
      return await targetNode.pipe.start(once);
    }
    return Promise.reject(false)
  }

  async triggerTree (eventItem: string, once?: boolean) {
    let targetNode = this._getTargetNodeFromChain(eventItem),
        pro: Array<Promise<any>> = [];
    if (targetNode.pipe) {
      pro.push(targetNode.pipe.start(once));
    }
    this._forEventNode(targetNode, async (key: string, node: EventNode) => {
      if (node.pipe) {
        let proItem = node.pipe.start(once);
        pro.push(proItem);
      }
    })
    return Promise.all(pro);
  }

  async once (eventItem: string): Promise<any> {
    return await this.trigger(eventItem, true);
  }

  clear () {
    this.root = {};
  }

  gc (eventItem: string) {
    try {
      let treeArr = parseEventParam(eventItem),
          lastNodeName = treeArr[treeArr.length - 1];
      let parentChain: string= getParentNodeChain(eventItem);
      if (parentChain.length) {
        let parentNode = _.get(this.root, parentChain);
        if (parentNode.tree) {
          delete parentNode.tree[lastNodeName]
        }
      } else {
        // gc on root
        delete this.root[lastNodeName]
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  getTree (): EventTree {
    return this.root;
  }

  getPipe (param?: string | EventPipeConfig): EventPipe | false {
    if (typeof param === typeof '') {
      let targetNode = this._getTargetNodeFromChain(param as string);
      if (targetNode.pipe) {
        return targetNode.pipe;
      }
      return false;
    }
    return new EventPipe(param as EventPipeConfig);
  }
}