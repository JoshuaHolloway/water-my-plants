import { NavLink } from 'react-router-dom';

// ==============================================

const NavLinks = (props) => {
  return (
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
  );
};

// ==============================================

export default NavLinks;
