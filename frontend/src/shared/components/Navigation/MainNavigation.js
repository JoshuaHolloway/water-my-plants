import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';

import classes from './MainNavigation.module.css';

// ==============================================

const MainNavigation = (props) => {
  return (
    <>
      <MainHeader>
        <button>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1>
          <Link>Water Your Plants</Link>
        </h1>

        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

// ==============================================

export default MainNavigation;
