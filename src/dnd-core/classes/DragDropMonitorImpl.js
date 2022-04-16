export class DragDropMonitorImpl{
	store
	registry

	constructor(store, registry) {
		this.store = store
		this.registry = registry
  }
  subscribeToStateChange(listener) {
    this.store.subscribe(listener)
  }
  isDraggingSource(sourceId) {
    if (!sourceId) {
			return false
    }
    return sourceId === this.getSourceId()
  }

  getItemType() {
		return this.store.getState().dragOperation.itemType
  }

  getItem() {
		return this.store.getState().dragOperation.item
  }

  getClientOffset() {
		return this.store.getState().dragOffset.clientOffset
  }
  
  getSourceId() {
    return this.store.getState().dragOperation.sourceId
  }

  isDragging() {
		return Boolean(this.getItemType())
	}
}

