/**
 * MiniEmitter 事件订阅发布容器
 */
var MiniEmitter = /** @class */ (function () {
    function MiniEmitter() {
        /**事件集合 */
        this.eventMap = {};
    }
    /**
     * 事件订阅
     * @param name 事件名称
     * @param callback 事件回调
     * @param ctx this 上下文
     */
    MiniEmitter.prototype.on = function (name, callback, ctx) {
        if (ctx === void 0) { ctx = null; }
        if (this.eventMap[name] === undefined) {
            this.eventMap[name] = [];
        }
        this.eventMap[name].push({
            fn: callback,
            ctx: ctx
        });
    };
    /**
     * 事件发布
     * @param name 事件名称
     * @param args 剩余参数
     */
    MiniEmitter.prototype.emit = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.eventMap[name] && this.eventMap[name].length) {
            this.eventMap[name].forEach(function (obj) {
                obj.fn.apply(obj.ctx, args);
            });
        }
        else {
            throw Error("".concat(name, " event is not exist!"));
        }
    };
    /**
     * 删除对应的事件，有callback则删除指定事件，没有则删除整个事件名事件
     * @param name 事件名称
     * @param callback 事件回调
     */
    MiniEmitter.prototype.off = function (name, callback) {
        if (!callback && this.eventMap[name])
            delete this.eventMap[name];
        else {
            if (this.eventMap[name]) {
                this.eventMap[name] = this.eventMap[name].filter(function (obj) { return obj.fn !== callback; });
            }
            else {
                throw Error("".concat(name, " event is not exist!"));
            }
        }
    };
    /**
     * 执行一次的事件订阅
     * @param name 事件名称
     * @param callback 事件回调
     * @param ctx this 上下文
     * @returns
     */
    MiniEmitter.prototype.once = function (name, callback, ctx) {
        if (ctx === void 0) { ctx = null; }
        var that = this;
        function listener() {
            that.off(name, listener);
            callback && callback.apply(ctx, arguments);
        }
        return this.on(name, listener, ctx);
    };
    return MiniEmitter;
}());

export default MiniEmitter;
//# sourceMappingURL=mini-emitter.es5.js.map
