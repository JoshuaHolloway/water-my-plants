import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const PlaceItem = (props) => {
  // --------------------------------------------

  const [showDetails, setShowDetails] = useState(false);

  // --------------------------------------------

  // -Set up listener to auth context
  const auth = useContext(AuthContext);

  // --------------------------------------------

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // --------------------------------------------

  const onDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/plants/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  // --------------------------------------------

  const onDetailsHandler = async () => {
    // NOTE: -There is a details endpoint
    //        for a speficic plant (/api/plants/:plantId)
    //       -However, that endpoint currently
    //        does not provide any additional
    //        information that the usersPlants
    //        route does not provide.
    //       -Probably want to create a seperate
    //        page for that endpoint eventually.

    // try {
    //   await sendRequest(
    //     `http://localhost:5000/api/plants/${props.id}`,
    //     'GET',
    //     null,
    //     {
    //       Authorization: `Bearer ${auth.token}`,
    //     }
    //   );
    setShowDetails(true);
    // } catch (err) {}
  };

  // --------------------------------------------

  const details = (
    <div>
      <p>{props.species}</p>
    </div>
  );

  // --------------------------------------------

  return (
    <li>
      {/* <div><img src={props.image} alt='' /></div> */}

      <div>
        <h2>{props.nickname}</h2>
        <button onClick={onDeleteHandler}>DELETE</button>
        <button>
          <NavLink to={`/plants/${props.id}`}>UPDATE</NavLink>
        </button>
        <button onClick={onDetailsHandler}>DETAILS</button>
        {showDetails && details}
      </div>
    </li>
  );
};

// ==============================================

export default PlaceItem;
