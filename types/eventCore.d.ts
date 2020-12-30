import { EventPipe } from "../scripts/eventPipe";
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

export type PipeGroup = Array<EventPipe>

export type EventTree = {
  [key:string]: EventNode
}

export type BindEventType = string | string[];





