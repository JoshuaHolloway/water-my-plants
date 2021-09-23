import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import classes from './MainNavigation.module.css';

// ==============================================

const MainNavigation = (props) => {
  // --------------------------------------------

  return (
    <>
      <MainHeader>
        <h1 className={classes['main-navigation__title']}>
          <Link to='/'>Water Plants</Link>
        </h1>

        <nav className={classes['main-navigation__header-nav']}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );

  // --------------------------------------------
};

// ==============================================

export default MainNavigation;
