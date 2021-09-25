import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import classes from './MainNavigation.module.css';

// ==============================================

const MainNavigation = (props) => {
  // --------------------------------------------

  return (
    <MainHeader>
      <nav className={classes['nav']}>
        <NavLinks />
      </nav>

      <h1 className={classes['logo']}>
        <Link to='/'>Water Plants</Link>
      </h1>
    </MainHeader>
  );

  // --------------------------------------------
};

// ==============================================

export default MainNavigation;
