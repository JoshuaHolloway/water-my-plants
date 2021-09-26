import { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import PlantList from '../components/PlantList';

// ==============================================

const UsersPlants = () => {
  // --------------------------------------------

  // -Set up listener to auth context
  const auth = useContext(AuthContext);

  // --------------------------------------------

  const [loadedPlants, setLoadedPlants] = useState();

  // --------------------------------------------

  const { isLoading, error, sendRequest } = useHttpClient();

  // --------------------------------------------

  // const userId = useParams().userId;
  // const loadedPlants = DUMMY_PLANTS.filter((plant) => plant.creator === userId);

  // --------------------------------------------

  useEffect(() => {
    if (auth.userId) {
      const fetchPlants = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BACKEND}/plants/user/${auth.userId}`,
            'GET', // method
            null, // body
            {
              Authorization: `Bearer ${auth.token}`,
            } // headers
          );

          setLoadedPlants(responseData.plants);
        } catch (err) {
          console.log('(UsersPlants.js) err: ', err);
        }
      };
      fetchPlants();
    }
  }, [auth.userId, auth.token, sendRequest]);

  // --------------------------------------------

  const plantDeletedHandler = (deletedPlantId) => {
    // -Pass function to useState setter
    //  in order to update state based
    //  on previous value of state (passed in as arg)
    setLoadedPlants((prevPlants) =>
      prevPlants.filter((plant) => plant.id !== deletedPlantId)
    );
  };

  // --------------------------------------------

  return (
    <>
      {isLoading && <h5>Loading...</h5>}
      {error && <h5>ERROR!</h5>}
      {!isLoading && loadedPlants && (
        <PlantList items={loadedPlants} onDeletePlant={plantDeletedHandler} />
      )}
    </>
  );
};

// ==============================================

export default UsersPlants;
