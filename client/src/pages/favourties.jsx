import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FavRest from '../components/favRest';
import './favourites.scss';
const Favs = () => {
  const url = '/api/favourites';
  const { userId } = useSelector((state) => state.user);
  const [favs, setFavs] = useState(null);

  const getFavs = useCallback(async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    let favRests = await res.json();
    console.log('favrests', favRests);
    setFavs(favRests);
  }, []);

  useEffect(() => {
    getFavs();
  }, []);

  return (
    <div className='container'>
      <h1> Your favourite restaurants</h1>
      <div className='favHold'>
        {favs?.map((rest) => {
          return <FavRest rest={rest} key={rest._id} />;
        })}
      </div>
    </div>
  );
};

export default Favs;
