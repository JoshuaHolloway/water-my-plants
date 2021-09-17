import PlantItem from './PlantItem';
// import './PlantItem.css';

// ==============================================

const PlaceItem = (props) => {
  return (
    <li>
      {/* <div><img src={props.image} alt='' /></div> */}

      <div>
        <h2>{props.nickname}</h2>
      </div>
    </li>
  );
};

// ==============================================

export default PlaceItem;
