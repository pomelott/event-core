"use strict";
var tree = {};
var EventTree = /** @class */ (function () {
    function EventTree() {
    }
    EventTree.prototype.on = function (name, callback) {
        tree[name] = callback;
    };
    EventTree.prototype.getPool = function () {
        return tree;
    };
    EventTree.prototype.trigger = function (key) {
        tree[key]();
    };
    return EventTree;
}());
;
module.exports = new EventTree();
