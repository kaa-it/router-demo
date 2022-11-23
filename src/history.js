class OwnHistory {
    _listeners = new Set();

    pushState = (location) => {
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, '', location);
        this._listeners.forEach(l => l(location));
    }

    listen(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }
}

export const ownHistory = new OwnHistory();