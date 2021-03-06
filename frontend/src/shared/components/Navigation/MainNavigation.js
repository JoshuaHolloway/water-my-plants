import { Link } from 'react-router-dom';

import NavLinks from './NavLinks';

import classes from './MainNavigation.module.css';

// ==============================================

const MainNavigation = (props) => {
  // --------------------------------------------

  return (
    <header className={classes['main-header']}>
      <nav className={classes['nav']}>
        <NavLinks />
      </nav>

      <h1 className={classes['logo']}>
        <Link to='/'>Water Plants</Link>
      </h1>
    </header>
  );

  // --------------------------------------------
};

// ==============================================

export default MainNavigation;
