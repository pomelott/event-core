import { EventPipe } from "./pipe.type";

export type EventTree = {
  [key:string]: {
    pipe: EventPipe,
    tree: EventTree
  }
}

export type Event = string | string[];

export interface EventNode {
  tree: EventTree;

  config(param:any):void;

  on (event: Event, callback: Function): EventNode;
  extends(event: Event, callback:Function): EventNode;

  trigger (event: Event):void;
  once (event: Event): void;

  gc(name:string): boolean;

  getTree(): EventTree;
  getPipe(event?: string): EventPipe;
}



