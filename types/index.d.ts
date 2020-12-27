import { EventPipe } from "./eventPipe";



export interface EventCoreConfig {
  maxListeners?: number;
  beforeAll?: Function;
  afterAll?: Function;
  err?: Function;
}

export interface CustomObject {
  [key:string]: any
}

export type EventNode = {
  pipe?: EventPipe,
  tree?: EventTree
}

export type EventTree = {
  [key:string]: EventNode
}

export type Event = string | string[];

// export declare interface EventRoot {

//   // root: EventTree;
//   conf: EventConf;

//   new (param:EventConf): void;

//   config(param:any):void;

//   on (event: Event, callback: Function);
//   extends(event: Event, callback:Function);

//   trigger (event: Event):void;
//   once (event: Event): void;

//   gc(name?:string): boolean;

//   getTree();
//   getPipe(event?: string);
// }



