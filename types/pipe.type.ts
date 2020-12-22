
export type PipeListener = "pipeEnd" | "pipeMiddle" | 'pipeBlocked' | 'pipeStopped' | 'error'

export interface EventPipe {
  pipe: Array<Function>;
  mark: Array<Function>;
  add (event: string, callback: Function): boolean;
  delete (event: string): boolean;
  clear (): boolean;
  start (): void;
  stop (): void;
  listen (hook: string, callback: Function): boolean;

}