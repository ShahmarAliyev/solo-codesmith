import React, { useEffect, useState } from 'react';
import Favs from '../pages/favourties';
import './restaurant.scss';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setRestIdDetails } from '../redux/restaurantSlice';
const Restaurant = (props) => {
  const { rest } = props;
  const { userId } = useSelector((state) => state.user);
  const { restId } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (id) => {
    dispatch(setRestIdDetails(id));
    navigate(`/details`);
  };
  const handleClickFav = async () => {
    if (!userId) {
      navigate('/auth');
    }

    const res = await fetch('/api/favourites/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rest, userId }),
    });
    let data = await res.json();
  };
  return (
    <div className='restHolder'>
      <div className='restInfo'>
        <div className='restNameHolder'>
          <div className='restName'>{rest.name.slice(0, 15)}</div>
          <div className='priceRating'>
            <span>Stars{'⭐ '.repeat(Number(rest.rating))}</span>
            <span>Price{'💵 '.repeat(Number(rest.price?.length))} </span>
          </div>
        </div>

        <img key={rest.id} src={rest['image_url']} alt='rest' />
      </div>

      <div className='buttons'>
        <button className='btn' onClick={() => handleClick(rest.id)}>
          See details
        </button>
        <button className='btn' onClick={() => handleClickFav()}>
          Add To Favs
        </button>
      </div>
    </div>
  );
};

export default Restaurant;
