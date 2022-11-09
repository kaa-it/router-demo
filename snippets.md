<input value={url} onChange={(e) => { setUrl(e.target.value); }}>

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
const RouterContext = React.createContext({ currentPath: window.location.pathname });

function Router({ children }) {
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	return <RouterContext.Provider value={{ currentPath }}>
		{children}
	</RouterContext.Provider>;
}

function Route({ path, children }) {
	const { currentPath } = useContext(RouterContext);
	return currentPath === path && children;
}

function Link({ href, children }) {
	function handleClick(e) {
		e.preventDefault();
		history.pushState(null, '', href);
	}

	return <a onClick={handleClick}>{children}</a>
}
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
