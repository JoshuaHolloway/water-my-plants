import PlantList from '../components/PlantList';

import { useParams } from 'react-router-dom';

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

  const userId = useParams().userId;
  const loadedPlants = DUMMY_PLANTS.filter((plant) => plant.creator === userId);

  // --------------------------------------------

  return <PlantList items={loadedPlants} />;
};

// ==============================================

export default UsersPlants;
