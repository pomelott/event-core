import { EventCoreConfig } from "./eventCore";

export type PipeListener = "pipeEnd" | "pipeMiddle" | 'pipeStopped' | 'pipeError'
export interface EventPipeConfig extends EventCoreConfig {
  pipeEnd?: Function,
  pipeMiddle?: Function,
  pipeStopped?: Function,
  pipeError?: Function
}