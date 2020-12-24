export class EventPipe implements EventPipe {
  private pipe: Array<Function> = [];
  private mark: Array<Function> = [];
  protected add (event: string, callback: Function): boolean {
    return true;
  };
  protected delete (event: string): boolean {
    return true;
  };
  protected clear (): boolean {
    return true;
  };
  protected start (): void {};
  protected stop (): void {};
  protected listen (hook: string, callback: Function): boolean {
    return true;
  };
}