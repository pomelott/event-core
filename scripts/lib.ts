import {eventTreeSplitChar} from './const';
export function parseEventParam (eventItem: string) {
  return eventItem.split(eventTreeSplitChar);
}

export function getTreeNodeChain (eventItem: string): string {
  let reg = new RegExp(`${eventTreeSplitChar}`, 'g');
  return eventItem.replace(reg, '.tree.');
}

export function getParentNodeChain (eventItem: string): string {
  let tempArr: Array<string> | null;
  // reg = /(?<=.*)(->\w+)/g;
  let reg = new RegExp(`\(\?\<\=\.\*\)\(${eventTreeSplitChar}\\w\+\)`, 'g');
  tempArr = eventItem.match(reg);
  if (tempArr) {
    return eventItem.replace(tempArr[tempArr.length - 1], '')
  }
  // return '' when parent is root
  return '';
}

export function getPipeMiddleIdx (len: number): number {
  return Math.floor(len / 2);
}

export function jsonString (obj: object): string {
  return JSON.stringify(obj);
}