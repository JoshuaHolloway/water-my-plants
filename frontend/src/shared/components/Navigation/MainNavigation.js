import { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

import classes from './MainNavigation.module.css';
import drawerClasses from './SideDrawer.module.css';

// ==============================================

const MainNavigation = (props) => {
  // --------------------------------------------

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // --------------------------------------------

  const openDrawerHandler = () => setDrawerIsOpen(true);
  const closeDrawerHandler = () => setDrawerIsOpen(false);

  // --------------------------------------------

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

      {drawerIsOpen && (
        <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
          <nav className={drawerClasses['main-navigation_drawer-nav']}>
            <NavLinks />
          </nav>
        </SideDrawer>
      )}

      <MainHeader>
        <button
          className={classes['main-navigation__menu-btn']}
          onClick={openDrawerHandler}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

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
