import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import classes from './NavLinks.module.css';

// ==============================================

const NavLinks = (props) => {
  // --------------------------------------------

  const auth = useContext(AuthContext);

  console.log('NavLinks.js -- auth.userId: ', auth.userId);

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
          <NavLink to={`/${auth.userId}/plants`}>MY PLANTS</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to={'/plants/new'}>ADD PLANT</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <button
            onClick={() => {
              auth.logout();
            }}
          >
            LOGOUT
          </button>
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
