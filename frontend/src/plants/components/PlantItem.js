import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const PlaceItem = (props) => {
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
  return (
    <li>
      {/* <div><img src={props.image} alt='' /></div> */}

      <div>
        <h2>{props.nickname}</h2>
        <button onClick={onDeleteHandler}>DELETE</button>
        <button>
          <NavLink to={`/plants/${props.id}`}>UPDATE</NavLink>
        </button>
      </div>
    </li>
  );
};

// ==============================================

export default PlaceItem;
