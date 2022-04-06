type CallbackObject = {
  fn: Function;
  ctx: any;
};

/**
 * MiniEmitter 事件订阅发布容器
 */
export default class MiniEmitter {
  /**事件集合 */
  private eventMap: Record<string, CallbackObject[]> = {};
  /**
   * 事件订阅
   * @param name 事件名称
   * @param callback 事件回调
   * @param ctx this 上下文
   */
  public on(name: string, callback: Function, ctx: any = null) {
    if (this.eventMap[name] === undefined) {
      this.eventMap[name] = [];
    }
    this.eventMap[name].push({
      fn: callback,
      ctx
    });
  }
  /**
   * 事件发布
   * @param name 事件名称
   * @param args 剩余参数
   */
  public emit(name: string, ...args: any[]) {
    if (this.eventMap[name] && this.eventMap[name].length) {
      this.eventMap[name].forEach(obj => {
        obj.fn.apply(obj.ctx, args);
      });
    } else {
      throw Error(`${name} event is not exist!`);
    }
  }
  /**
   * 删除对应的事件，有callback则删除指定事件，没有则删除整个事件名事件
   * @param name 事件名称
   * @param callback 事件回调
   */
  public off(name: string, callback?: Function) {
    if (!callback && this.eventMap[name]) delete this.eventMap[name];
    else {
      if (this.eventMap[name]) {
        this.eventMap[name] = this.eventMap[name].filter(obj => obj.fn !== callback);
      } else {
        throw Error(`${name} event is not exist!`);
      }
    }
  }
  /**
   * 执行一次的事件订阅
   * @param name 事件名称
   * @param callback 事件回调
   * @param ctx this 上下文
   * @returns
   */
  public once(name: string, callback: Function, ctx: any = null) {
    const that = this;
    function listener() {
      that.off(name, listener);
      callback && callback.apply(ctx, arguments);
    }
    return this.on(name, listener, ctx);
  }
}
