// import {
// 	addSource,
// 	addTarget,
// 	removeSource,
// 	removeTarget,
// } from '../actions/registry'

import { getNextUniqueId } from '../utils/getNextUniqueId'

const HandlerRole = {
	SOURCE: 'SOURCE',
	TARGET: 'TARGET',
};
function getNextHandlerId(role) {
	const id = getNextUniqueId().toString()
	switch (role) {
		case HandlerRole.SOURCE:
			return `S${id}`
		case HandlerRole.TARGET:
			return `T${id}`
		default:
			throw new Error(`Unknown Handler Role: ${role}`)
	}
}

function parseRoleFromHandlerId(handlerId) {
	switch (handlerId[0]) {
		case 'S':
			return HandlerRole.SOURCE
		case 'T':
			return HandlerRole.TARGET
		default:
			throw new Error(`Cannot parse handler ID: ${handlerId}`)
	}
}

function mapContainsValue(map, searchValue) {
	const entries = map.entries()
	let isDone = false
	do {
		const {
			done,
			value: [, value],
		} = entries.next()
		if (value === searchValue) {
			return true
		}
		isDone = !!done
	} while (!isDone)
	return false
}

export class HandlerRegistryImpl {
	types = new Map()
	dragSources = new Map()
	dropTargets = new Map()
	pinnedSourceId = null
	pinnedSource = null
	store

	constructor(store) {
		this.store = store
	}
	getSource(sourceId, includePinned = false) {
		const isPinned = includePinned && sourceId === this.pinnedSourceId
		const source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId)
		return source
	}

	
  addSource(type, source) {
		const sourceId = this.addHandler(HandlerRole.SOURCE, type, source)
		// this.store.dispatch(addSource(sourceId))
		return sourceId
  }

  removeSource(sourceId) {
    // this.store.dispatch(removeSource(sourceId))
    this.dragSources.delete(sourceId)
		this.types.delete(sourceId)
	}
  


	getSourceType(sourceId) {
		return this.types.get(sourceId)
	}

	isSourceId(handlerId) {
		const role = parseRoleFromHandlerId(handlerId)
		return role === HandlerRole.SOURCE
	}

	isTargetId(handlerId) {
		const role = parseRoleFromHandlerId(handlerId)
		return role === HandlerRole.TARGET
	}

	getTarget(targetId) {
		return this.dropTargets.get(targetId)
	}

	addTarget(type, target) {
		const targetId = this.addHandler(HandlerRole.TARGET, type, target)
		// this.store.dispatch(addTarget(targetId))
		return targetId
	}

	removeTarget(targetId) {
		// this.store.dispatch(removeTarget(targetId))
		this.dropTargets.delete(targetId)
		this.types.delete(targetId)
	}

	addHandler(
		role,
		type,
		handler,
	) {
		const id = getNextHandlerId(role)
		this.types.set(id, type)
		if (role === HandlerRole.SOURCE) {
			this.dragSources.set(id, handler)
		} else if (role === HandlerRole.TARGET) {
			this.dropTargets.set(id, handler)
		}
		return id
	}

	getTargetType(targetId) {
		return this.types.get(targetId)
	}

	pinSource(sourceId) {
		const source = this.getSource(sourceId)

		this.pinnedSourceId = sourceId
		this.pinnedSource = source
	}

	unpinSource() {
		this.pinnedSourceId = null
		this.pinnedSource = null
	}
}
