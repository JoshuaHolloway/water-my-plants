import { useState, useEffect, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
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
          <Users />
        </Route>
        <Route path='/:userId/plants' exact>
          {/* should grab all plants for currently logged in user => protected route */}
          <UsersPlants />
        </Route>
        <Route path='/plants/new' exact>
          <NewPlant />
        </Route>

        {/* This route does not work even if logged in! */}
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
          {/* TODO: Change to public homepage */}
          <Users />
        </Route>

        <Route path='/auth'>
          <Auth />
        </Route>

        <Redirect to='/auth' />
      </Switch>
    );
  }

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
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
