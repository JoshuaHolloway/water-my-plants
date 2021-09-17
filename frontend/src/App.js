import { Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';

// ==============================================

const App = () => {
  return (
    <>
      <MainNavigation />
      <Switch>
        <Route path='/' exact>
          {/* <Users /> */}
          <h1>Home</h1>
        </Route>

        <Route path='/:userId/plants' exact>
          {/* should grab all plants for currently logged in user => protected route */}
          {/* <UserPlants /> */}
          <h1>UserPlants</h1>
        </Route>

        <Route path='/plants/new' exact>
          {/* <NewPlant /> */}
          <h1>NewPlant</h1>
        </Route>

        <Route path='/plants/:placeId'>
          {/* <UpdatePlant /> */}
          <h1>UpdatePlant</h1>
        </Route>

        <Redirect to='/' />
      </Switch>
    </>
  );
};

// ==============================================

export default App;
