import { EventCoreConfig } from "../typings/index";
import _ from "lodash";
import { EventPipeConfig, PipeListener } from "../typings/eventPipe";
import {getPipeMiddleIdx} from "./lib"
export class Queue<T> {
  private data: Array<T> = [];

  push (item: T): boolean {
    this.data.push(item)
    return true;
  }

  pop (): T | undefined {
    return this.data.shift();
  }

  front (): T | undefined {
    return this.data[0]
  }

  del (idx: number) {
    this.data.splice(idx, 1)
  }

  each (callback: any) {
    for (let i = 0; i < this.data.length; i++) {
      callback(this.data[i], i)
    }
  }

  index (eventItem: T): number {
    return this.data.indexOf(eventItem);
  }

  len (): number {
    return this.data.length;
  }

  clear (): boolean {
    this.data.length = 0;
    return true;
  }
}
export class EventPipe{
  private isStop: boolean = false;
  private activeIndex: number = 0;
  private mark: Queue<string> = new Queue<string>();
  private pipe: Queue<Function> = new Queue<Function>();
  private conf: EventPipeConfig = {
    maxListeners: 10
  };

  constructor (param?: EventCoreConfig) {
    this.conf = _.merge(this.conf, param)
  }

  add (eventItem: string, callback: Function): boolean {
    if (this.conf.maxListeners && this.mark.len() >= this.conf.maxListeners) {
      this.mark.pop();
      this.pipe.pop();
    }
    if (this.mark.index(eventItem) !== -1) {
      throw new Error(`${eventItem} has been added into the pipe !`);
    }
    this.mark.push(eventItem);
    this.pipe.push(callback);
    return true;
  };

  delete (eventItem: string | number): boolean {
    let idx: number;
    if (typeof eventItem === typeof '') {
      idx = this.mark.index(eventItem as string);
    } else if (typeof eventItem === typeof 0) {
      idx = eventItem as number;
    } else {
      return false;
    }
    if (idx === -1) {
      return false;
    }
    this.mark.del(idx);
    this.pipe.del(idx);
    return true;
  };

  clear (): boolean {
    this.mark.clear();
    this.pipe.clear();
    return true;
  };

  async start (once?: boolean): Promise<any> {
    let result: Array<Promise<any>>= [];
    let midIdx: number = getPipeMiddleIdx(this.mark.len());
    this.pipe.each(async (item: Function, idx: number) => {
      if (this.isStop) {
        return;
      } else {
        if (this.conf.beforeAll) {
          this.conf.beforeAll();
        }
        if (idx === midIdx && this.conf.pipeMiddle) {
          this.conf.pipeMiddle();
        }
        result.push(item());
        if (once) {
          this.delete(idx)
        }
        this.activeIndex = idx;
        if (this.conf.afterAll) {
          this.conf.afterAll();
        }
      }
    })
    return new Promise((resolve, reject) => {
      Promise.all(result).then((msg) => {
        if (this.conf.pipeEnd) {
          this.conf.pipeEnd();
        }
        resolve(msg)
      }).catch((err) => {
        if (this.conf.pipeError) {
          this.conf.pipeError();
        }
        reject(err);
      })
    })
  };

  stop (): void {
    this.isStop = true;
    if (this.conf.pipeStopped) {
      this.conf.pipeStopped();
    }
  };

  listen (hook: PipeListener, callback: Function): boolean {
    this.conf[hook] = callback;
    return true;
  };
}