import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';

import PlantList from '../components/PlantList';

// ==============================================

const DUMMY_PLANTS = [
  {
    id: 'p1',
    nickname: 'plant 1', // title
    species: '', //description
    h2oFrequency: '', //address
    image: '',
    creator: 'u1',
  },
  {
    id: 'p2',
    nickname: 'plant 2', // title
    species: '', //description
    h2oFrequency: '', //address
    image: '',
    creator: 'u2',
  },
  {
    id: 'p3',
    nickname: 'plant 3', // title
    species: '', //description
    h2oFrequency: '', //address
    image: '',
    creator: 'u2',
  },
];

// ==============================================

const UsersPlants = () => {
  // --------------------------------------------

  const [loadedPlants, setLoadedPlants] = useState();

  // --------------------------------------------

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // --------------------------------------------

  const userId = useParams().userId;
  // const loadedPlants = DUMMY_PLANTS.filter((plant) => plant.creator === userId);

  // --------------------------------------------

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/plants/user/${userId}`
        );

        setLoadedPlants(responseData.plants);
      } catch (err) {
        console.log('(UsersPlants.js) err: ', err);
      }
    };
    fetchPlants();
  }, [sendRequest, userId]);

  // --------------------------------------------

  return (
    <>
      {isLoading && <h5>Loading...</h5>}
      {error && <h5>ERROR!</h5>}
      {!isLoading && loadedPlants && <PlantList items={loadedPlants} />}
    </>
  );
};

// ==============================================

export default UsersPlants;
