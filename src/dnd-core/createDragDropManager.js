import { DragDropManagerImpl } from './classes/DragDropManagerImpl'
import { DragDropMonitorImpl } from './classes/DragDropMonitorImpl';
import { HandlerRegistryImpl } from './classes/HandlerRegistryImpl';
import { createStore } from 'redux'
import reduce from './reducers/index'

export const createDragDropManager = (
  backendFactory
)=> {
  // 创建store
  const store = createStore(reduce);
  // 创建注册类
  const registry = new HandlerRegistryImpl(store);
  // 注册类注入到监听器中，创建监听器 人事
  const monitor = new DragDropMonitorImpl(store, registry);
  // 创建manager 总经理
  const manager = new DragDropManagerImpl(store, monitor);
  // 传入后台，一方面manager通过backendFactory注入到backend
  const backend = backendFactory(manager);
  // 另一方面 backend实例也注入到manager中
  manager.receiveBackend(backend)
  return manager;
};
