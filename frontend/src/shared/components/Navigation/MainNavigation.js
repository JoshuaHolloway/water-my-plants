import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import MainHeader from './MainHeader';

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
          <ul>
            <li>
              <NavLink to='/' exact>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to={`/:userId/plants`}>/:userId/plants</NavLink>
            </li>

            <li>
              <NavLink to={'plants/new'}>/plants/new</NavLink>
            </li>

            <li>
              <NavLink to={'/auth'}>AUTHENTICATE</NavLink>
            </li>
          </ul>
        </nav>
      </MainHeader>
    </>
  );
};

// ==============================================

export default MainNavigation;
