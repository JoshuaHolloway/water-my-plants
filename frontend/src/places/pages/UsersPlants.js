import PlantList from '../components/PlantList';

// ==============================================

const DUMMY_PLANTS = [
  {
    id: 'p1',
    nickname: 'plant 1', // title
    species: '', //description
    h2oFrequency: '', //address
    image: '',
  },
];

// ==============================================

const UsersPlants = () => {
  return <PlantList items={DUMMY_PLANTS} />;
};

// ==============================================

export default UsersPlants;
