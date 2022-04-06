/**
 * MiniEmitter 事件订阅发布容器
 */
export default class MiniEmitter {
    /**事件集合 */
    private eventMap;
    /**
     * 事件订阅
     * @param name 事件名称
     * @param callback 事件回调
     * @param ctx this 上下文
     */
    on(name: string, callback: Function, ctx?: any): void;
    /**
     * 事件发布
     * @param name 事件名称
     * @param args 剩余参数
     */
    emit(name: string, ...args: any[]): void;
    /**
     * 删除对应的事件，有callback则删除指定事件，没有则删除整个事件名事件
     * @param name 事件名称
     * @param callback 事件回调
     */
    off(name: string, callback?: Function): void;
    /**
     * 执行一次的事件订阅
     * @param name 事件名称
     * @param callback 事件回调
     * @param ctx this 上下文
     * @returns
     */
    once(name: string, callback: Function, ctx?: any): void;
}
