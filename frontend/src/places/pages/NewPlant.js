import { useState, useEffect, useContext } from 'react';

// ==============================================

const NewPlace = () => {
  // --------------------------------------------

  // -Plant model (expected shape of data on backend)
  // const plantSchema = new Schema({
  //   nickname: { type: String, required: true },
  //   species: { type: String, required: true },
  //   image: { type: String, required: true },
  //   // h2oFrequency: { type: String, required: true }, // number?
  //   // creator: { type: String, required: true },
  //   creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  // });

  const [nickname, setNickname] = useState('');
  const [species, setSpecies] = useState('');
  const [image, setImage] = useState('');
  const [h2oFreq, setH2oFreq] = useState('');
  // const [creator, setCreator] = useState('');

  useEffect(() => console.log('nickname: ', nickname), [nickname]);
  useEffect(() => console.log('species: ', species), [species]);
  useEffect(() => console.log('image: ', image), [image]);
  useEffect(() => console.log('h2oFreq: ', h2oFreq), [h2oFreq]);
  // useEffect(() => console.log('creator: ', creator), [creator]);

  const onNicknameChangeHandler = (e) => setNickname(e.target.value);
  const onSpeciesChangeHandler = (e) => setSpecies(e.target.value);
  const onImageChangeHandler = (e) => setImage(e.target.value);
  const onH2oFreqChangeHandler = (e) => setH2oFreq(e.target.value);
  // const onCreatorChangeHandler = (e) => setCreator(e.target.value);

  // --------------------------------------------

  const plantSubmitHandler = (event) => {
    event.preventDefault();

    const plant = {
      nickname, //: { type: String, required: true },
      species, //: { type: String, required: true },
      image, //: { type: String, required: true },
      h2oFrequency: h2oFreq, //: { type: String, required: true }, // number?
      // creator, //: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    };

    console.log('plant form data: ', plant); // send this to the backend!
  };

  // --------------------------------------------

  return (
    <form onSubmit={plantSubmitHandler}>
      <label htmlFor='nickname'>
        Nickname:
        <input
          type='text'
          id='nickname'
          value={nickname}
          onChange={onNicknameChangeHandler}
        />
      </label>

      <label htmlFor='species'>
        Species:
        <input
          type='text'
          id='species'
          value={species}
          onChange={onSpeciesChangeHandler}
        />
      </label>

      <label htmlFor='image'>
        Image:
        <input
          type='text'
          id='image'
          value={image}
          onChange={onImageChangeHandler}
        />
      </label>

      <label htmlFor='h2oFreq'>
        h2oFrequency:
        <input
          type='text'
          id='h2oFreq'
          value={h2oFreq}
          onChange={onH2oFreqChangeHandler}
        />
      </label>

      <button type='submit'></button>
    </form>
  );

  // --------------------------------------------
};

// ==============================================

export default NewPlace;
