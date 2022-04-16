// import { bindActionCreators } from 'redux'
// import { createDragDropActions } from '../actions/dragDrop'

export class DragDropManagerImpl {
  store
  globalMonitor
  backend
  constructor(store, monitor) {
    this.store = store;
    this.globalMonitor = monitor
  }
  receiveBackend(backend) {
    this.backend = backend;
    // this.backend.setup();
  }
  getBackend() {
		return this.backend
  }
  getMonitor() {
		return this.globalMonitor
  }
  getRegistry() {
		return (this.globalMonitor).registry
  }

  getActions() {
    // const actions = createDragDropActions(this);
    // return bindActionCreators(actions, this.store.dispatch);
  };
};
