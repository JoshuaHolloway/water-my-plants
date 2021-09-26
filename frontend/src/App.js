import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

import PublicHomePage from './user/pages/PublicHomePage';
import UsersPlants from './plants/pages/UsersPlants';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewPlant from './plants/pages/NewPlant';
import UpdatePlant from './plants/pages/UpdatePlant';

import { AuthContext } from './shared/context/auth-context';

// ==============================================

const App = () => {
  // --------------------------------------------

  const [token, setToken] = useState(false); // null ?  or undefined ?
  const [userId, setUserId] = useState(false);

  // --------------------------------------------

  // -Only create this function on initial
  //  execution of component function
  const login = useCallback((uid, token) => {
    console.log('App.js -- login()');
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  // --------------------------------------------

  // -useEffect will run AFTER the component mounts
  // -This is AFTER the render cycle.
  useEffect(() => {
    // -Auto-log-in the user if the JWT is in local-storage.
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      // -If we have the JWT, then log user in:
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  // --------------------------------------------

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          {/* Logged-in user homepage */}
          <UsersPlants />
        </Route>

        <Route path='/:userId/plants' exact>
          <UsersPlants />
        </Route>

        <Route path='/plants/new' exact>
          <NewPlant />
        </Route>

        <Route path='/plants/:plantId'>
          <UpdatePlant />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <PublicHomePage />
        </Route>

        <Route path='/auth'>
          <Auth />
        </Route>

        <Redirect to='/auth' />
      </Switch>
    );
  }

  // --------------------------------------------

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showBlock, setShowBlock] = useState(false);

  // --------------------------------------------

  return (
    // -bind the value we manage with our context
    //  (which we initialized in createContext() [auth-context.js])
    //  to a new value (the object: {isLoggedIn, login, logout})
    // -any time a state changes in our store
    //  the components that subscribe
    //  to said store re-render.
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />

        <button onClick={() => setShowBlock((prevState) => !prevState)}>
          toggle
        </button>

        {/* {showBlock ? (
          <div
            style={{ backgroundColor: 'red', width: 100, height: 100 }}
          ></div>
        ) : null} */}

        <Transition in={showBlock} timeout={100}>
          {(state) => (
            // ENTERING, ENTERED, EXITING, EXITED

            <>
              <p>{state}</p>
              <p>{state === 'exited' ? 0 : 1}</p>
              <div
                style={{
                  backgroundColor: 'red',
                  width: 100,
                  height: 100,
                  transition: 'opacity 1s ease-out',
                  opacity: state === 'exited' ? 0 : 1,
                }}
              ></div>
            </>
          )}
        </Transition>

        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
