export type SignerEvent =
	| "onsignerconnected"
	| "ontxsigned"
	| "ontxbroadcasted"
	| "onerror"

class SignerEventEmitter {
	_events: Map<SignerEvent, (() => any)[]>

	constructor() {
		this._events = new Map<SignerEvent, ((...args: any) => any)[]>()
	}

	on(name: SignerEvent, listener: (...args: any) => any) {
		if (!this._events.has(name)) {
			this._events.set(name, [])
		}

		const events = this._events.get(name)

		if (events) {
			events.push(listener)

			this._events.set(name, events)
		}
	}

	removeListener(name: SignerEvent, listenerToRemove: (...args: any) => any) {
		if (!this._events.has(name)) {
			throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`)
		}

		const filterListeners = (listener) => listener !== listenerToRemove

		const events = this._events.get(name)

		if (events) {
			this._events.set(name, events.filter(filterListeners))
		}
	}

	emit(name: SignerEvent, data: any) {
		if (this._events.has(name)) {
			const fireCallbacks = (callback) => {
				callback(data)
			}

			const events = this._events.get(name)

			if (events) {
				events.forEach(fireCallbacks)
			}
		}
	}
}

export default SignerEventEmitter
