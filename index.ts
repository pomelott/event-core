
const tree: any = {}

class EventTree {

    on (name: string, callback: Function) {
      tree[name] = callback;
    }

    getPool () {
      return tree;
    }

    trigger (key: any) {
      tree[key]()
    }
};



export = new EventTree();