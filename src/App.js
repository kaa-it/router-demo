import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";
import React, {useContext, useEffect, useState} from "react";
import {ownHistory} from "./history";

const RouterContext = React.createContext(window.location.pathname);

function Router({ children }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        return ownHistory.listen(location => setCurrentPath(location));
    }, []);

    return <RouterContext.Provider value={ currentPath }>
        {children}
    </RouterContext.Provider>;
}

function Route({ path, children }) {
    const currentPath  = useContext(RouterContext);
    return currentPath === path && children;
}

function Link({href, children}) {
    function handleClick(e) {
        e.preventDefault();
        ownHistory.pushState(href);
    }
    return <a href={href} onClick={handleClick}>{children}</a>
}

const App = () => {
  const [url, setUrl] = useState('');

  return (
    <>
        <Link href="/home">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/settings">Settings</Link>

      <Router currentPath={url}>
          <Route path='/home'>
              <Home />
          </Route>
          <Route path='/login'>
              <Login />
          </Route>
          <Route path='/settings'>
              <Settings />
          </Route>
      </Router>
    </>
  );
};

export default App;
