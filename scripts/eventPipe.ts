export class EventPipe{
  private pipe: Array<Function> = [];
  private mark: Array<Function> = [];
  add (event: string, callback: Function): boolean {
    return true;
  };
  delete (event: string): boolean {
    return true;
  };
  clear (): boolean {
    return true;
  };
  start (): void {};
  stop (): void {};
  listen (hook: string, callback: Function): boolean {
    return true;
  };
}