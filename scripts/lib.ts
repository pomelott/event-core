import {eventTreeSplitChar} from  "./const";
export function parseEventParam (eventItem: string) {
  return eventItem.split(eventTreeSplitChar);
}