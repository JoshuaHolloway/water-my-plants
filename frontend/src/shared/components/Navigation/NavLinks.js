import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import classes from './NavLinks.module.css';

// ==============================================

const NavLinks = (props) => {
  // --------------------------------------------

  const auth = useContext(AuthContext);

  // --------------------------------------------

  return (
    <ul className={classes['nav-links']}>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <li>
          {/* <NavLink to={`/:userId/plants`}>MY PLANTS</NavLink> */}
          <NavLink to={`/u1/plants`}>MY PLANTS</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to={'/plants/new'}>ADD PLANT</NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to={'/auth'}>AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );

  // --------------------------------------------
};

// ==============================================

export default NavLinks;
