<input value={url} onChange={(e) => { setUrl(e.taget.value); }}>

---

```JSX
function Route({ path, currentPath, children }) {
  return currentPath === path && children;
}
```

---

```JSX
const RouterContext = React.createContext({ currentPath: '/' });
```

```JSX
class OwnHistory {
	_listeners = new Set();

	pushState = (location) => {
		history.pushState(null, '', location);
		this._listeners.forEach(l => l(location));
	}

	listen(listener) {
		this._listeners.add(listener);
		return () => this._listeners.delete(listener);
	}
}

export const ownHistory = new OwnHistory();
```
