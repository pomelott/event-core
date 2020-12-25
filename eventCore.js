var EventPipe = (function () {
    function EventPipe() {
        this.pipe = [];
        this.mark = [];
    }
    EventPipe.prototype.add = function (event, callback) {
        return true;
    };
    EventPipe.prototype.delete = function (event) {
        return true;
    };
    EventPipe.prototype.clear = function () {
        return true;
    };
    EventPipe.prototype.start = function () { };
    EventPipe.prototype.stop = function () { };
    EventPipe.prototype.listen = function (hook, callback) {
        return true;
    };
    return EventPipe;
}());

var eventTreeSplitChar = '->';

var EventCore = (function () {
    function EventCore(conf) {
        this.root = {};
        this.conf = {};
        this.conf = conf;
    }
    EventCore.prototype._bindEvent = function (eventItem, callback) {
        var treeArr = eventItem.split(eventTreeSplitChar);
        if (treeArr.length > 1) {
            return this._bindTreeEvent(treeArr, callback);
        }
        else {
            return this._bindItemEvent(eventItem, callback);
        }
    };
    EventCore.prototype._bindTreeEvent = function (treeArr, callback) {
        var targetTree = {};
        var returnValue;
        for (var i = treeArr.length - 1; i > 0; i--) {
            var key = treeArr[i];
            if (i === treeArr.length - 1) {
                targetTree[key] = {};
                targetTree[key].pipe = new EventPipe();
                targetTree[key].pipe.add(callback);
                returnValue = targetTree[key].pipe;
            }
            else {
                targetTree = {};
                targetTree[key].tree = targetTree;
            }
        }
        this.root[treeArr[0]] = {
            tree: targetTree,
            pipe: null
        };
        return returnValue;
    };
    EventCore.prototype._bindItemEvent = function (eventItem, callback) {
        if (!this.root[eventItem]) {
            this.root[eventItem] = {
                pipe: new EventPipe(),
                tree: {}
            };
        }
        return this.root[eventItem].pipe;
    };
    EventCore.prototype.config = function (param) {
    };
    EventCore.prototype.on = function (event, callback) {
        var _this = this;
        if (typeof event === 'string') {
            this._bindEvent(event, callback);
        }
        else {
            event.forEach(function (item) {
                _this._bindEvent(item, callback);
            });
        }
    };
    EventCore.prototype.extends = function (event, callback) {
    };
    EventCore.prototype.trigger = function (event) {
    };
    EventCore.prototype.once = function (event) {
    };
    EventCore.prototype.gc = function (name) {
        return true;
    };
    EventCore.prototype.getTree = function () {
    };
    EventCore.prototype.getPipe = function (event) {
    };
    return EventCore;
}());

export { EventCore };
