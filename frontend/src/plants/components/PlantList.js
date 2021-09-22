import PlantItem from './PlantItem';
// import './PlantList.css';

// ==============================================

const PlantList = (props) => {
  if (props.items.length === 0) {
    return <h2>No plants found. Maybe create one?</h2>;
  }

  return (
    <ul>
      {props.items.map((plant) => {
        return (
          <PlantItem
            key={plant.id}
            id={plant.id}
            image={plant.image}
            nickname={plant.nickname} // title={place.title}
            species={plant.species} //description={place.description}
            h2oFrequency={plant.h2ofrequency} //address={place.address}
            // creatorId={place.creator}
            // coordinates={place.location}
            // onDelete={props.onDeletePlace}
            onDelete={props.onDeletePlant}
          />
        );
      })}
    </ul>
  );
};

// ==============================================

export default PlantList;
