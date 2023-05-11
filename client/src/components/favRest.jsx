import React from 'react';
import './favrest.scss';
const FavRest = ({ rest }) => {
  let open;
  rest['is_closed'] ? (open = 'Closed Now') : (open = 'Open Now');
  return (
    <div className='restNameHolder1'>
      <div className='restName1'>{rest.restName}</div>
      <p className='pfav'> {open}</p>
      <p className='plocation'> {rest.location}</p>

      <img src={rest['image_url']} alt='rest' />
    </div>
  );
};

export default FavRest;
