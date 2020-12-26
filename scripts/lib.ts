import {eventTreeSplitChar} from  "./const";
export function parseEventParam (eventItem: string) {
  return eventItem.split(eventTreeSplitChar);
}

export function getTreeNodeChain (eventItem: string): string {
  let reg = new RegExp(`${eventTreeSplitChar}`, 'g');
  return eventItem.replace(reg, '.tree.');
}

export function getPipeMiddleIdx (len: number): number {
  return Math.floor(len / 2);
}