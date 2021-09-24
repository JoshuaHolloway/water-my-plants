import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

// ==============================================

const UpdatePlant = () => {
  // --------------------------------------------

  // /plants/:pid'
  const plantId = useParams().plantId;
  console.log('plantId: ', plantId);

  // const [plantId, setPlantId] = useState('');
  // useEffect(() => {
  //   console.log('useParams: ', useParams);
  //   const x = useParams().plantId;
  //   setPlantId(x);
  // }, []);

  // useEffect(() => {
  //   console.log('plantId: ', plantId);
  // }, [plantId]);

  // --------------------------------------------

  // -Set up listener to auth context
  const auth = useContext(AuthContext);

  // --------------------------------------------

  // -Prepare page redirect
  const history = useHistory();

  // --------------------------------------------

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { sendRequest } = useHttpClient();

  // --------------------------------------------

  // const [loadedPlant, setLoadedPlant] = useState();

  // --------------------------------------------

  const [nickname, setNickname] = useState('');
  const [species, setSpecies] = useState('');

  useEffect(() => console.log('nickname: ', nickname), [nickname]);
  useEffect(() => console.log('species: ', species), [species]);

  const onNicknameChangeHandler = (e) => setNickname(e.target.value);
  const onSpeciesChangeHandler = (e) => setSpecies(e.target.value);

  // --------------------------------------------

  // -Send request when page loads to load latest plant data
  useEffect(() => {
    console.clear();
    const fetchData = async () => {
      console.log('async fetchData()');

      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/plants/${plantId}`,
          'GET',
          null,
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );

        setNickname(responseData.plant.nickname);
        setSpecies(responseData.plant.species);
      } catch (err) {
        console.log('error sending request to api/plants/:plantId');
      }
    };
    fetchData();
  }, [auth.token, plantId, sendRequest]);

  // --------------------------------------------

  const plantSubmitHandler = async (event) => {
    event.preventDefault();

    const plant = {
      nickname, //: { type: String, required: true },
      species, //: { type: String, required: true },
    };

    console.log('plant form data: ', plant); // send this to the backend!

    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/plants/${plantId}`,
        'PATCH',
        JSON.stringify(plant),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        }
      );

      console.log(
        'responseData - UpdatePlant.js - plantSubmitHandler() : ',
        responseData
      );

      // -Redirect the user to homepage
      // history.push(`/:userId/plants`);
      history.push(`/${auth.userId}/plants`);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  // --------------------------------------------

  return (
    <form onSubmit={plantSubmitHandler}>
      <h5>Update Plant</h5>

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

      <button type='submit'>Submit</button>
    </form>
  );

  // --------------------------------------------
};

// ==============================================

export default UpdatePlant;
