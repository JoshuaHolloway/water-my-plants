import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const NewPlant = () => {
  // --------------------------------------------

  // -Set up listener to auth context
  const auth = useContext(AuthContext);

  // --------------------------------------------

  // -Prepare page redirect
  const history = useHistory();

  // --------------------------------------------

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { sendRequest } = useHttpClient();

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

  useEffect(() => {
    if (nickname) {
      console.log('nickname: ', nickname);
    }
  }, [nickname]);
  useEffect(() => {
    if (species) {
      console.log('species: ', species);
    }
  }, [species]);
  useEffect(() => {
    if (image) {
      console.log('image: ', image);
    }
  }, [image]);
  useEffect(() => {
    if (h2oFreq) {
      console.log('h2oFreq: ', h2oFreq);
    }
  }, [h2oFreq]);
  // useEffect(() => console.log('creator: ', creator), [creator]);

  const onNicknameChangeHandler = (e) => setNickname(e.target.value);
  const onSpeciesChangeHandler = (e) => setSpecies(e.target.value);
  const onImageChangeHandler = (e) => setImage(e.target.value);
  const onH2oFreqChangeHandler = (e) => setH2oFreq(e.target.value);
  // const onCreatorChangeHandler = (e) => setCreator(e.target.value);

  // --------------------------------------------

  const plantSubmitHandler = async (event) => {
    event.preventDefault();

    const plant = {
      nickname, //: { type: String, required: true },
      species, //: { type: String, required: true },
      image, //: { type: String, required: true },
      h2oFrequency: h2oFreq, //: { type: String, required: true }, // number?
      // creator: auth.userId -- NOT NEEDED because we grab the user id from the decoded JWT on the backend after storing in the the checkAuth middleware
    };

    console.log('plant form data: ', plant); // send this to the backend!

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND}/plants`,
        'POST',
        JSON.stringify(plant),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        }
      );

      console.log(
        'responseData - NewPlant.js - plantSubmitHandler() : ',
        responseData
      );

      // -Redirect the user to homepage
      history.push('/');
    } catch (err) {
      console.log('err: ', err);
    }
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

      <br />

      <label htmlFor='species'>
        Species:
        <input
          type='text'
          id='species'
          value={species}
          onChange={onSpeciesChangeHandler}
        />
      </label>

      <br />

      <label htmlFor='image'>
        Image:
        <input
          type='text'
          id='image'
          value={image}
          onChange={onImageChangeHandler}
        />
      </label>

      <br />

      <label htmlFor='h2oFreq'>
        h2oFrequency:
        <input
          type='text'
          id='h2oFreq'
          value={h2oFreq}
          onChange={onH2oFreqChangeHandler}
        />
      </label>

      <br />

      <button type='submit'>Submit</button>
    </form>
  );

  // --------------------------------------------
};

// ==============================================

export default NewPlant;
