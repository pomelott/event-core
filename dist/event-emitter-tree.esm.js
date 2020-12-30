import _ from 'lodash';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var eventTreeSplitChar = '->';

function parseEventParam(eventItem) {
    return eventItem.split(eventTreeSplitChar);
}
function getTreeNodeChain(eventItem) {
    var reg = new RegExp("" + eventTreeSplitChar, 'g');
    return eventItem.replace(reg, '.tree.');
}
function getParentNodeChain(eventItem) {
    var tempArr;
    var reg = new RegExp("(?<=.*)(" + eventTreeSplitChar + "\\w+)", 'g');
    tempArr = eventItem.match(reg);
    if (tempArr) {
        return eventItem.replace(tempArr[tempArr.length - 1], '');
    }
    return '';
}
function getPipeMiddleIdx(len) {
    return Math.floor(len / 2);
}

var Queue = (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.push = function (item) {
        this.data.push(item);
        return true;
    };
    Queue.prototype.pop = function () {
        return this.data.shift();
    };
    Queue.prototype.front = function () {
        return this.data[0];
    };
    Queue.prototype.del = function (idx) {
        this.data.splice(idx, 1);
    };
    Queue.prototype.each = function (callback) {
        for (var i = 0; i < this.data.length; i++) {
            callback(this.data[i], i);
        }
    };
    Queue.prototype.index = function (eventItem) {
        return this.data.indexOf(eventItem);
    };
    Queue.prototype.len = function () {
        return this.data.length;
    };
    Queue.prototype.item = function (index) {
        return this.data[index];
    };
    Queue.prototype.clear = function () {
        this.data.length = 0;
        return true;
    };
    return Queue;
}());
var EventPipe = (function () {
    function EventPipe(param) {
        this.isStop = false;
        this.activeIndex = 0;
        this.mark = new Queue();
        this.pipe = new Queue();
        this.conf = {
            maxListeners: 10
        };
        this.conf = _.merge(this.conf, param);
    }
    EventPipe.prototype._exec = function (targetIndex, once) {
        return __awaiter(this, void 0, void 0, function () {
            var result, midIdx;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        midIdx = getPipeMiddleIdx(this.mark.len());
                        if (this.isStop) {
                            this.isStop = false;
                        }
                        return [4, this.pipe.each(function (item, idx) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(idx >= targetIndex)) return [3, 3];
                                            if (!this.isStop) return [3, 1];
                                            return [2, Promise.all(result)];
                                        case 1:
                                            this.activeIndex = idx + 1;
                                            if (this.conf.beforeAll) {
                                                this.conf.beforeAll();
                                            }
                                            if (idx === midIdx && this.conf.pipeMiddle) {
                                                this.conf.pipeMiddle();
                                            }
                                            return [4, result.push(item())];
                                        case 2:
                                            _a.sent();
                                            if (once) {
                                                this.delete(idx);
                                            }
                                            if (this.conf.afterAll) {
                                                this.conf.afterAll();
                                            }
                                            _a.label = 3;
                                        case 3: return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        this.activeIndex = 0;
                        if (this.conf.pipeEnd) {
                            this.conf.pipeEnd();
                        }
                        return [2, Promise.all(result)];
                }
            });
        });
    };
    EventPipe.prototype.add = function (eventItem, callback) {
        if (this.conf.maxListeners && this.mark.len() >= this.conf.maxListeners) {
            this.mark.pop();
            this.pipe.pop();
        }
        this.mark.push(eventItem);
        this.pipe.push(callback);
        return true;
    };
    EventPipe.prototype.delete = function (eventItem) {
        var idx;
        if (typeof eventItem === typeof '') {
            idx = this.mark.index(eventItem);
            if (idx === -1) {
                return false;
            }
        }
        else if (typeof eventItem === typeof 0) {
            idx = eventItem;
            if (!this.mark.item(idx)) {
                return false;
            }
        }
        else {
            return false;
        }
        this.mark.del(idx);
        this.pipe.del(idx);
        return true;
    };
    EventPipe.prototype.clear = function () {
        this.mark.clear();
        this.pipe.clear();
        return true;
    };
    EventPipe.prototype.start = function (once) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._exec(this.activeIndex, once)];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    EventPipe.prototype.stop = function () {
        this.isStop = true;
        if (this.conf.pipeStopped) {
            this.conf.pipeStopped();
        }
    };
    EventPipe.prototype.listen = function (hook, callback) {
        this.conf[hook] = callback;
        return true;
    };
    EventPipe.prototype.getPipeLength = function () {
        return this.pipe.len();
    };
    EventPipe.prototype.reset = function () {
        this.activeIndex = 0;
        this.isStop = false;
    };
    return EventPipe;
}());

var EventCore = (function () {
    function EventCore(conf) {
        this.root = {};
        this.conf = {
            maxListeners: 10
        };
        this.conf = _.merge(this.conf, conf);
    }
    EventCore.prototype.config = function (param) {
        this.conf = _.merge(this.conf, param);
        return true;
    };
    EventCore.prototype.getConfig = function () {
        return this.conf;
    };
    EventCore.prototype._bindEvent = function (eventItem, callback) {
        var treeArr = parseEventParam(eventItem);
        if (treeArr.length > 1) {
            var targetNode = this._getTargetNodeFromChain(eventItem);
            if (targetNode && targetNode.pipe) {
                targetNode.pipe.add(eventItem, callback);
                return targetNode.pipe;
            }
            else {
                return this._bindTreeEvent(treeArr, callback);
            }
        }
        else {
            return this._bindItemEvent(eventItem, callback);
        }
    };
    EventCore.prototype._forEventNode = function (node, callBack) {
        if (!node.tree) {
            return;
        }
        for (var key in node.tree) {
            callBack(key, node.tree[key]);
            if (node.tree[key].tree) {
                this._forEventNode(node.tree[key], callBack);
            }
        }
    };
    EventCore.prototype._bindTreeEvent = function (treeArr, callback) {
        var targetTree = {};
        var returnValue, mountPoint = treeArr[0];
        for (var i = treeArr.length - 1; i > 0; i--) {
            var key = treeArr[i], temp = {};
            if (i === treeArr.length - 1) {
                targetTree[key] = {};
                targetTree[key].pipe = new EventPipe(this.conf);
                targetTree[key].pipe.add(key, callback);
                returnValue = targetTree[key].pipe;
            }
            else {
                temp = targetTree;
                targetTree = {};
                targetTree[key] = {};
                targetTree[key].tree = temp;
            }
        }
        if (!this.root[mountPoint]) {
            this.root[mountPoint] = {};
        }
        this.root[mountPoint] = _.merge(this.root[mountPoint], {
            tree: targetTree
        });
        return returnValue;
    };
    EventCore.prototype._bindItemEvent = function (eventItem, callback) {
        if (!this.root[eventItem] || !this.root[eventItem].pipe) {
            this.root[eventItem] = _.merge(this.root[eventItem], {
                pipe: new EventPipe(this.conf)
            });
        }
        this.root[eventItem].pipe.add(eventItem, callback);
        return this.root[eventItem].pipe;
    };
    EventCore.prototype._getTargetNodeFromChain = function (eventItem) {
        var nodeChain = getTreeNodeChain(eventItem);
        return _.get(this.root, nodeChain);
    };
    EventCore.prototype.on = function (event, callback) {
        var _this = this;
        var pipeGroup = [];
        if (typeof event === 'string') {
            pipeGroup.push(this._bindEvent(event, callback));
        }
        else {
            event.forEach(function (item) {
                pipeGroup.push(_this._bindEvent(item, callback));
            });
        }
        return pipeGroup;
    };
    EventCore.prototype.trigger = function (eventItem, once) {
        return __awaiter(this, void 0, void 0, function () {
            var targetNode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetNode = this._getTargetNodeFromChain(eventItem);
                        if (!targetNode.pipe) return [3, 2];
                        return [4, targetNode.pipe.start(once)];
                    case 1: return [2, _a.sent()];
                    case 2: return [2, Promise.reject(false)];
                }
            });
        });
    };
    EventCore.prototype.triggerTree = function (eventItem, once) {
        return __awaiter(this, void 0, void 0, function () {
            var targetNode, pro;
            var _this = this;
            return __generator(this, function (_a) {
                targetNode = this._getTargetNodeFromChain(eventItem), pro = [];
                if (targetNode.pipe) {
                    pro.push(targetNode.pipe.start(once));
                }
                this._forEventNode(targetNode, function (key, node) { return __awaiter(_this, void 0, void 0, function () {
                    var proItem;
                    return __generator(this, function (_a) {
                        if (node.pipe) {
                            proItem = node.pipe.start(once);
                            pro.push(proItem);
                        }
                        return [2];
                    });
                }); });
                return [2, Promise.all(pro)];
            });
        });
    };
    EventCore.prototype.once = function (eventItem) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.trigger(eventItem, true)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    EventCore.prototype.clear = function () {
        this.root = {};
    };
    EventCore.prototype.gc = function (eventItem) {
        try {
            var treeArr = parseEventParam(eventItem), lastNodeName = treeArr[treeArr.length - 1];
            var parentChain = getParentNodeChain(eventItem);
            if (parentChain.length) {
                var parentNode = _.get(this.root, parentChain);
                if (parentNode.tree) {
                    delete parentNode.tree[lastNodeName];
                }
            }
            else {
                delete this.root[lastNodeName];
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
    };
    EventCore.prototype.getTree = function () {
        return this.root;
    };
    EventCore.prototype.getPipe = function (param) {
        if (typeof param === typeof '') {
            var targetNode = this._getTargetNodeFromChain(param);
            if (targetNode.pipe) {
                return targetNode.pipe;
            }
            return false;
        }
        return new EventPipe(param);
    };
    return EventCore;
}());

export { EventCore };
