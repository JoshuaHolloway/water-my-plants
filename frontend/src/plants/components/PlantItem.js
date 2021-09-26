import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';

import classes from './PlantItem.module.css';

// ==============================================

const PlaceItem = (props) => {
  // --------------------------------------------

  const [showDetails, setShowDetails] = useState(false);

  const openDetailsHandler = () => setShowDetails(true);

  const closeDetailsHandler = () => setShowDetails(false);
  // --------------------------------------------

  // -Set up listener to auth context
  const auth = useContext(AuthContext);

  // --------------------------------------------

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { sendRequest } = useHttpClient();

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
    <>
      <Modal
        show={showDetails}
        onCancel={closeDetailsHandler}
        header={props.address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={<Button onClick={closeDetailsHandler}>CLOSE</Button>}
      >
        <div className={classes['details-container']}>
          <p>Species: {props.species}</p>
          <p>Nickname: {props.nickname}</p>
          <p>H2O-Frequency: {props.h2oFrequency}</p>
        </div>
      </Modal>

      <li>
        <div>
          <h2>{props.nickname}</h2>
          <button onClick={onDeleteHandler}>DELETE</button>
          <button>
            <NavLink to={`/plants/${props.id}`}>UPDATE</NavLink>
          </button>
          <Button inverse onClick={openDetailsHandler}>
            VIEW PLANT DETAILS
          </Button>
        </div>
      </li>
    </>
  );
};

// ==============================================

export default PlaceItem;
