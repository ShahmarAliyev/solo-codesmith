import React, { useEffect, useState } from 'react';
import Restaurant from './restaurant';
import './restaurantContainer.scss';
import { useCallback } from 'react';

const RestaurantContainer = () => {
  const [foundRests, setFoundRests] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const url = '/api/';

  const getRestaurants = useCallback(async () => {
    console.log('runs get restaurants');
    let res = await fetch(url);
    let data = await res.json();
    setFoundRests(data);
  }, [url]);

  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);

  const handleLocationChange = (e) => {
    const loc = e.target.value;
    setLocation(loc);
  };
  const handleTermChange = (e) => {
    const t = e.target.value;
    setKeyword(t);
  };
  const handleSearchClick = useCallback(async () => {
    console.log(keyword, location);

    console.log('runs handeclick');

    let res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ keyword, location }),
    });
    let data = await res.json();
    setFoundRests(data);
  }, [keyword, location]);
  console.log(keyword, location);
  return (
    <div className='restContainer'>
      <span className='question'>What is on your mind?</span>
      <div className='inputContainer'>
        <input
          onChange={handleLocationChange}
          type='text'
          name='location'
          placeholder='where to eat?'
        />
        <button
          onClick={() => {
            console.log('clicked');
            handleSearchClick();
          }}
        >
          Search
        </button>

        <input
          onChange={handleTermChange}
          type='text'
          name='food'
          placeholder='what to eat?'
        />
      </div>
      <div className='restsHolder'>
        {foundRests?.map((rest) => {
          return <Restaurant key={rest.id} rest={rest} />;
        })}
      </div>
    </div>
  );
};

export default RestaurantContainer;
