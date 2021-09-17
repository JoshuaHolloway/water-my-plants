import { useState, useCallback } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

// ==============================================

const App = () => {
  // --------------------------------------------

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --------------------------------------------

  // -Only create this function on initial
  //  execution component function
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  // --------------------------------------------

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <MainNavigation />
        <Switch>
          <Route path='/' exact>
            <h1>Home</h1>
          </Route>

          <Route path='/:userId/plants' exact>
            {/* should grab all plants for currently logged in user => protected route */}
            <h1>UserPlants</h1>
          </Route>

          <Route path='/plants/new' exact>
            <h1>NewPlant</h1>
          </Route>

          <Route path='/plants/:placeId'>
            <h1>UpdatePlant</h1>
          </Route>

          <Redirect to='/' />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );

  // --------------------------------------------
};

// ==============================================

export default App;
